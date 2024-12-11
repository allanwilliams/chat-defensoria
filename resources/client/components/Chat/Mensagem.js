import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useChatContext } from '../../contexts/chat'

export default function Mensagem({mensagem}) {
    
    const { user } = useChatContext()

    const getSender = function(){
        return mensagem.created_by != user.id
    }

    const classMessage = getSender() ? 'text-left' : 'text-right'
    const classTextMessage = getSender() ? 'bg-gray-200 text-gray-700' : 'bg-blue-500 text-white'
    return <div className={`${classMessage} mb-2`}>
        <p className={`${classTextMessage} rounded-lg py-2 px-4 inline-block`}>{mensagem.body}</p>
    </div>

}