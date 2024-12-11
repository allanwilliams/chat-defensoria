
import React, { createContext, useState, useEffect, useContext, useCallback, useRef } from 'react';
import { chatsMock, chatUsersMock, usersMock } from '../mocks/chatsMocks';
import io from 'socket.io-client'
import { useBase } from './base';
import userService from '../services/user'

const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {
  const [ chats , setChats ] = useState([]);
  const [ chatOpened , setChatOpened ] = useState();
  const [ socket, setSocket ] = useState()
  const [ user, setUser ] = useState()
  const chatOpenedRef = useRef(chatOpened)
  const chatsRef = useRef(chats)
  
  useEffect(()=>{
    getUser()
  },[])
  
  useEffect(()=>{
    if(user) socketInitializer()
  },[user])

  useEffect(()=>{
    chatOpenedRef.current = chatOpened;
  },[chatOpened])

  useEffect(()=>{
    chatsRef.current = chats;
  },[chats])

  useEffect(()=>{
    if(user) addSocketEventListenner()
  },[socket])


  const getUser = async () => {
    const us = await userService.getUser()
    setUser(us.data)
  }
  const socketInitializer = async () => {
    const socket = io({
      auth: {
        user: user
      }
    });
    setSocket(socket)
  }

  
  const addSocketEventListenner = async () => {
    socket.on('connect', function() {
      console.log('Connected');
  
      socket.emit('getAllChats', 0, (response) =>{
        console.log('getAllChats:', response),
        setChats(response)
      });
    });
    socket.on('getAllChatsResponse', function(data) {
      console.log('getAllChatsResponse', data);
      setChats(data)
    });
  
    socket.on('msg:add', async function(data) {
      handleMsgAdd(data)
    });
  
    socket.on('chat:add', function(data) {
      handleChatAdd(data)
    });

    socket.on('handleError', function(data) {
      handleError(data)
    });
    socket.on('disconnect', function() {
      console.log('Disconnected');
    });
  }

  const handleMsgAdd = (data) => {
    const currentChat = chatOpenedRef.current
    if (currentChat && data.chat_id == currentChat.id) {
      const newChat = { ...currentChat }
      newChat.mensagens.push(data)
      setChatOpened(newChat)
    }
  };

  const handleChatAdd = (data) => {
    const currentChats = chatsRef.current
    if (currentChats) {
      const newChats = [ ...currentChats ]
      newChats.push(data)
      setChats(newChats)
      setChatOpened(data)
    }
  };

  const handleError = (data) => {
    console.log(data)
  }

  const openOrCreateChat = async(user) => {
    const hasChat = await Promise.all(
      chats.map(async (chat) => {
        const hasUser = chat.users.some((u) => u.id === user.id);
        return hasUser ? chat : null;
      })
    );
    
    const filteredChats = hasChat.filter((chat) => chat !== null);
    
    if(filteredChats.length == 1) {
      setChatOpened(filteredChats[0])
    } else{
      createNewChat(user)
    }
  }

  const createNewChat = async (user) => {
    socket.emit('createNewChat',{
      user
    })
  }

  const sendMessage = async (text) => {
    socket.emit('sendMessage',{
      text,
      chatOpened
    })
  }

  return (
    <ChatContext.Provider 
      value={{ 
          chats,setChats,
          chatOpened, setChatOpened,
          socket, setSocket,
          user,setUser,
          sendMessage,
          openOrCreateChat
      }}>
        {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext)
  return context;
};
