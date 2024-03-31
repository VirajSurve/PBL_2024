import React, { useEffect, useRef, useState } from "react";
import "../../public/styles.css";
import sendBtn from "../../Assets/send.svg";
import userIcon from "../../Assets/user.svg";
import gptIcon from "../../Assets/circle-heat-svgrepo-com.svg";
import { runChat } from "./Gemini.jsx";
// import pg from "pg";

// const db =new pg.Client({
//     user:"postgres",
//     host:"localhost",
//     database:"FosterAI",
//     password:"12345",
//     port:5432,
// });


function ChatBox() {
  const msgEnd = useRef(null);

  const [input, setInput] = useState("");
  let [messages, setMessages] = useState([]);

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

  const shouldPlayVideo = messages.length === 0; 

  // db.connect();

  // db.query("SELECT * FROM messages",(err,res)=>{
  //   if(err){
  //     console.error("Error executing Query",err.stack);
  //   }else{
  //     messages=res.rows;
  //     console.log(messages);
  //   }
  //   db.end();
  // });

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
