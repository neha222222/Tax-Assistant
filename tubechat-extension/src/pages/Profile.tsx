import "../css/Profile.css";
import ProfileLogo from "../assets/logo.svg?react";
import TextBox from "../components/TextBox";
import discordIcon from "../assets/discord.svg"
import twitterIcon from "../assets/twitter.svg"
import feedbackIcon from "../assets/feedback.svg"
import { useClerk } from "@clerk/chrome-extension";
import { useColor } from "../context/ColorContext";
import { colorsData } from "../color";
import { useNavbar } from "../context/NavbarContext";

function Profile() {
  const {signOut} = useClerk()
  const {setIsChat} = useNavbar()

  const {color, setColor} = useColor()

  const handleColorChange = async (event: { target: { value: string; }; }) => {
    const selectedColorName = event.target.value;

    const selectedColorObject = colorsData.find((color) => color.name === selectedColorName)

    if(selectedColorObject){
      localStorage.setItem('extension-main-color',selectedColorObject.color )
      setColor(() =>selectedColorObject.color)
    }
  }

  return (
    <div className="profile-page">
      <div className="header-section">
        <ProfileLogo fill={`${color}`} onClick={() => signOut(() => {
          setIsChat(true)
        })} height={80}/>
        <div className="content">
          <TextBox
            fontSize="16px"
            fontWeight={500}
            lineHeight="20px"
            content="Tube Chat"
          />
          <TextBox
            fontSize="16px"
            fontWeight={500}
            lineHeight="20px"
            content="Summarize videos and ask questions. Get the gist in minutes."
          />
        </div>
      </div>

      <div className="main-section">
        <div className="accent-color">
          <div style={{ flex: 1 }}>
            <TextBox
              fontSize="13px"
              fontWeight={500}
              lineHeight="20px"
              content="Accent Color :"
            />
          </div>
          <select className="round" style={{width: "130px"}} onChange={handleColorChange} defaultValue={colorsData.find((item) => item.color === color)?.name}>
            {colorsData.map((item) => {
              return <option key={item.name}>{item.name}</option>
            })}
          </select>
        </div>

        <div className="wallpaper">
          <div style={{ flex: 1 }}>
            <TextBox
              fontSize="13px"
              fontWeight={500}
              lineHeight="20px"
              content="Wallpaper :"
            />
          </div>
          <select className="round" style={{width: "130px"}}>
            <option>Wallpaper 1</option>
            <option>Wallpaper 2</option>
            <option>Wallpaper 3</option>
          </select>
        </div>

        <div className="someting-else">
          <div style={{ flex: 1 }}>
            <TextBox
              fontSize="13px"
              fontWeight={500}
              lineHeight="20px"
              content="Something :"
            />
          </div>
          <select className="round" style={{width: "130px"}}>
            <option>Wallpaper 1</option>
            <option>Wallpaper 2</option>
            <option>Wallpaper 3</option>
          </select>
        </div>
      </div>

      <div className="footer-section">
        <div style={{display: 'flex', gap: 8}}>
          <a href="https://discord.com/channels/@me" target="_blank"><img src={discordIcon} width={24} height={24}/></a>
          <a href="https://discord.com/channels/@me" target="_blank"><img src={twitterIcon} width={24} height={24}/></a>
        </div>

        <TextBox
              fontSize="12px"
              fontWeight={500}
              lineHeight="36px"
              content="Made by Pulpy.ai"
        />
        <a href="https://discord.com/channels/@me" target="_blank"><img src={feedbackIcon} width={24} height={24}/> </a>
      </div>
    </div>
  );
}

export default Profile;
