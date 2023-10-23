import React, { useState, useContext, createContext, ReactNode } from 'react';
import { TSetores } from '../interfaces/allSetores';
import { Tcargos } from '../interfaces/Cargos';
import { propsType } from '../interfaces/contextChildrenTypes';


type Setor = {
    setor: Tcargos | null,
    addSetor: (value: Tcargos) => void,
    nomeSetor: string | null,
    addNomeSetor: (value:string) => void

}



export const TrabalhadorContext = createContext<Setor | null>(null)


export const TrabalhadorProvider = ({ children }:propsType) => {

    const [setor, setSetores] = useState<Tcargos | null>(null)

    const [nomeSetor, setNomeSetor] = useState<string | null>(null)

    const addSetor = (value: Tcargos) => {
        setSetores(value)

    }
    const addNomeSetor = (value:string) => {
         setNomeSetor (value)
    }

    return (
        <TrabalhadorContext.Provider value={{ addSetor, setor,addNomeSetor,nomeSetor }}>
            {children}
        </TrabalhadorContext.Provider>
    )
}



