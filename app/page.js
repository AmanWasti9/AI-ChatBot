// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } from "@google/generative-ai";
// import ReactMarkdown from "react-markdown";

// export default function Page() {
//   const [messages, setMessages] = useState([]);
//   const [userInput, setUserInput] = useState("");
//   const [chat, setChat] = useState(null);
//   const [theme, setTheme] = useState("light");
//   const [error, setError] = useState("");
//   const [data, setData] = useState({});

//   const API_KEY = "AIzaSyDYmligr0eUjKVNQqXJRKfFacWbWSiaPN0";
//   const genAI = new GoogleGenerativeAI(API_KEY);

//   const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash",
//   });

//   const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 8192,
//     responseMimeType: "text/plain",
//   };

//   const safetySettings = [
//     {
//       category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//     {
//       category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//     {
//       category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//     {
//       category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//   ];

//   // Fetch JSON data from the API route
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const response = await fetch("/api/data");
//         if (!response.ok) throw new Error("Failed to fetch data");
//         const result = await response.json();
//         console.log("Fetched data:", result); // Log the data
//         setData(result);
//       } catch (err) {
//         console.error("Failed to load data:", err);
//         setError("Failed to load data.");
//       }
//     };
//     loadData();
//   }, []);

//   // Simple retrieval function
//   const retrieveInformation = (query) => {
//     // Ensure file1 and file2 are arrays
//     const file1Data = Array.isArray(data.file1) ? data.file1 : [];
//     const file2Data = Array.isArray(data.file2) ? data.file2 : [];

//     // Combine data from both files
//     const combinedData = [...file1Data, ...file2Data];

//     // Implement a basic search (you can improve this with more advanced search algorithms)
//     return combinedData.filter((item) => item.text?.includes(query));
//   };

//   useEffect(() => {
//     const initChat = async () => {
//       try {
//         // Prepare the chat history with the correct 'role' and 'parts' properties
//         const chatHistory = messages.map((msg) => ({
//           role: msg.role === "bot" ? "model" : msg.role, // Replace 'bot' with 'model'
//           parts: [
//             {
//               content: msg.text || "", // The message text
//             },
//           ],
//         }));

//         // Log the chat history to verify its structure
//         console.log("Chat history being sent:", chatHistory);

//         // Initialize the chat session with the correct history structure
//         const newChat = await model.startChat({
//           history: chatHistory, // Pass the chat history array
//           generationConfig,
//           safetySettings,
//         });

//         setChat(newChat);
//       } catch (error) {
//         console.error("Failed to initialize chat:", error);
//         setError("Failed to initialize chat. Please try again.");
//       }
//     };

//     initChat();
//   }, [messages]);

//   const handleSendMessage = async () => {
//     try {
//       const userMessage = {
//         text: userInput,
//         role: "user",
//         timestamp: new Date(),
//       };
//       setMessages((prevMessages) => [...prevMessages, userMessage]);
//       setUserInput("");

//       // Retrieve relevant information
//       const retrievedData = retrieveInformation(userInput);
//       const context = retrievedData.map((item) => item.text).join("\n");

//       if (chat) {
//         const result = await chat.sendMessage(userInput, { context });
//         const botMessage = {
//           text: result.response.text(),
//           role: "bot",
//           timestamp: new Date(),
//         };
//         setMessages((prevMessages) => [...prevMessages, botMessage]);
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//       setError("Failed to send message. Please try again.");
//     }
//   };

//   const handleThemeChange = (e) => {
//     setTheme(e.target.value);
//   };

//   const getThemeColors = () => {
//     switch (theme) {
//       case "light":
//         return {
//           primary: "bg-white",
//           secondary: "bg-gray-100",
//           accent: "bg-blue-500",
//           text: "text-gray-800",
//         };
//       case "dark":
//         return {
//           primary: "bg-gray-900",
//           secondary: "bg-gray-800",
//           accent: "bg-yellow-500",
//           text: "text-gray-100",
//         };
//       default:
//         return {
//           primary: "bg-white",
//           secondary: "bg-gray-100",
//           accent: "bg-blue-500",
//           text: "text-gray-800",
//         };
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const { primary, secondary, accent, text } = getThemeColors();

