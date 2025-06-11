"use client";
import React, { useState, useRef } from "react";
import Content from "@/app/components/chat/content";

const ChatIcon = () => {
  const [chatOpen, setChatOpen] = useState(false);
  type ChatMessage = { role: string; content: string };
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const updateHistory = (text: string) => {
    setChatHistory((prevHistory) => [
      ...prevHistory.filter((msg) => msg.content !== "Thinking..."),
      { role: "model", content: text },
    ]);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function generateBotResponse(history: any) {
    // format chat history for api request
    history = history.map(({ role, content }: ChatMessage) => ({
      role,
      parts: [{ text: content }],
    }));
    console.log("Formatted history for API:", history);
    // make api request
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: history,
      }),
    };
    try {
      if (!process.env.NEXT_PUBLIC_API_URL) {
        throw new Error("API URL is not defined");
      }
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL,
        requestOptions
      );
      // const response = await fetch(process.env.VITE_API_URL, requestOptions);
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.error.message || "Something went wrong!");
      }
      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();
      updateHistory(apiResponseText);
    } catch (error) {
      console.log(error);
    }
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const usrMsg = inputRef.current?.value.trim() || "";
    if (!usrMsg) return;
    console.log("User message:", usrMsg);
    inputRef.current!.value = ""; // Clear the input field
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { role: "user", content: usrMsg },
    ]);
    setTimeout(() => {
      setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          role: "model",
          content: `Thinking...`,
        },
      ]);
      generateBotResponse([...chatHistory, { role: "user", content: usrMsg }]);
    }, 600);
  }

  if (chatOpen) {
    return (
      <>
        <div className="chat-box">
          <div className="header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#0a1763"
            >
              <path d="M160-120v-200q0-33 23.5-56.5T240-400h480q33 0 56.5 23.5T800-320v200H160Zm200-320q-83 0-141.5-58.5T160-640q0-83 58.5-141.5T360-840h240q83 0 141.5 58.5T800-640q0 83-58.5 141.5T600-440H360ZM240-200h480v-120H240v120Zm120-320h240q50 0 85-35t35-85q0-50-35-85t-85-35H360q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0-80q17 0 28.5-11.5T400-640q0-17-11.5-28.5T360-680q-17 0-28.5 11.5T320-640q0 17 11.5 28.5T360-600Zm240 0q17 0 28.5-11.5T640-640q0-17-11.5-28.5T600-680q-17 0-28.5 11.5T560-640q0 17 11.5 28.5T600-600ZM480-200Zm0-440Z" />
            </svg>
            <p>Support Chat</p>
            <button className="close-btn" onClick={toggleChat}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-x-lg close"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
            </button>
          </div>
          <Content chatHistory={chatHistory} />
          <form className="chat-form" action="#" onSubmit={handleFormSubmit}>
            <input ref={inputRef} type="text" placeholder="Message.." />
            <button className="send-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="26px"
                viewBox="0 -960 960 960"
                width="26px"
                fill="#fff"
              >
                <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z" />
              </svg>
            </button>
          </form>
        </div>
      </>
    );
  } else {
    return (
      <>
        <button className="chat-btn" onClick={toggleChat}>
          <div className="chat-tool-tip">Support Chat</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="#0a1763"
            className="bi bi-chat-fill"
            viewBox="0 0 16 16"
          >
            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
            <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
          </svg>
        </button>
      </>
    );
  }
};

export default ChatIcon;
