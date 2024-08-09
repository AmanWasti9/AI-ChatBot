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

//   useEffect(() => {
//     const initChat = async () => {
//       try {
//         const newChat = await genAI
//           .getGenerativeModel({ model: "gemini-1.5-flash" })
//           .startChat({
//             generationConfig,
//             safetySettings,
//             history: messages.map((msg) => ({
//               text: msg.text,
//               role: msg.role,
//             })),
//           });
//         setChat(newChat);
//       } catch (error) {
//         setError("Failed to initialize chat. Please try again.");
//       }
//     };
//     initChat();
//   }, []);

//   const handleSendMessage = async () => {
//     try {
//       const userMessage = {
//         text: userInput,
//         role: "user",
//         timestamp: new Date(),
//       };
//       setMessages((prevMessages) => [...prevMessages, userMessage]);
//       setUserInput("");
//       if (chat) {
//         const result = await chat.sendMessage(userInput);
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

//   useEffect(() => {
//     const initChat = async () => {
//       try {
//         const newChat = await genAI
//           .getGenerativeModel({ model: "gemini-1.5-flash" })
//           .startChat({
//             generationConfig,
//             safetySettings,
//             history: [],
//           });
//         setChat(newChat);

//         // Send a greeting message
//         const greetingMessage = {
//           text: "Hello! I'm your PC parts assistant. Feel free to ask me anything about PC parts.",
//           role: "bot",
//           timestamp: new Date(),
//         };
//         setMessages([greetingMessage]);
//       } catch (error) {
//         setError("Failed to initialize chat. Please try again.");
//       }
//     };
//     initChat();
//   }, []);

//   const handleSendMessage = async () => {
//     try {
//       const userMessage = {
//         text: userInput,
//         role: "user",
//         timestamp: new Date(),
//       };
//       setMessages((prevMessages) => [...prevMessages, userMessage]);
//       setUserInput("");

//       if (chat) {
//         // Check if the message is related to PC parts
//         const pcPartsKeywords = [
//           "cpu",
//           "gpu",
//           "motherboard",
//           "ram",
//           "hard drive",
//           "ssd",
//           "graphics card",
//           "monitor",
//           "keyboard",
//           "mouse",
//           "cooler",
//           "case",
//           "optical drive",
//           "BIOS",
//           "expansion cards",
//         ];
//         const isPCPartRelated = pcPartsKeywords.some((keyword) =>
//           userInput.toLowerCase().includes(keyword)
//         );

//         if (isPCPartRelated) {
//           const result = await chat.sendMessage(userInput);
//           const botMessage = {
//             text: result.response.text(),
//             role: "bot",
//             timestamp: new Date(),
//           };
//           setMessages((prevMessages) => [...prevMessages, botMessage]);
//         } else {
//           const sorryMessage = {
//             text: "Sorry, I can only help with queries related to PC parts.",
//             role: "bot",
//             timestamp: new Date(),
//           };
//           setMessages((prevMessages) => [...prevMessages, sorryMessage]);
//         }
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

// "use client";
// import React, { useEffect, useState } from "react";
// import ReactMarkdown from "react-markdown";

// export default function Page() {
//   const [messages, setMessages] = useState([]);
//   const [userInput, setUserInput] = useState("");
//   const [theme, setTheme] = useState("light");
//   const [error, setError] = useState("");
//   const [jsonData, setJsonData] = useState(null);

//   useEffect(() => {
//     const loadJsonFiles = async () => {
//       try {
//         const filePaths = ["/data/file1.json", "/data/file2.json"];
//         const promises = filePaths.map((path) =>
//           fetch(path).then((res) => res.json())
//         );

//         // If there is only one file, the promises array will have a single element
//         const data = await (promises.length > 1
//           ? Promise.all(promises)
//           : promises[0]);

//         const combinedData = data.reduce(
//           (acc, item) => ({ ...acc, ...item }),
//           {}
//         );
//         setJsonData(combinedData);
//       } catch (error) {
//         setError("Failed to load JSON files.");
//       }
//     };
//     loadJsonFiles();
//   }, []);

