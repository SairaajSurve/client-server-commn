import React, { useState, useEffect, useRef } from 'react'
import Form from './components/UsernameForm'
import Chat from './components/Chat'
import io from 'socket.io-client'
import produce from 'immer'
import './App.css';

const initialMessagesState = {
  general: [],
  random: [],
  jokes: [],
  javascript: [],
}

function App() {

  const [username, setUsername] = useState("")
  const [connected, setConnected] = useState(false)
  const [currentChat, setCurrentChat] = useState({ isChannel: true, chatName: "general", recieverId: "" })
  const [connectedRooms, setConnectedRooms] = useState(["general"])
  const [allUsers, setAllUsers] = useState([])
  const [messages, setMessages] = useState(initialMessagesState)
  const [message, setMessage] = useState("")
  const socketRef = useRef()


  const handleMessageChange = (e) => {
    setMessage(e.target.value)
  }

  useEffect(() => {
    setMessage('')
  }, [messages])

  const sendMessage = () => {
    const payload = {
      content: message,
      to: currentChat.isChannel ? currentChat.chatName : currentChat.recieverId,
      sender: username,
      chatName: currentChat.chatName,
      isChannel: currentChat.isChannel
    }
    socketRef.current.emit("send message", payload)

    const newMessages = produce((messages, draft) => {
      draft[currentChat.chatName].push({
        sender: username,
        content: message
      })
    })
    setMessages(newMessages)
  }

  const roomJoinCallback = (incomingMessages, room) => {
    const newMessages = produce((messages, draft) => {
      if(draft === undefined) {
        draft = {}
        draft[room] = incomingMessages
      } else {
        draft.room.push(incomingMessages)
      }
    })
    setMessages(newMessages)
  }

  const joinRoom = (room) => {
    const newConnectedRooms = produce((connectedRooms, draft) => {
      if( draft === undefined) {
        draft = []
        draft.push(room)
      } else {
        draft.push(room)
      }
    })
    socketRef.current.emit('join room', room, (messages) => {
      roomJoinCallback(messages, room)
    })
    setConnectedRooms(newConnectedRooms)
  }

  const toggleChat = (currentChat) => {
    if (!messages[currentChat.chatName]) {
      const newMessages = produce((messages, draft) => {
        if (draft === undefined) {
          draft = {}
          const s =  currentChat.chatName
          draft.s = []
          draft[s] = []
        }
        draft[currentChat.chatName] = []
      })
      setMessages(newMessages)
    }
    setCurrentChat(currentChat)
  }

  const handleChange = (e) => {
    setUsername(e.target.value)
  }

  const connect = (e) => {
    setConnected(true)
    socketRef.current = io.connect('http://localhost:5000')
    socketRef.current.emit('join server', username)
    socketRef.current.emit('join room', 'general', (messages) => {
      roomJoinCallback(messages, 'general')
    })
    socketRef.current.on('new user', (allUsers) => {
      setAllUsers(allUsers)
    })
    socketRef.current.on('new message', ({ content, sender, chatName }) => {
      setMessages((messages) => {
        const newMessages = produce((messages, draft) => {
          if (draft[chatName]) {
            draft[chatName].push({ content, sender })
          } else {
            draft[chatName] = [{ content, sender }]
          }
        })
        return newMessages
      })
    })
  }

  let body;

  if (connected) {
    body = (
      <Chat
        message={message}
        handleMessageChange={handleMessageChange}
        sendMessage={sendMessage}
        yourId={socketRef.current ? socketRef.current.id : ""}
        allUsers={allUsers}
        joinRoom={joinRoom}
        connectedRooms={connectedRooms}
        currentChat={currentChat}
        toggleChat={toggleChat}
        messages={messages[currentChat.chatName]}
      />
    )
  } else {
    body = (
      <Form username={username} onChange={handleChange} connect={connect} />
    )
  }

  return (
    <div className="App">
      {body}
    </div>
  );
}

export default App;
