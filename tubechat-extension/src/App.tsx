import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./css/App.css";
import { useContentHeight } from "./context/ContentHeightContext";
import { useNavbar } from "./context/NavbarContext";
import backgroundImage from "./assets/background.svg";
import { fetchTabUrl } from "./api";
import { APIResponse } from "./types";
import { useEffect, useState } from "react";
import { useError } from "./context/ErrorContext";
function App() {
  const { isMinimized } = useNavbar();
  const { contentHeight } = useContentHeight();
  const [tabId, setTabId] = useState("");
  const [videoReady, setVideoReady] = useState(false);
  const { error, setError } = useError();

  const appStyles: React.CSSProperties = {
    backgroundImage: `linear-gradient(rgba(17, 17, 17, 0.9), rgba(17, 17, 17, 0.9)), url(${backgroundImage})`,
    backgroundSize: "cover",
    borderRadius: "12px",
    transition: "height 0.8s ease",
    display: "flex",
    flexDirection: "column",
    height: isMinimized ? "64px" : contentHeight,
  };

  const make_video_ready = (youtubeId: string): Promise<APIResponse> => {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(
        { action: "make_video_ready", youtubeId },
        async (response: APIResponse | PromiseLike<APIResponse>) => {
          try {
            const data = await response;

            if (data.error) {
              if (data.error.includes("Network response was not ok")) {
                reject(
                  new Error(
                    "The external API seems to be down. Please try again later."
                  )
                );
              } else {
                reject(new Error(data.error));
              }
            } else {
              resolve(data);
            }
          } catch (error) {
            if (error instanceof Error) {
              reject(error);
            } else {
              reject(new Error("An unknown error occurred"));
            }
          }
        }
      );
    });
  };

  const fetchYoutubeTranscript = async () => {
    try {
      const response = await fetchTabUrl();
      if (response && response.tabUrl) {
        const params = new URLSearchParams(new URL(response.tabUrl).search);
        const id = params.get("v");
        if (id) {
          setTabId(id);
          const isVideoReady = await make_video_ready(id).catch((error) => {
            setError(error);
            return null;
          });

          if (isVideoReady && isVideoReady.data !== undefined) {
            setVideoReady(isVideoReady.data);
            if (!isVideoReady.data) setError(new Error("Transcript is not available for this video"));
          }        
        } else {
          setError(new Error("Invalid video ID"));
        }
      } else {
        setError(
          new Error(response.error || "Unable to fetch the YouTube URL")
        );
      }
    } catch (error) {
      setError(error instanceof Error ? error : new Error(String(error)));
    }
  };

  console.log({ error });

  useEffect(() => {
    fetchYoutubeTranscript();
  }, []);

  return (
    <div style={appStyles} className="app-container">
      <Navbar />
      <div className="home-page">
        {!isMinimized && <Home isVideoReady={videoReady} tabId={tabId} />}
      </div>
    </div>
  );
}

export default App;
