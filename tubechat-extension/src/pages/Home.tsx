import Profile from "./Profile";
import "../css/Home.css";
import Login from "./Login";
import { SignedIn, SignedOut } from "@clerk/chrome-extension";
import Chat from "../components/Chat";
import { useNavbar } from "../context/NavbarContext";
import { useColor } from "../context/ColorContext";
import { useError } from "../context/ErrorContext";

interface HomeProps {
  tabId: string;
  isVideoReady: boolean;
}

const Home: React.FC<HomeProps> = ({ tabId, isVideoReady }) => {
  const { isChat } = useNavbar();
  const { color } = useColor();
  const {error} = useError()
  return (
    <div className="home-section">
      {isChat ? (
        <>
          <SignedOut>
            <Login />
          </SignedOut>
          <SignedIn>
            {error ? (
              <div className="loading-section">
                <span style={{ color: '#FF3333' }}>{error.message}</span>
              </div>
            ) : (
              <>
                {isVideoReady ? (
                  <Chat tabId={tabId} />
                ) : (
                  <div className="loading-section">
                    <span style={{ color: color }}>Getting your video ready...</span>
                  </div>
                )}
              </>
            )}
          </SignedIn>
        </>
      ) : (
        <Profile />
      )}
    </div>
  );
};

export default Home;