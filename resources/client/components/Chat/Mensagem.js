import React, { useEffect, useLayoutEffect, useState } from 'react'


export default function Mensagem({mensagem}) {
    const classMessage = mensagem.recebida == true ? 'text-left' : 'text-right'
    const classTextMessage = mensagem.recebida == true ? 'bg-gray-200 text-gray-700' : 'bg-blue-500 text-white'
    return <div className={`${classMessage} mb-2`}>
        <p className={`${classTextMessage} rounded-lg py-2 px-4 inline-block`}>{mensagem.body}</p>
    </div>

}