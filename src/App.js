import './App.css';
import  io  from 'socket.io-client'
import { useState } from "react";
import Chat from './Chat';

const socket = io.connect("http://localhost:3001")

// npm run build, then npm install -g serve,
// npx serve -s build.

function App() {

  const [username, setUsername] = useState('')
  const [showChat, setShowChat] = useState(false)
  const room = 23;

  const joinChat = () => {
    if (username !== "") {
      socket.emit("join_chat", room)
      setShowChat(true);
    }
  }

  return (
    <div className='App'>
      {!showChat ? (
      <div className='joinChatContainer'>
        <h3>Join A Chat</h3>
        <input placeholder='Username' onChange={(e) => {
        setUsername(e.target.value)
        }} />
        <button onClick={joinChat}>Join Chat</button>
      </div>
      )
    : (
      <Chat socket={socket} username={username} room={room}/>
    )}
    </div>
  )
}

export default App;
