import  { useState, createContext } from 'react';
import { propsType } from '../interfaces/contextChildrenTypes';




type valores = {
    display:  string,
    toggleValor: (valor: string) => void
}



export const OpcaoDeleteContext = createContext<valores | null>(null)


export const OpcaoDeleteProvider = ({ children }:propsType) => {

    const [display, setValores] = useState<string>("none")



    const toggleValor = (value: string) => {
        setValores(value)

    }



    return (
        <OpcaoDeleteContext.Provider value={{ display, toggleValor }}>
            {children}
        </OpcaoDeleteContext.Provider>
    )
}