//   return (
//     <div className={`flex flex-col h-screen p-4 ${primary}`}>
//       <div className="flex justify-between items-center mb-4">
//         <h1 className={`text-2xl font-bold ${text}`}>Gemini Chat</h1>
//         <div className="flex space-x-2">
//           <label htmlFor="theme" className={`text-sm ${text}`}>
//             Theme:
//           </label>
//           <select
//             id="theme"
//             value={theme}
//             onChange={handleThemeChange}
//             className={`p-1 rounded-md border ${text}`}
//           >
//             <option value="light">Light</option>
//             <option value="dark">Dark</option>
//           </select>
//         </div>
//       </div>
//       <div className={`flex-1 overflow-y-auto ${secondary} rounded-md p-2`}>
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`mb-4 ${
//               msg.role === "user" ? "text-right" : "text-left"
//             }`}
//           >
//             <ReactMarkdown
//               className={`inline-block p-2 rounded-lg ${
//                 msg.role === "user"
//                   ? `${accent} text-white`
//                   : `${primary} ${text}`
//               }`}
//             >
//               {msg.text}
//             </ReactMarkdown>
//             <p className={`text-xs ${text} mt-1`}>
//               {msg.role === "bot" ? "Bot" : "You"} -{" "}
//               {msg.timestamp.toLocaleTimeString()}
//             </p>
//           </div>
//         ))}
//       </div>
//       {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
//       <div className="flex items-center mt-4">
//         <input
//           type="text"
//           placeholder="Type here ..."
//           value={userInput}
//           onChange={(e) => setUserInput(e.target.value)}
//           onKeyDown={handleKeyPress}
//           className={`flex-1 p-2 rounded-md border-t border-b border-l focus:outline-none focus:border-${accent}`}
//           style={{
//             color: "black",
//           }}
//         />
//         <button
//           onClick={handleSendMessage}
//           className={`p-2 ${accent} text-white rounded-r-md hover:bg-opacity-80 focus:outline-none`}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import { getDoc,setDoc, doc } from 'firebase/firestore'
import { db } from "@/firebase";

export default function Page() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [chat, setChat] = useState(null);
  const [theme, setTheme] = useState("light");
  const [error, setError] = useState("");
  const [data, setData] = useState({});

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

