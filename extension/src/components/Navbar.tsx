import { useEffect } from "react";

import "../css/Navbar.css";

import star from "../assets/star.svg";
import creditAdd from "../assets/creditAdd.svg";
import arrowUp from "../assets/arrow_up.svg";
import arrowDown from "../assets/arrow_down.svg";
import Chat from "../assets/chat.svg?react";
import User from "../assets/user.svg?react";

import { useUser } from "@clerk/chrome-extension";
import { useNavbar } from "../context/NavbarContext";
import { useColor } from "../context/ColorContext";

const Navbar = () => {
  const { isMinimized, setIsMinimized, isChat, setIsChat } = useNavbar();

  const { isSignedIn } = useUser();

  const { color } = useColor();

  const handleChatSection = () => {
    if (isMinimized) {
      setIsMinimized(() => false);
      localStorage.setItem("extension-minimized", "false");
    }
    setIsChat(() => true);
  };

  const handleProfileSection = () => {
    if (isMinimized) {
      setIsMinimized(() => false);
      localStorage.setItem("extension-minimized", "false");
    }
    setIsChat(() => false);
  };

  const handleHeight = () => {
    setIsMinimized((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("extension-minimized", `${isMinimized}`);
  }, [isMinimized]);

  return (
    <div className="navbar-component">
      <div className="credit-score-section">
        <img src={star} alt="stars" width={12} height={12} />
        <p>500</p>
        <a href="https://twitter.com/home" target="_blank">
          <img
            src={creditAdd}
            alt="credits"
            width={18}
            height={18}
            style={{ cursor: "pointer" }}
          />
        </a>
      </div>

      <div className="chat-section" onClick={handleChatSection}>
        <Chat
          fill={isChat ? `${color}` : "#9B9C9E"}
          stroke={isChat ? `${color}` : "#9B9C9E"}
        />
        <p>Chat</p>
      </div>

      <div
        className="profile-section"
        onClick={handleProfileSection}
        style={{ pointerEvents: isSignedIn ? "auto" : "none" }}
      >
        <User
          stroke={!isChat ? `${color}` : "#9B9C9E"}
          fill={!isChat ? `${color}` : "#9B9C9E"}
        />
      </div>

      <div className="handle-height" onClick={handleHeight}>
        {isMinimized ? (
          <img src={arrowDown} alt="arrow-up" width={24} height={24} />
        ) : (
          <img src={arrowUp} alt="arrow-up" width={24} height={24} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
