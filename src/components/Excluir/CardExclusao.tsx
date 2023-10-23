/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useState, useEffect } from 'react'
import { OpcaoDeleteContext } from '../../context/ContextBotaoExcluir'

import { CargosContext } from '../../context/ContextTrabalhoCargo'
import { DeleteCargo } from '../../api/cargo/DeleteCargo'
import { DeleteSetor } from '../../api/Setor/DeleteSetor'




const CardExclusao = () => {
    const cardDeExclusao = useContext(OpcaoDeleteContext)
    const cargos = useContext(CargosContext)


    const [mostrar, setMostrar] = useState({ display: "none" })


    useEffect(() => {

        const valor = cardDeExclusao?.display as string
        setMostrar({ display: valor })
    }, [cardDeExclusao?.display])

    const naoExclusao = () => {
        cardDeExclusao?.toggleValor("none")
    }

    const ExcluirDados = async () => {


        const nomeCargo = cargos?.cargos?.cargo as string
        const setorCargo = cargos?.setores as string

        if ( setorCargo && !nomeCargo) await DeleteSetor(setorCargo)
        console.log (nomeCargo, setorCargo)
        if (nomeCargo && setorCargo) await DeleteCargo(nomeCargo, setorCargo)
    
   

        cardDeExclusao?.toggleValor("none")
        window.location.reload()


    }

    return (
        <div className="confirmarExclusaoContainer" style={mostrar}   >
            <div className="confirmarExclusao" >

                <div className="excluirOpcao">
                    Deseja realmente excluir?


                </div>

                <div className="exclusaoOpcoes">
                
                    <span onClick={ExcluirDados}>Sim</span>
                    <span onClick={naoExclusao}>Não</span>
                </div>
            </div>

        </div>
    )
}

export default CardExclusao