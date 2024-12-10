import React, { useEffect, useLayoutEffect, useState } from 'react'


export default function App() {

    const [texto, setTexto] = useState('testes')
    useEffect(() => {
       setTimeout( () => {
        setTexto('hello worduru')
       },1000)
    }, [])

    return <div>
        {texto}
        </div>

}