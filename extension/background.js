chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.tabs.create({
      url: "https://tubechat-frontend-jfbmdjacx-tubechat.vercel.app/",
    });
  }
});

chrome.runtime.setUninstallURL(
  "https://www.jotform.com/form-templates/category/feedback", () => {
    chrome.windows.getCurrent((window) => {
      window.Clerk?.signout()
    })
});

chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
  if (details.url.startsWith("https://www.youtube.com/watch")) {
    chrome.scripting.executeScript(
      {
        target: { tabId: details.tabId },
        function: () => {},
      },
      () => {
        chrome.scripting.executeScript(
          {
            target: { tabId: details.tabId },
            files: ["content.js"],
          },
          () => {
            chrome.scripting.insertCSS({
              target: { tabId: details.tabId },
              files: ["style.css"],
            });
          }
        );
      }
    );
  }
});

const BACKEND_URL = "http://0.0.0.0:5000/";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "queryTabs") {
    chrome.tabs.query(
      { active: true, lastFocusedWindow: true },
      async (tabs) => {
        try {
          let url = tabs[0].url;
          sendResponse({ tabUrl: url });
        } catch (error) {
          sendResponse({ error: error.message });
        }
      }
    );
    return true;
  }

  if (message.action === "make_video_ready") {
    const videoCheckUrl = `${BACKEND_URL}add_and_check_video?video_id=${message.youtubeId}`;

    fetch(videoCheckUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        sendResponse({ data: data });
      })
      .catch((error) => {
        sendResponse({ error: error.message });
      });

    return true;
  }

  if (message.action === "chatwithvideo") {
    const videochaturl = `${BACKEND_URL}talk_with_pulpy?query=${message.inputMessage}&video_id=${message.videoId}`;
  
    fetch(videochaturl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        sendResponse(data);
      })
      .catch((error) => {
        sendResponse({ error: error.message });
      });

    return true;
  }

  if (message.action === "processvideo") {
    const processvideourl = `${BACKEND_URL}/generate_summary?video_url=${message.videoUrl}`;

    fetch(processvideourl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((data) => {
        sendResponse(data);
      })
      .catch((error) => {
        sendResponse({ error: error.message });
      });
  }
});

const connections = {};

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === "window-tracking") {
    const tabId = port.sender.tab.id;

    port.onMessage.addListener((message) => {
      if (message.action === "windowResized") {
        chrome.tabs.sendMessage(
          tabId,
          { action: "getContentHeight" },
          (response) => {
            port.postMessage({
              action: "windowResized",
              height: response.height,
            });
          }
        );
      }
    });

    connections[port.sender.tab.id] = port;

    port.onDisconnect.addListener(() => {
      delete connections[port.sender.tab.id];
    });
  }
});