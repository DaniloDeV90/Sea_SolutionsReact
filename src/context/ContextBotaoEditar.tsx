import  { useState, createContext } from 'react';
import { propsType } from '../interfaces/contextChildrenTypes';




type valores = {
    display:  string,
    toggleValor: (valor: string) => void
}




export const OpcaoUpdateContext = createContext<valores | null>(null)



export const OpcaoUpdateProvider = ({ children }: propsType) => {

    const [display, setValores] = useState<string>("none")



    const toggleValor = (value: string) => {
        setValores(value)

    }



    return (
        <OpcaoUpdateContext.Provider value={{ display, toggleValor }}>
            {children}
        </OpcaoUpdateContext.Provider>
    )
}



