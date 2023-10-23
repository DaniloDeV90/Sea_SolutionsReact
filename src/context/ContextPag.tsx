import React, { useState, useContext, createContext, ReactNode } from 'react';
import { TSetores } from '../interfaces/allSetores';
import { propsType } from '../interfaces/contextChildrenTypes';



type pag = {
    opcao: string,
    dadosSetor: TSetores | null,
    toggle: (value: string) => void
    toggleDados: (value:TSetores) => void
}



export const PaginasContext = createContext<pag | null>(null)


export const PaginaProvider = ({ children }: propsType) => {

    const [opcao, setSetores] = useState<string>("formularo")

    const [dadosSetor, setDadosSetor] = useState<TSetores | null>(null)

    const toggle = (value: string) => {
        setSetores(value)

    }

    const toggleDados = (value:TSetores) => {
     
        setDadosSetor (value)
    }


    return (
        <PaginasContext.Provider value={{ toggle, opcao, toggleDados,  dadosSetor }}>
            {children}
        </PaginasContext.Provider>
    )
}



