export const usersMock = [
    { id: 1, nome: 'Allan'},
    { id: 2, nome: 'Bastião'},
]

export const mockMensagens = [
    {
        body: 'teste',
        created_by: 1,
        recebida: true
    },
    {
        body: 'teste2',
        created_by: 2,
        recebida: false
    },
    {
        body: 'teste3',
        created_by: 1,
        recebida: true
    },
    {
        body: 'teste4',
        created_by: 2,
        recebida: false
    },
]

export const gruposMock = [
    { 
        id: 1,
        nome: 'cotin',
        membros: [ ...usersMock ]
    }
]
export const chatsMock = [
    {
        id: 1,
        nome:'Allan',
        tipo: 'user',
        mensagens: [...mockMensagens]
    },
    { 
        id: 2,
        nome:'Bastião', 
        tipo: 'user'
    },
    { 
        id: 3, 
        nome:'Cotin', 
        tipo: 'group',
        mensagens: [...mockMensagens],
        grupo: gruposMock[0]
    },
]

export const chatUsersMock = [
    { id: 1, user_id: 1, chat_id: 1},
    { id: 1, user_id: 2, chat_id: 1},
]

