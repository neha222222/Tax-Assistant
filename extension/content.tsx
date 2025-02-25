/// <reference path="./chrome.d.ts" />

import React from "react";
import ReactDOM from "react-dom/client";
import {AppProvider} from "./src/AppProvider"
import App from "./src/App";
import "./src/index.css";
import { ClerkProvider } from "@clerk/chrome-extension";
import { useClerk } from "@clerk/chrome-extension";
let isReactAppAdded = false;

function removeExistingReactApp() {
  const existingElements = document.querySelectorAll("#tubechat-ai");

  existingElements.forEach((element) => {
    try {
      element.remove();
    } catch (error) {
      console.log("Error in removal ", error.message);
    }
  });
}

const PUBLISHABLE_KEY ="";

function addReactApp() {
  const sideBox_inner = document.getElementById("secondary-inner");

  const liveVideoShowcase = document.getElementsByClassName(
    "ytp-clip-watch-full-video-button"
  )[0]?.textContent;

  if (sideBox_inner && !isReactAppAdded) {
    removeExistingReactApp();

    if (!liveVideoShowcase?.includes("live")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap";
      document.head.appendChild(link);

      const app = document.createElement("div");
      app.id = "tubechat-ai";
      sideBox_inner.insertBefore(app, sideBox_inner.firstChild);
      ReactDOM.createRoot(document.getElementById("tubechat-ai")!).render(
        <AppProvider>
          <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <App />
          </ClerkProvider>
        </AppProvider>
      );
      isReactAppAdded = true;
    }
  } else {
    console.log("Not all required elements are present.");
  }
}

document.addEventListener("yt-navigate-finish", () => {
  setTimeout(() => {
    addReactApp();
  }, 1000);
});

if (document.body) {
  setTimeout(() => {
    addReactApp();
  }, 1000);
} else {
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      addReactApp();
    }, 1000);
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getContentHeight") {
    const playerHeight = document.getElementById("player")?.clientHeight || 0;

    sendResponse({ height: playerHeight });
  }
});