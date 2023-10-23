/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, useRef, useEffect, useContext } from "react"
import { CortarLetras } from "../../utils/CortarLetras"
import { CreateSetor } from "../../api/Setor/CreateSetor"
import { SetoresContext } from "../../context/ContextSetores"
import LoadingForm from "../loadings/loadingForm"
import { CreateCargo } from "../../api/Setor/CreateCargo"
import { cargos } from "../../interfaces/Cargos"
import { LimiteDeCaracteresInputSetor } from "../../utils/LimiteDenomeSetor"
import ExcluirSVG from "../svgs/Excluir"




const Formulario = () => {


    const Setores = useContext(SetoresContext)
    const [loading, setLoading] = useState(true)
    const [cargos, setCargos] = useState<cargos[]>([])
    const [dados, setDados] = useState<cargos[]>([])
    const nomeSetor = useRef<HTMLInputElement>(null)
    const inputCargo = useRef<HTMLInputElement>(null)

    const handleSubmit = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {

        const input = inputCargo.current as HTMLInputElement;

        const erro = document.querySelector("#ErrosCargos") as HTMLSpanElement

        const CargoErroContent = erro.textContent as string
        if (CargoErroContent.length > 0) return null

        if (input.value.length >= 11) {
            const valor = input.value.split("");
            const newValue = CortarLetras(valor);
            setCargos([...cargos, { nome: newValue + "..." }])
            setDados([...dados, { nome: input.value }])
            input.value = ""
            return


        }

        setCargos([...cargos, { nome: inputCargo.current?.value as string }])
        setDados([...dados, { nome: input.value }])

        input.value = ""
    }


    useEffect(() => {
        nomeSetor.current?.addEventListener("input", ev => {
            const erro = document.querySelector("#ErrosSetor") as HTMLSpanElement

            LimiteDeCaracteresInputSetor(erro, ev, 20)

        })
    }, [])

    useEffect(() => {
const  inputCargoAdd = inputCargo.current as HTMLInputElement

            inputCargoAdd.addEventListener("input", ev => {
            const ElementEvento = ev.target as HTMLInputElement
            const erro = document.querySelector("#ErrosCargos") as HTMLSpanElement
            const verificar = dados.filter(nomes => nomes.nome === ElementEvento.value)
            erro.style.color = "red"
            if (verificar.length > 0) erro.innerHTML = "Este cargo ja foi cadastrado!"
            else erro.innerHTML = ""

        })

    }, [dados])


    const EnviarDados = async () => {
        const erro = document.querySelector("#ErrosSetor") as HTMLSpanElement
        const erro2 = document.querySelector("#ErrosCargos") as HTMLSpanElement
        if (!erro.textContent?.length) {
            const nome = nomeSetor.current as HTMLInputElement

            if (nome.value.length === 0) {
                erro.style.color = "red"
                erro.innerHTML = "Nome de setor vazio!"
                return
            }
            if (erro2.textContent?.length) return null

            const result = Setores?.setores.map(setores => setores.nomeSetor)
                .filter(setores => setores === nome.value) as string []
 

            if (result?.length > 0) {
                erro.innerHTML = "Este setor ja esta cadastrado!"
            } else {

                setLoading(false)
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                await CreateSetor(nomeSetor.current?.value as string)

                await CreateCargo(nomeSetor.current?.value as string, dados)
                window.location.reload()
                setLoading(true)
            }




        }

    }
    return (
        <div className='Form'>


            <div className="titleSetor"> <h2>Adicionar setor</h2></div>

            <form action="" className='addForm' >

                <label htmlFor="">Nome</label>
                <div className="FormNome">
                    <input type="text" className='inputAdd' ref={nomeSetor} />
                    <span id="ErrosSetor"></span>
                </div>



                <label htmlFor="" className='cargoLabel' >Cargo(s)</label>
                <div className="addCargo">
                    <input type="text" className='inputAdd' ref={inputCargo} />
                    <span className="botaoAddCargos" onClick={e => handleSubmit(e)} >Adicionar</span>
                </div>

                <span id="ErrosCargos"></span>
                <div className="cargosAdicionados">

                    {cargos.map((e, i) => (
                        <>

                            <div className="cargos" id={String(i)}>
                                <span className="spancargos">{e.nome} </span>
                                <ExcluirSVG />
                            </div>


                        </>
                    ))}
                </div>


            </form>
            <div className="SalvarSetor">
                {loading ? <span className="ButtonSalvar" onClick={EnviarDados} >Salvar</span> : <LoadingForm />}
            </div>

        </div>
    )
}

export default Formulario