import React from "react";
import "../../public/styles.css";
import ChatBox from "./Chatbox";
import Sidebar from "./Sidebar";

function App() {
  return (
    <>
      <div className="App">
        <Sidebar />
        <ChatBox />
      </div>
    </>
  );
}

export default App;
