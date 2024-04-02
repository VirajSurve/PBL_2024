import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../../public/styles.css";
import sendBtn from "../../Assets/send.svg";
import userIcon from "../../Assets/user.svg";
import gptIcon from "../../Assets/logo.ico";
import { runChat } from "./Gemini.jsx";



function ChatBox() {
  const msgEnd = useRef(null);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [refresh, setRefresh] = useState(false);


  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    fetchData();
}, [refresh]);  // Depend on refresh instead of messages


  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/messages/send");
      const result = response.data; // Access the array of messages
      console.log(result);
      setMessages(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  
  


  const handleSend = async () => {
    
    var userText = input;
    setInput("");
    setMessages([...messages, { txt: userText, isBot: false }]);
  
    var res = await runChat(input);
    setMessages([...messages, { txt: userText, isBot: false }, { txt: res, isBot: true }]);
  
    try {
      await axios.post("http://localhost:3000/api/messages/receive", {
        userText: userText,
        response: res, // Use the correct property name (aiResponse)
      });
      console.log("Message sent to server successfully");
      
    } catch (error) {
      console.error("Error in sending message:", error);
    }
  };
  




  
  const handleEnter = async (e) => {
    if (e.key === "Enter") await handleSend();
  };

  const shouldPlayVideo = messages.length === 0; 


  return (
    <div className="ChatBox">
      

      <div className="chats">
      <div className={`backgroundVideo ${shouldPlayVideo ? "" : "hidden"}`}>
        {/* <h1>FosterAI</h1> */}
        
        {shouldPlayVideo && (
          <><video autoPlay loop muted playsInline className="back">
              <source src="Assets\4K Floating Particles Space 2160p Motion Background.mp4"></source>
            </video><div className="overlayText">
                <p>FosterAI</p>
              </div></>
              )}
      </div>


        {messages.map((message, i) => (
          <div key={i} className={message.isBot ? "chat bot" : "chat"}>
            <img className="chatImg" src={message.isBot ? gptIcon : userIcon} alt="" />
            <p className="txt">{message.txt}</p>
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
        <div className="footer"><p>Beta stage may prone to error.</p></div>
        
      </div>
    </div>
  );
}

export default ChatBox;
