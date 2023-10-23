import React, { useState, useContext, createContext, ReactNode } from 'react';
import { TSetores } from '../interfaces/allSetores';
import { Tcargos } from '../interfaces/Cargos';
import { propsType } from '../interfaces/contextChildrenTypes';


type cargos = {
    cargos:  Tcargos | null,
    setores: string | null,
    addSetor: (value:string) => void,
    addCargos: (value: Tcargos) => void

}



export const CargosContext = createContext<cargos | null>(null)


export const CargosProvider = ({ children }:propsType) => {

    const [cargos, setcargos] = useState<Tcargos | null>(null)
    const [setores, setSetores] = useState<string | null >(null)

    const addCargos = (value: Tcargos) => {
        setcargos(value)

    }

    const addSetor = (value: string) => {
        setSetores(value)

    }

    return (
        <CargosContext.Provider value={{ addCargos, cargos, setores,  addSetor }}>
            {children}
        </CargosContext.Provider>
    )
}



