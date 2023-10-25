/* eslint-disable @typescript-eslint/no-misused-promises */

import { useContext, useEffect, useRef, useState } from "react"
import { OpcaoUpdateContext } from "../../../context/ContextBotaoEditar"
import { TrabalhadorContext } from "../../../context/TrabalhadorContext"
import "./trabalhadoresStyle.css"
import { CreateTrabalhador } from "../../../api/trabalhador/CreateTrabalhador"
import LoadingForm from "../../loadings/loadingForm"
import { TSetores } from "../../../interfaces/allSetores"
const AdicionarTrabalhador = () => {
    const cardUpdate = useContext(OpcaoUpdateContext)
    const trabalhador = useContext(TrabalhadorContext)
    const [mostrar, setMostrar] = useState({ display: "none" })
    const inputNome = useRef<HTMLInputElement>(null)
    const inputCPF = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const valor = cardUpdate?.display as string
        setMostrar({ display: valor })
    }, [cardUpdate?.display])



    useEffect(() => {
        inputCPF.current?.addEventListener("input", ev => {
            const ElementEvent = ev.target as HTMLInputElement;
            const erroNome = document.querySelector("#erroInputCPF") as HTMLSpanElement

            const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

            if (regex.test(ElementEvent.value)) {

                erroNome.innerHTML = ""

            } else {
                erroNome.style.color = "red"
                erroNome.innerHTML = "formato inválido!"
            }


        })
    })
    const naoAdicionar = () => {
        cardUpdate?.toggleValor("none")
    }
    const addTrabalhador = async () => {
        const erroInputCPF = document.querySelector("#erroInputCPF") as HTMLSpanElement
        erroInputCPF.style.color = "red"
        const erroNome = document.querySelector("#erroInputNome") as HTMLSpanElement
        if (inputNome.current?.value.length == 0) {
            erroNome.style.color = "red"
            erroNome.innerHTML = "nome vazio!"
            return
        }



const erroInputCPFContext = erroInputCPF.textContent as string

        if (inputCPF.current?.value.length == 0) {

            erroInputCPF.innerHTML = "cpf vazio!!"
            return null
        }

        if (erroInputCPFContext.length > 0) return null


        const nome = inputNome.current?.value
        const cpf = inputCPF.current?.value
        setLoading(false)
       // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
       const trabalhadores:TSetores =   await CreateTrabalhador(nome as string, trabalhador?.setor?.cargo as string, trabalhador?.nomeSetor as string, cpf as string)
   

       console.log (trabalhadores.nomeSetor)
        setLoading(true)

     if (trabalhadores.nomeSetor)   window.location.reload ()
     else erroInputCPF.innerHTML  = "Este CPF já está cadastrado!!"



    }
    return (
        <div className="confirmarExclusaoContainer" style={mostrar} >
            <div className="confirmarUpdate" >

                <form action="" className="formUpdate">

                    <label htmlFor="" >Nome</label>
                    <input type="text" ref={inputNome} />

                    <span id="erroInputNome"></span>
                    <label htmlFor="">CPF</label>
                    <input type="text" ref={inputCPF} />
                    <span id="erroInputCPF"></span>
                    <span>formato: xxx.xxx.xxx-xx</span>
                </form>
                <div className="Adicionar_Cancelar">

                    {loading ? <>  <span onClick={addTrabalhador} >Adicionar</span>
                        <span onClick={naoAdicionar}>Cancelar</span> </> : <LoadingForm />}

                </div>
            </div>

        </div>
    )
}

export default AdicionarTrabalhador