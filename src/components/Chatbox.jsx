import React, { useEffect, useRef, useState } from "react";
import "../../public/styles.css";
import sendBtn from "../../Assets/icons8-send-button-30.png";
import userIcon from "../../Assets/user-shield-alt-1-svgrepo-com.svg";
import gptIcon from "../../Assets/circle-heat-svgrepo-com.svg";
import { runChat } from "./Gemini.jsx";

function ChatBox() {
  const msgEnd = useRef(null);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);

  const handleSend = async () => {
    const text = input;
    setInput("");
    setMessages([...messages, { text, isBot: false }]);

    const res = await runChat(input);
    setMessages([...messages, { text: input, isBot: false }, { text: res, isBot: true }]);
  };

  const handleEnter = async (e) => {
    if (e.key === "Enter") await handleSend();
  };

  const shouldPlayVideo = messages.length === 0; // Only play video if messages are null

  return (
    <div className="ChatBox">
      

      <div className="chats">
      <div className={`backgroundVideo ${shouldPlayVideo ? "" : "hidden"}`}>
        {/* <h1>FosterAI</h1> */}
        
        {shouldPlayVideo && (
          <><video autoPlay loop muted playsInline className="back">
              <source src="Assets\4K Floating Particles Space 2160p Motion Background.mp4"></source>
            </video><div className="overlayText">
                {/* Your text goes here */}
                <p>FosterAI</p>
              </div></>
              )}
      </div>


        {messages.map((message, i) => (
          <div key={i} className={message.isBot ? "chat bot" : "chat"}>
            <img className="chatImg" src={message.isBot ? gptIcon : userIcon} alt="" />
            <p className="txt">{message.text}</p>
          </div>
        ))}
        <div ref={msgEnd} />
      </div>
      <div className="chatFooter">
        <div className="inp">
          <input
            type="text"
            placeholder="Message FosterAI..."
            value={input}
            onKeyDown={handleEnter}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button className="send" onClick={handleSend}>
            <img src={sendBtn} alt="send" />
          </button>
        </div>
        <p>Beta stage may prone to error.</p>
      </div>
    </div>
  );
}

export default ChatBox;
