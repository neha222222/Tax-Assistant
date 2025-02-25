/// <reference path="../../chrome.d.ts" />
import React, { useState, useRef, useEffect } from "react";
import "../css/Chat.css";
import SendMessageIcon from "../assets/send.svg?react";
import { useColor } from "../context/ColorContext";

interface ChatProps {
  tabId: string;
}

const Chat: React.FC<ChatProps> = ({ tabId }) => {
  const { color } = useColor();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setError] = useState<string>('');

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    if (inputMessage.trim() === "") {
      setError('Please give some input');
    } else {
      setInputMessage("");
      setIsLoading(true);
      const newUserMessage = { text: inputMessage, isUser: true };
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);

      chrome.runtime.sendMessage(
        {
          action: "chatwithvideo",
          inputMessage: inputMessage,
          videoId: tabId,
        },
        (response) => {
          if (response && !response.error) {
            const newChatbotMessage = {
              text: response,
              isUser: false,
            };
            setIsLoading(false);
            setMessages((prevMessages) => [...prevMessages, newChatbotMessage]);
          } else {
            setError(response.error);
            console.error("Error fetching chatbot response:", response.error);
          }
        }
      );
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages?.map((message, index) => (
          <div
            key={index}
            className={`message ${message.isUser ? 'user-message' : 'chatbot-message'}`}
            style={{ backgroundColor: message.isUser ? color : '#2b2930' }}
            id='chatbot-single-complete'
          >
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
        {isLoading && (
          <p className="loading-class">Loading...</p>
        )}
      </div>
      <form className="chatbot-input" onSubmit={handleSendMessage}>
        <div className="credit-loss">8</div>
        <input
          type="text"
          value={inputMessage}
          onChange={handleInputChange}
          placeholder="Type a message..."
        />
        <div className="ask-message" style={{ pointerEvents: !isLoading ? 'auto' : 'none' }}>
          <button type="submit">
            <SendMessageIcon fill={isLoading ? "#cccccc" : "white"} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
