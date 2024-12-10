import React, { useEffect, useLayoutEffect, useState } from 'react'
import Mensagem from './Mensagem'

import { useChatContext } from '../../contexts/chat'


export default function Chat() {
    const { chats } = useChatContext()
    const [chat, setChat] = useState({
        nome:'Teste',
        mensagens: [{
            body: 'teste 1',
            recebida: true
        },
        {
            body: 'teste 2',
            recebida: false
        }
    ]
    })
    return <>
        <div id="chat-container" className="fixed bottom-16 right-4 w-96">
            <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
                <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
                    <p className="text-lg font-semibold">{chat.nome}</p>
                    <button id="close-chat" className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div id="chatbox" className="p-4 h-80 overflow-y-auto">
                {chat.mensagens.map((mensagem,index) => {
                    return <Mensagem key={index} mensagem={mensagem} />
                })}
                </div>
                <div className="p-4 border-t flex">
                    <input id="user-input" type="text" placeholder="Digite sua mensagem" className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button id="send-button" className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300">Enviar</button>
                </div>
            </div>
        </div>
    </>

}