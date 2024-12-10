import React, { useEffect, useLayoutEffect, useState } from 'react'

import { useChatContext } from '../../contexts/chat'


export default function ChatCard({chat}) {
    const { setChatOpened } = useChatContext()
    const selectChat = function(chat) {
        console.log('abri')
        setChatOpened(chat)
    }

    const firstMessage = function(){
        return chat.mensagens ? chat.mensagens[0].body : '-' 
    }
    return <>
        <div onClick={()=> {selectChat(chat)}} className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
            </div>
            <div className="flex-1">
                <h2 className="text-lg font-semibold">{chat.nome}</h2>
                <p className="text-gray-600">{firstMessage()}</p>
            </div>
        </div>
    </>

}