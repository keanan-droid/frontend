import React from 'react'
import { useEffect, useState } from "react";
import ScrollToBottom from 'react-scroll-to-bottom'

const Chat = ({ socket, username, room }) => {

    const [message, setMessage] = useState('')
    const [messageList, setMessageList] = useState([])
    // const [isOnline, setIsOnline] = useState(true)

    const sendMessage = async (e) => {
        if (message !== "") {
            const messageData = {
                room: room,
                user_id: socket.id,
                username: username,
                message: message,
            };

            await socket.emit("send_message", messageData, room );
            setMessageList((list) => [...list, messageData]);
            setMessage("");
        }
    }

    // const exitChat = (e) => {
    //     socket.emit("disconnected")
    //     setIsOnline(false)
    // }

    useEffect(() => {
        socket.on("recieve_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
        return () => {
            socket.off("recieve_message", (data) => {
                console.log("hello");
            })
        }
    }, [socket])

  return (
    <div className='chat-window'>
        <div className='chat-header'>
            <p>Live Chat</p>
        </div>

        <div className='chat-body'>
            <ScrollToBottom className='message-container'>
                {messageList.map((messageContent) => {
                    return <div className='message' id={username === messageContent.username ? "you" : "other"}>
                        <div>
                            <div className='message-content'>
                                <p>{messageContent.message}</p>
                            </div>
                            <div className='message-meta'>
                                <p id='author'>{messageContent.username}</p>
                            </div>
                        </div>
                    </div>
                })}
            </ScrollToBottom>
        </div>

        <div className='chat-footer'>
            <input type="text" value={message} placeholder='Message...' onChange={(event) => {
                setMessage(event.target.value)
            }} />
            <button onClick={sendMessage}>Send</button>
        </div>
        {/* <div className='Exit'>
            <button id='exit_btn' onClick={exitChat}>Exit</button>
        </div> */}
    </div>
  )
}

export default Chat