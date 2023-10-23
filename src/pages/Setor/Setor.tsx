

import "./SetorStyled.css"

import LogoSetor from '../../components/Adicionar/LogoSetor'
import MostrarSetores from '../../components/Adicionar/MostrarSetores'
import Formulario from '../../components/Adicionar/Formulario'
import {useContext,useEffect,useState} from "react"
import { PaginasContext } from "../../context/ContextPag"
import Editar from "../../components/Editar/Editar"
import { TSetores } from "../../interfaces/allSetores"
import Excluir from "../../components/Excluir/Excluir"



const Setor = () => {

const pag = useContext (PaginasContext)

const paginas = [{pag: <Formulario/>}, {pag: <Editar dados={pag?.dadosSetor as TSetores}/>}, {pag: <Excluir dados={pag?.dadosSetor as TSetores}/>}]

const  [opcao,setOpcao] = useState <number> (0)

useEffect (() => {

    if (pag?.opcao === "formulario") setOpcao (0)
  
    if (pag?.opcao === "editar") setOpcao (1)
    if (pag?.opcao === "excluir") setOpcao(2)
},[pag?.opcao])



    return (
        <div className="container">
            <LogoSetor />
            <div className="SetorController">
                <MostrarSetores />

             {paginas[opcao].pag}
            </div>
        </div>


    )
}

export default Setor