//   const getResponse = (input) => {
//     if (!jsonData) return "Loading data...";

//     const keywords = input.toLowerCase().split(" ");
//     for (const itemKey in jsonData) {
//       const item = jsonData[itemKey];
//       for (const property in item) {
//         if (item.hasOwnProperty(property)) {
//           const value = item[property];
//           if (Array.isArray(value)) {
//             for (const val of value) {
//               if (
//                 keywords.some((keyword) =>
//                   String(val).toLowerCase().includes(keyword)
//                 )
//               ) {
//                 return formatResponse(item, itemKey);
//               }
//             }
//           } else if (
//             keywords.some((keyword) =>
//               String(value).toLowerCase().includes(keyword)
//             )
//           ) {
//             return formatResponse(item, itemKey);
//           }
//         }
//       }
//     }
//     return "Sorry, I don't understand your question.";
//   };

//   const formatResponse = (item, itemKey) => {
//     // Customize the response with relevant product details
//     const productName = item.name || itemKey;
//     const productDescription = item.description || "No description available.";
//     const productPrice = item.price ? `$${item.price}` : "Price not available.";
//     const productCategory = item.category || "Uncategorized";

//     return `Product Name: ${productName}
//   Description: ${productDescription}
//   Price: ${productPrice}
//   Category: ${productCategory}`;
//   };

//   const handleSendMessage = async () => {
//     try {
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { text: userInput, role: "user", timestamp: new Date() },
//       ]);
//       setUserInput("");

//       const response = getResponse(userInput);
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { text: response, role: "bot", timestamp: new Date() },
//       ]);
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

//   const systemPrompt =
//     "You are a chatbot named Leo. Your primary function is to provide detailed information and answer questions about PC parts, including components like CPUs, GPUs, motherboards, RAM, and storage solutions. If a question falls outside the realm of PC parts, you should respond with, I am the PC parts chatbot.";

//   useEffect(() => {
//     const initChat = async () => {
//       try {
//         const newChat = await genAI
//           .getGenerativeModel({ model: "gemini-1.5-flash" })
//           .startChat({
//             generationConfig,
//             safetySettings,
//             history: [], // Start with an empty history
//           });
//         setChat(newChat);

//         // Send the system prompt as the first message
//         await newChat.sendMessage(systemPrompt, "system");
//       } catch (error) {
//         console.error("Failed to initialize chat:", error);
//         setError("Failed to initialize chat. Please try again.");
//       }
//     };
//     initChat();
//   }, []);

//   const queryRetrievalSystem = async (query) => {
//     // Implement the logic to query your retrieval system here
//     // For example, using a hypothetical API call to fetch relevant documents
//     try {
//       const response = await fetch(
//         `/api/retrieve?query=${encodeURIComponent(query)}`
//       );
//       const data = await response.json();
//       return data.documents; // Adjust based on your retrieval system's response
//     } catch (error) {
//       console.error("Error querying retrieval system:", error);
//       return [];
//     }
//   };

//   const handleSendMessage = async () => {
//     try {
//       const userMessage = {
//         text: userInput,
//         role: "user",
//         timestamp: new Date(),
//       };
//       setMessages((prevMessages) => [...prevMessages, userMessage]);
//       setUserInput("");

//       if (chat) {
//         // Query the retrieval system with the user's input
//         const retrievedDocs = await queryRetrievalSystem(userInput);

//         // Combine retrieved documents with user input for context
//         const augmentedInput = userInput + "\n\n" + retrievedDocs.join("\n");

//         const result = await chat.sendMessage(augmentedInput);
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
//   const [greetingSent, setGreetingSent] = useState(false);

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

//   const systemPrompt =
//     "You are a chatbot named Leo. Your primary function is to provide detailed information and answer questions about PC parts, including components like CPUs, GPUs, motherboards, RAM, and storage solutions. If a question falls outside the realm of PC parts, you should respond with, I am the PC parts chatbot.";

