import { SignInButton } from "@clerk/chrome-extension";
import TextBox from "../components/TextBox";
import "../css/Login.css";
import { useColor } from "../context/ColorContext";

function Login() {

  const {color} = useColor()

  return (
    <div className="login-page">
      <div className="content-section">
        <TextBox
          fontSize="16px"
          fontWeight={500}
          lineHeight="20px"
          content="Tube Chat"
        />

        <TextBox
          fontSize="13px"
          fontWeight={500}
          lineHeight="16.25px"
          content="Summarize videos and ask questions. Get the gist in minutes."
        />
      </div>

      <SignInButton>
        <button style={{backgroundColor: color}}>Login</button>
      </SignInButton>
    </div>
  );
}

export default Login;
