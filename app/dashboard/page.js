"use client";
import React, { useEffect, useState } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import { firestore } from "../../firebase";
import { getDoc, updateDoc, doc, collection, setDoc } from "firebase/firestore";
import { Divider } from "@mui/material";
import { getAuth } from "firebase/auth";

export default function Page() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [chat, setChat] = useState(null);
  const [theme, setTheme] = useState("light");
  const [error, setError] = useState("");
  const [data, setData] = useState({});
  const [chatInitialized, setChatInitialized] = useState(false); // New state

  const auth = getAuth();
  const user = auth.currentUser;

  const API_KEY = "AIzaSyDYmligr0eUjKVNQqXJRKfFacWbWSiaPN0";
  const genAI = new GoogleGenerativeAI(API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/api/data");
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        console.log("Fetched data:", result);
        console.log("User id", user?.uid);

        setData(result);
      } catch (err) {
        console.error("Failed to load data:", err);
        setError("Failed to load data.");
      }
    };
    loadData();
  }, []);

  const retrieveInformation = (userInput) => {
    const file1Data = Array.isArray(data.file1) ? data.file1 : [];
    const file2Data = Array.isArray(data.file2) ? data.file2 : [];
    const combinedData = [...file1Data, ...file2Data];

    console.log("Combined Data:", combinedData);

    const lowerCaseInput = userInput.toLowerCase();
    console.log("User Input (lowercase):", lowerCaseInput);

    const filteredData = combinedData.filter((item) => {
      const text = item.name ? item.name.toLowerCase() : "";
      console.log("Item Text (lowercase):", text);
      return text.includes(lowerCaseInput);
    });

    console.log("Filtered Data:", filteredData);

    return filteredData;
  };

  async function updateChatHistory(newMessages) {
    if (!user || !user.uid) {
      console.error("User is not authenticated or UID is missing");
      return;
    }

    try {
      const docRef = doc(collection(firestore, "UsersHistory"), user.uid);

      // Fetch the existing chat history
      const docSnap = await getDoc(docRef);
      let historyArray = [];

      if (docSnap.exists()) {
        historyArray = docSnap.data().history || [];
      }

      // Create a Map to filter out old messages
      const existingMessagesMap = new Map(
        historyArray.map((msg) => [
          `${msg.timestamp.toDate().getTime()}-${msg.text}`,
          msg,
        ])
      );

      // Append only the latest new messages
      const uniqueMessages = newMessages.filter((newMsg) => {
        const key = `${newMsg.timestamp.getTime()}-${newMsg.text}`;
        return !existingMessagesMap.has(key);
      });

      if (uniqueMessages.length > 0) {
        historyArray = [...historyArray, ...uniqueMessages];
        await setDoc(docRef, { history: historyArray });
        console.log("Chat history successfully updated!");
      }
    } catch (e) {
      console.error("Error updating chat history: ", e);
    }
  }

  const handleSendMessage = async () => {
    try {
      const userMessage = {
        text: userInput,
        role: "user",
        timestamp: new Date(),
      };

      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setUserInput("");

      const retrievedData = retrieveInformation(userInput);
      console.log("Retrieved Data", retrievedData);

      const context = retrievedData
        .map((item) => {
          const { name, price, rpm, noise_level } = item;
          return `name: ${name}, price: ${price}, rpm= ${rpm}, noise_level= ${noise_level}`;
        })
        .join("\n");

      console.log("Context:", context);

      if (chat) {
        const contextMessages = newMessages.map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text || "" }],
        }));

        const result = await chat.sendMessage(userInput, {
          context,
          history: contextMessages,
        });
        const botMessage = {
          text: result.response.text(),
          role: "model",
          timestamp: new Date(),
        };

        const updatedMessages = [...newMessages, botMessage];
        setMessages(updatedMessages);

        // Update Firebase with both user and bot messages
        await updateChatHistory([userMessage, botMessage]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message. Please try again.");
    }
  };

  useEffect(() => {
    const initChat = async () => {
      if (!user || !user.uid || chatInitialized) {
        return;
      }

      try {
        const docRef = doc(collection(firestore, "UsersHistory"), user.uid);
        const docSnap = await getDoc(docRef);

        let historyarray = docSnap.exists() ? docSnap.data().history || [] : [];

        const chatHistory = historyarray.map((msg) => ({
          role: msg.role === "bot" ? "model" : msg.role,
          parts: [{ text: msg.text || "" }],
        }));

        console.log("Chat history being sent:", chatHistory);

        const newChat = await model.startChat({
          history: chatHistory,
          generationConfig,
          safetySettings,
        });

        setChat(newChat);
        setChatInitialized(true); // Set chat as initialized
      } catch (error) {
        console.error("Failed to initialize chat:", error);
        setError("Failed to initialize chat. Please try again.");
      }
    };

    initChat();
  }, [user, chatInitialized]); // Use chatInitialized as a dependency

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const getThemeColors = () => {
    switch (theme) {
      case "light":
        return {
          primary: "bg-white",
          secondary: "bg-gray-100",
          accent: "bg-blue-500",
          text: "text-gray-800",
        };
      case "dark":
        return {
          primary: "bg-gray-900",
          secondary: "bg-gray-800",
          accent: "bg-yellow-500",
          text: "text-gray-100",
        };
      default:
        return {
          primary: "bg-white",
          secondary: "bg-gray-100",
          accent: "bg-blue-500",
          text: "text-gray-800",
        };
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const { primary, secondary, accent, text } = getThemeColors();

  return (
    <div className={`flex h-screen p-4 ${primary}`}>
      <div className="flex-1 mr-4">
        {/* Chat History Section */}
        <div
          className={`flex flex-col h-full p-4 ${primary}`}
          style={{
            border: `2px solid black`,
            borderRadius: "10px",
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <h1 className={`text-2xl font-bold ${text}`}>Chat</h1>
            <select
              className={`border p-2 ${accent}`}
              value={theme}
              onChange={handleThemeChange}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div
            className="flex-1 overflow-y-auto p-2"
            style={{
              backgroundColor: `${secondary}`,
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`py-2 px-4 mb-2 rounded-lg ${
                  msg.role === "user" ? "bg-blue-500" : "bg-gray-500"
                } ${text}`}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            ))}
          </div>
          <Divider sx={{ my: 2 }} />
          <textarea
            className={`w-full p-2 border border-gray-300 rounded-lg`}
            rows="3"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyPress}
            style={{
              color: "black",
            }}
          />
          <button
            className={`mt-2 p-2 bg-blue-500 text-white rounded-lg ${text}`}
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
      <div className="flex-1 mr-4">
        {/* Chat History Section */}
        <div
          className={`flex flex-col h-full p-4 ${primary}`}
          style={{
            border: `2px solid black`,
            borderRadius: "10px",
          }}
        >
          <h1
            style={{
              textAlign: "center",
            }}
          >
            History
          </h1>
          <br />
          <Divider
            style={{
              backgroundColor: "black",
              height: "2px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
