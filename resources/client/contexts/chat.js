
import React, { createContext, useState, useEffect, useContext } from 'react';
import { chatsMock, chatUsersMock, usersMock } from '../mocks/chatsMocks';
import io, { Socket } from 'socket.io-client'
import { useBase } from './base';

const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {
  const [ chats , setChats ] = useState(chatsMock);
  const [ chatOpened , setChatOpened ] = useState(null);
  const [ socket, setSocket ] = useState(null)
  const [ user, setUser ] = useState(null)
  
  useEffect(()=>{
    getUser()
  },[])
  
  useEffect(()=>{
    socketInitializer()
  },[user])

  const getUser = async () => {
    const us = await fetch('/auth/getUser')
    setUser(await us.json())
  }
  const socketInitializer = async () => {
    const socket = io({
      auth: {
        user: user
      }
    });
      socket.on('connect', function() {
        console.log('Connected');

        socket.emit('getAllChats', 0, (response) =>{
          console.log('getAllChats:', response),
          setChats(response)
        });

        socket.emit('getAllCanais', 0, (response) =>{
          console.log('getAllCanais:', response),
          setCanais(response)
        });
        
        socket.emit('getAllStatus', 0, (response) =>{
          console.log('getAllStatus:', response),
          setStatus(response)
        });

        socket.emit('getAllTipoContato', 0, (response) =>{
          console.log('getAllTipoContato:', response),
          setTiposContato(response)
        });
      });
      socket.on('chat:add', function(data) {
        console.log('event', data);
      });
      socket.on('assistido', function(data) {
        console.log('event', data);
      });
      socket.on('disconnect', function() {
        console.log('Disconnected');
      });

    setSocket(socket)
  }

  return (
    <ChatContext.Provider 
      value={{ 
          chats,setChats,
          chatOpened, setChatOpened,
          socket, setSocket,
          user,setUser
      }}>
        {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext)
  return context;
};