//   useEffect(() => {
//     const initChat = async () => {
//       try {
//         const newChat = await genAI
//           .getGenerativeModel({ model: "gemini-1.5-flash" })
//           .startChat({
//             generationConfig,
//             safetySettings,
//             history: [],
//           });
//         setChat(newChat);

//         await newChat.sendMessage(systemPrompt, "system");

//         const greetingMessage =
//           "Hello! I'm Leo, your assistant for all things related to PC parts. How can I help you today?";
//         await newChat.sendMessage(greetingMessage, "bot");

//         setMessages((prevMessages) => [
//           ...prevMessages,
//           {
//             text: greetingMessage,
//             role: "bot",
//             timestamp: new Date(),
//           },
//         ]);
//         setGreetingSent(true);
//       } catch (error) {
//         console.error("Failed to initialize chat:", error);
//         setError("Failed to initialize chat. Please try again.");
//       }
//     };
//     initChat();
//   }, []);

//   const queryRetrievalSystem = async (query) => {
//     try {
//       const response = await fetch("/data/file1.json");
//       console.log("JSON response", response);
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       console.log("JSON data response", data);

//       const normalizedQuery = query.toLowerCase().trim();
//       const item = data.find((item) =>
//         item.name.toLowerCase().includes(normalizedQuery)
//       );

//       if (!item) {
//         return [`Sorry, I couldn't find the item matching "${query}".`];
//       }

//       const hasPrice = query.includes("price");
//       const hasColor = query.includes("color");

//       let responseText = `Here is the information about ${item.name}:`;

//       if (hasPrice) {
//         responseText += `\n- Price: $${
//           item.price !== null ? item.price.toFixed(2) : "Not available"
//         }`;
//       }

//       if (hasColor) {
//         responseText += `\n- Color: ${
//           item.color !== null ? item.color : "Not available"
//         }`;
//       }

//       return [responseText];
//     } catch (error) {
//       console.error("Error fetching JSON file:", error);
//       return [
//         "There was an error retrieving the information. Please try again.",
//       ];
//     }
//   };

//   const handleSendMessage = async () => {
//     if (!greetingSent) return;

//     if (!userInput.trim()) {
//       setError("Please enter a valid query.");
//       return;
//     }

//     try {
//       const userMessage = {
//         text: userInput,
//         role: "user",
//         timestamp: new Date(),
//       };
//       setMessages((prevMessages) => [...prevMessages, userMessage]);
//       setUserInput("");

//       if (chat) {
//         // Retrieve relevant information based on user input
//         const retrievedDocs = await queryRetrievalSystem(userInput);

//         if (retrievedDocs.length === 0) {
//           setError("No relevant information found.");
//           return;
//         }

//         // Generate a response based on the retrieved information
//         const responseFromModel = await chat.sendMessage(
//           `User asked: "${userInput}". Based on our knowledge base, here is the information: ${retrievedDocs.join(
//             " "
//           )}. Generate a natural-sounding response.`
//         );

//         console.log("Response from model:", responseFromModel);

//         // Access and ensure the response content is a string
//         const responseText =
//           responseFromModel.response?.candidates?.[0]?.content?.parts?.[0]
//             ?.text ||
//           "The response from the model was empty. Please try again.";

//         // Ensure responseText is a string
//         if (typeof responseText === "string" && responseText.trim()) {
//           const botMessage = {
//             text: responseText,
//             role: "bot",
//             timestamp: new Date(),
//           };
//           setMessages((prevMessages) => [...prevMessages, botMessage]);
//         } else {
//           setError("The response from the model was empty. Please try again.");
//         }
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
//         />
//         <button
//           onClick={handleSendMessage}
//           className={`ml-2 px-4 py-2 rounded-md bg-${accent} text-white`}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }
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
//   const [greetingSent, setGreetingSent] = useState(false); // Flag to track greeting status
//   const [data, setData] = useState([]); // State for holding JSON data

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

