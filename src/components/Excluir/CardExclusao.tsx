/* eslint-disable @typescript-eslint/no-misused-promises */
import  { useContext, useState, useEffect } from 'react'
import { OpcaoDeleteContext } from '../../context/ContextBotaoExcluir'

import { CargosContext } from '../../context/ContextTrabalhoCargo'
import { DeleteCargo } from '../../api/cargo/DeleteCargo'
import { DeleteSetor } from '../../api/Setor/DeleteSetor'
import LoadingForm from '../loadings/loadingForm'




const CardExclusao = () => {
    const cardDeExclusao = useContext(OpcaoDeleteContext)
    const cargos = useContext(CargosContext)
    const [loading, setLoading] = useState(true)

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

        setLoading (false)
        if ( setorCargo && !nomeCargo) await DeleteSetor(setorCargo)
        console.log (nomeCargo, setorCargo)
        if (nomeCargo && setorCargo) await DeleteCargo(nomeCargo, setorCargo)
    
   

        cardDeExclusao?.toggleValor("none")
        setLoading (true)
        window.location.reload()


    }

    return (
        <div className="confirmarExclusaoContainer" style={mostrar}   >
            <div className="confirmarExclusao" >

                <div className="excluirOpcao">
                    Deseja realmente excluir?


                </div>

                <div className="exclusaoOpcoes">
                
                 {loading ?   <> <span onClick={ExcluirDados}>Sim</span>
                    <span onClick={naoExclusao}>Não</span>  </>: <LoadingForm/>}
                </div>
            </div>

        </div>
    )
}

export default CardExclusao