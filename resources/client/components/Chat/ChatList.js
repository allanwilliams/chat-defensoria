import React, { useEffect, useLayoutEffect, useState } from 'react'

import { useChatContext } from '../../contexts/chat'
import ChatCard from './ChatCard'


export default function ChatList() {
    const { chats } = useChatContext()
    
    return <>
        <div className="w-1/4 bg-white border-r border-gray-300">
          
          <header className="h-16 p-4 border-b border-gray-300 flex justify-between items-center bg-green-900 text-white">
            <h1 className="text-base font-semibold">Defensoria<br/>
              <a href="/auth/logout">sair</a>
            </h1>
          </header>
        
          
          <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
            {chats.map((chat,index) => {
               return <ChatCard key={index} chat={chat}></ChatCard>
            })}
          </div>
        </div>
    </>

}