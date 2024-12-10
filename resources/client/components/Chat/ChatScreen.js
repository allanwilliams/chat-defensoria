import React, { useEffect, useLayoutEffect, useState } from 'react'

import { useChatContext } from '../../contexts/chat'
import ChatList from './ChatList'
import ChatOpen from './ChatOpen'


export default function ChatScreen() {
    const { chats } = useChatContext()
    
    return <>
      <div className="flex h-screen overflow-hidden">
        <ChatList></ChatList>  
        <ChatOpen></ChatOpen>
      </div>
    </>

}