import React, { useState, useEffect } from "react";
import user from "../../services/user";
import { useChatContext } from '../../contexts/chat'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function BuscaContatoV2() {
    const { openOrCreateChat } = useChatContext()

    const [searchTerm, setSearchTerm] = useState("");
    const [buscaAtiva, setBuscaAtiva] = useState(true);
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    // Função para buscar os resultados
    const fetchResults = async (term) => {
        if (!term) {
        setResults([]);
        return;
        }

        try {
        const response = await user.listUsers(term)
        setResults(response.data);
        } catch (error) {
        console.error("Erro ao buscar resultados:", error);
        setResults([]);
        }
    };

    const handleSelectChat = async(user) => {
        setSearchTerm('');
        setIsOpen(false);
        setBuscaAtiva(false);
        openOrCreateChat(user)
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
        fetchResults(searchTerm);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    return (
        <>  
            { buscaAtiva ?
            <Dialog open={buscaAtiva} onClose={setBuscaAtiva} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/50 transition-opacity data-[closed]:opacity-90 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="absolute top-0 transform rounded-lg bg-white shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="relative items-center">
                            <input
                                type="text"
                                className="w-full px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
                                placeholder="Buscar contato..."
                                value={searchTerm}
                                onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setIsOpen(true);
                                }}
                            />
                            {isOpen && results.length > 0 && (
                                <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                                {results.map((user) => (
                                    <li
                                    key={user.id}
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-100 cursor-pointer"
                                    onClick={() => {
                                        handleSelectChat(user)
                                    }}
                                    >
                                    {user.nome}
                                    </li>
                                ))}
                                </ul>
                            )}
                            {isOpen && searchTerm && results.length === 0 && (
                                <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-gray-500 text-center">
                                Contato não localizado
                                </div>
                            )}
                        </div>
                    </DialogPanel>
                    </div>
                </div>
            </Dialog>
            :
            <div title="Criar/Buscar contato">
                <svg
                    className="size-6 cursor-pointer"
                    onClick={()=>{setBuscaAtiva(true)}}
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={30} strokeWidth={1.5} stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
            </div>
            }
        </>
    );
};
