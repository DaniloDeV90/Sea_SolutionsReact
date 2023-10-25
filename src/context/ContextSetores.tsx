import  { useState, createContext } from 'react';
import { TSetores } from '../interfaces/allSetores';
import { propsType } from '../interfaces/contextChildrenTypes';


type Setores = {
    setores: TSetores[],
    addSetores: (value: TSetores[]) => void

}



export const SetoresContext = createContext<Setores | null>(null)


export const SetoresProvider = ({ children }:propsType) => {

    const [setores, setSetores] = useState<TSetores[]>([])


    const addSetores = (value: TSetores[]) => {
        setSetores([...setores, ...value])

    }


    return (
        <SetoresContext.Provider value={{ addSetores, setores }}>
            {children}
        </SetoresContext.Provider>
    )
}