// Function to add the document at the specific path
async function addfirebase(history) {
  try {
      // Specify the document path
      const docRef = doc(db, "user/IUCIj25jrIaDFm1xyEtv/User History/mXx2ChdjFEeLrhzn7C8a");

      // Set the document at the specified path
      await setDoc(docRef, history);

      console.log("Document successfully written!");
  } catch (e) {
      console.error("Error adding document: ", e);
  }
}
async function getfirebase() {
    try {
        const docRef = doc(db, "user/IUCIj25jrIaDFm1xyEtv/User History/mXx2ChdjFEeLrhzn7C8a");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const history = docSnap;
            console.log("Document data:", docSnap.data());
            return history;
        } else {
            console.log("No such document!");
        }
    } catch (e) {
        console.error("Error getting document: ", e);
    }
}

  // Fetch JSON data from the API route
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/api/data");
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        console.log("Fetched data:", result); // Log the data
        setData(result);
      } catch (err) {
        console.error("Failed to load data:", err);
        setError("Failed to load data.");
      }
    };
    loadData();
  }, []);

  const retrieveInformation = (userInput) => {
    // Ensure file1 and file2 are arrays
    const file1Data = Array.isArray(data.file1) ? data.file1 : [];
    const file2Data = Array.isArray(data.file2) ? data.file2 : [];

    // Combine data from both files
    const combinedData = [...file1Data, ...file2Data];

    console.log("Combined Data:", combinedData); // Log combined data

    // Convert userInput to lowercase for case-insensitive matching
    const lowerCaseInput = userInput.toLowerCase();
    console.log("User Input (lowercase):", lowerCaseInput); // Log user input

    // Implement a basic search with case-insensitivity
    const filteredData = combinedData.filter((item) => {
      // Ensure item.text exists and is a string
      const text = item.name ? item.name.toLowerCase() : "";
      console.log("Item Text (lowercase):", text); // Log item text
      return text.includes(lowerCaseInput);
    });

    console.log("Filtered Data:", filteredData); // Log filtered data

    return filteredData;
  };

  useEffect(() => {
    const initChat = async () => {
      try {
        // Prepare the chat history with the correct 'role' and 'parts' properties
        const chatHistory = messages.map((msg) => ({
          role: msg.role === "bot" ? "model" : msg.role, // Replace 'bot' with 'model'
          parts: [
            {
              text: msg.text || "", // Corrected the key from 'content' to 'text'
            },
          ],
        }));

        // Log the chat history to verify its structure
        console.log("Chat history being sent:", chatHistory);
        
        // Save and update history in firebase
        const historyin = {history: chatHistory}
        addfirebase(historyin);
        const historyarray = (await getfirebase()).data().history;
        console.log("get firebase: ",historyarray);

        // Initialize the chat session with the correct history structure
        const newChat = await model.startChat({
          history: historyarray, // Pass the chat history array
          generationConfig,
          safetySettings,
        });

        setChat(newChat);
      } catch (error) {
        console.error("Failed to initialize chat:", error);
        setError("Failed to initialize chat. Please try again.");
      }
    };

    initChat();
  }, [messages]);

  const handleSendMessage = async () => {
    try {
      const userMessage = {
        text: userInput,
        role: "user",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setUserInput("");

      // Retrieve relevant information
      const retrievedData = retrieveInformation(userInput);
      console.log("Retrieved Data", retrievedData);

      // const context = retrievedData.map((item) => item.name).join("\n");
      // console.log("Context", context);

      const context = retrievedData
        .map((item) => {
          // Extract only the required attributes and format them as a single line
          const { name, price, rpm, noise_level } = item;
          return `name: ${name}, price: ${price}, rpm= ${rpm}, noise_level= ${noise_level}`;
        })
        .join("\n");

      console.log("Context:", context);

      if (chat) {
        const result = await chat.sendMessage(userInput, { context });
        const botMessage = {
          text: result.response.text(),
          role: "model",
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message. Please try again.");
    }
  };

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
    <div className={`flex flex-col h-screen p-4 ${primary}`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className={`text-2xl font-bold ${text}`}>Gemini Chat</h1>
        <div className="flex space-x-2">
          <label htmlFor="theme" className={`text-sm ${text}`}>
            Theme:
          </label>
          <select
            id="theme"
            value={theme}
            onChange={handleThemeChange}
            className={`p-1 rounded-md border ${text}`}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>
      <div className={`flex-1 overflow-y-auto ${secondary} rounded-md p-2`}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${
              msg.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <ReactMarkdown
              className={`inline-block p-2 rounded-lg ${
                msg.role === "user"
                  ? `${accent} text-white`
                  : `${primary} ${text}`
              }`}
            >
              {msg.text}
            </ReactMarkdown>
            <p className={`text-xs ${text} mt-1`}>
              {msg.role === "model" ? "Bot" : "You"} -{" "}
              {msg.timestamp.toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      <div className="flex items-center mt-4">
        <input
          type="text"
          placeholder="Type here ..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className={`flex-1 p-2 rounded-md border-t border-b border-l focus:outline-none focus:border-${accent}`}
          style={{
            color: "black",
          }}
        />
        <button
          onClick={handleSendMessage}
          className={`p-2 ${accent} text-white rounded-r-md hover:bg-opacity-80 focus:outline-none`}
        >
          Send
        </button>
      </div>
    </div>
  );
}