//   const systemPrompt =
//     "You are a chatbot named Leo. Your primary function is to provide detailed information and answer questions about PC parts, including components like CPUs, GPUs, motherboards, RAM, and storage solutions. If a question falls outside the realm of PC parts, you should respond with, I am the PC parts chatbot.";

//   useEffect(() => {
//     const initChat = async () => {
//       try {
//         // Fetch JSON data
//         const response = await fetch("/data/file1.json");
//         const jsonData = await response.json();
//         setData(jsonData); // Store JSON data in state

//         // Initialize chat
//         const newChat = await genAI
//           .getGenerativeModel({ model: "gemini-1.5-flash" })
//           .startChat({
//             generationConfig,
//             safetySettings,
//             history: [], // Start with an empty history
//           });
//         setChat(newChat);

//         // Send the system prompt as the first message
//         await newChat.sendMessage(systemPrompt, "system");

//         // Send a greeting message from the chatbot
//         const greetingMessage =
//           "Hello! I'm Leo, your assistant for all things related to PC parts. How can I help you today?";
//         await newChat.sendMessage(greetingMessage, "bot");

//         // Add greeting message to state and set flag
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           {
//             text: greetingMessage,
//             role: "bot",
//             timestamp: new Date(),
//           },
//         ]);
//         setGreetingSent(true); // Set the flag to true
//       } catch (error) {
//         console.error("Failed to initialize chat:", error);
//         setError("Failed to initialize chat. Please try again.");
//       }
//     };
//     initChat();
//   }, []);

//   const filterFanCommanders = (priceRange) => {
//     if (!data || data.length === 0) return [];

//     const [minPrice, maxPrice] = priceRange;
//     return data.filter(
//       (item) => item.price >= minPrice && item.price <= maxPrice
//     );
//   };

//   const generateResponse = (filteredData) => {
//     if (filteredData.length === 0) {
//       return "I couldn't find any fan commanders within that price range. Please try another range or check back later.";
//     }

//     return filteredData
//       .map(
//         (item) =>
//           `${item.name} - $${item.price}\nChannels: ${
//             item.channels
//           }, Form Factor: ${item.form_factor}, PWM: ${item.pwm ? "Yes" : "No"}`
//       )
//       .join("\n\n");
//   };

//   const handleSendMessage = async () => {
//     if (!greetingSent) return; // Ignore messages if greeting not sent yet

//     try {
//       const userMessage = {
//         text: userInput,
//         role: "user",
//         timestamp: new Date(),
//       };
//       setMessages((prevMessages) => [...prevMessages, userMessage]);
//       setUserInput("");

//       if (chat) {
//         const userQuery = userInput.toLowerCase();
//         let filteredData = [];
//         let responseMessage = "";

//         if (userQuery.includes("fan commander")) {
//           const priceMatch = userQuery.match(/range between (\d+) to (\d+)/);
//           if (priceMatch) {
//             const minPrice = parseFloat(priceMatch[1]);
//             const maxPrice = parseFloat(priceMatch[2]);
//             filteredData = filterFanCommanders([minPrice, maxPrice]);
//             responseMessage = generateResponse(filteredData);
//           } else {
//             responseMessage =
//               "Please provide a price range for the fan commander (e.g., 'range between 7 to 55').";
//           }
//         } else {
//           responseMessage =
//             "I'm sorry, I can only help with fan commanders at the moment.";
//         }

//         // Send the generated response
//         const botMessage = {
//           text: responseMessage,
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
//       <div className="mt-4 flex items-center">
//         <textarea
//           value={userInput}
//           onChange={(e) => setUserInput(e.target.value)}
//           onKeyDown={handleKeyPress}
//           className={`flex-1 p-2 rounded-md border ${text}`}
//           rows="3"
//           placeholder="Type your message..."
//         />
//         <button
//           onClick={handleSendMessage}
//           className={`ml-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 ${text}`}
//         >
//           Send
//         </button>
//       </div>
//       {error && (
//         <div className="mt-4 p-2 rounded-md bg-red-200 text-red-800">
//           {error}
//         </div>
//       )}
//     </div>
//   );
// }
