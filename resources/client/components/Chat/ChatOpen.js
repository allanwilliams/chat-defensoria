import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useChatContext } from '../../contexts/chat'
import Mensagem from './Mensagem'


export default function ChatOpen() {
    const { chatOpened, user, sendMessage } = useChatContext()
    const messagesContainerRef = useRef();
    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [chatOpened]);
    
    const textRef = useRef()
    
    const groupMembersListStr = function(){
        const values = chatOpened.grupo.membros.map(membro => membro['nome']);
        return values.sort().join(', ');
    }

    const chatName = function(){
        return chatOpened.users.filter( u => u.id != user.id)[0].nome
    }

    const sendMessageToChatOpned = function(){
        const text = textRef.current.value
        textRef.current.value = ''
        sendMessage(text)
    }
    
    return <>
    { chatOpened ?
        <div className="flex-1">
            
            <header className="h-16 p-2 border-b border-gray-300 flex justify-between items-center bg-green-900 text-white">
                <h1 className="text-base font-semibold">
                    {chatName()}<br/>
                    {chatOpened.tipo == 'group' && <small>{ groupMembersListStr() }</small> }
                </h1>
            </header>
            
            
            <div ref={messagesContainerRef} className="h-screen overflow-y-auto p-4 pb-36">
                {chatOpened && chatOpened.mensagens && chatOpened.mensagens.map((mensagem,index) => {
                    return <Mensagem key={index} mensagem={mensagem} />
                })}
            </div>
            
            
            <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
                <div className="flex items-center">
                    <input ref={textRef} name='text' type="text" placeholder="Digite sua mensagem..." className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500" />
                    <button onClick={()=>{ sendMessageToChatOpned() }} className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">Enviar</button>
                </div>
            </footer>
        </div>
        : 
        <div style={{background:'/images/fundo.png'}} className='w-3/4 flex flex-column justify-center items-center'>
            <img width={"40%"} className='opacity-20' src="/images/dpge-brasao.png" />
        </div>
    }
    </>

}