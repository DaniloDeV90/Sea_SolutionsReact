/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useRef, useState } from 'react'

import { TSetores } from '../../interfaces/allSetores'
import { LimiteDeCaracteresInputSetor } from '../../utils/LimiteDenomeSetor';
import { cargos } from '../../interfaces/Cargos';
import { CortarLetras } from '../../utils/CortarLetras';


import { UpdateNameSetor } from '../../api/Setor/UpdateSetor';
import { CreateCargo } from '../../api/Setor/CreateCargo';
import LoadingForm from '../loadings/loadingForm';
import ExcluirSVG from '../svgs/Excluir';

export interface MeuComponenteProps {
    dados: TSetores;
}
const Editar = ({ dados }: MeuComponenteProps) => {

    const [cargos, setCargos] = useState<cargos[]>([])
    const [dadoss, setDados] = useState<cargos[]>([])
    const inputEditCargo = useRef<HTMLInputElement>(null)
    const inputEdit = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const erro = document.querySelector("#ErrosCargos") as HTMLSpanElement
        erro.innerHTML = ""
        const erro2 = document.querySelector("#ErrosSetor") as HTMLSpanElement
        erro2.innerHTML = ""
        const inputSetor = inputEdit.current as HTMLInputElement
        const inputCargo = inputEditCargo.current as HTMLInputElement
        inputSetor.value = ""
        inputCargo.value = ""
        setCargos([])
        setDados([])

    }, [dados])


    const handleSubmit = (_e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        const erro = document.querySelector("#ErrosCargos") as HTMLSpanElement
        const erroContent = erro.textContent as string
        const cargo = inputEditCargo.current as HTMLInputElement


        if (cargo.value.length === 0) return null
        if (erroContent.length > 0) return null


        if (cargo.value.length >= 11) {
            const valor = cargo.value.split("");

            const newValue = CortarLetras(valor);

            setCargos([...cargos, { nome: newValue + "..." }])
            setDados([...dadoss, { nome: cargo.value }])
            cargo.value = ""
            return

        }

        setCargos([...cargos, { nome: inputEditCargo.current?.value as string }])
        setDados([...dadoss, { nome: cargo.value }])

        cargo.value = ""
    }

    useEffect(() => {

        const inputcargo = inputEditCargo.current as HTMLInputElement
        inputcargo.addEventListener("input", ev => {
            const elementoEvento = ev.target as HTMLInputElement
            const erro = document.querySelector("#ErrosCargos") as HTMLSpanElement

            const cargos = dados.cargos.map(cargos => cargos.cargo)

            const Jacadastrado = dadoss.map(cargos => cargos.nome)

            erro.style.color = "red"
            if (cargos.includes(elementoEvento.value) || Jacadastrado.includes(elementoEvento.value)) {


                erro.innerHTML = "Este cargo ja existe"
            } else {
                erro.innerHTML = ""
            }





        })


    }, [dadoss, dados])


    useEffect(() => {
        inputEdit.current?.addEventListener("input", ev => {
            const erro = document.querySelector("#ErrosSetor") as HTMLSpanElement
            LimiteDeCaracteresInputSetor(erro, ev, 20)


        })
    }, [])




    const EditSetor = async () => {


        const inputSetor = inputEdit.current as HTMLInputElement


        setLoading(false)
        await CreateCargo(dados.nomeSetor, dadoss)
        window.location.reload()
        if (inputSetor.value) {
            const setor: TSetores = await UpdateNameSetor(dados.nomeSetor, inputSetor.value)
            const erro = document.querySelector("#ErrosSetor") as HTMLSpanElement


            if (!setor.nomeSetor) erro.innerHTML = "Esse nome já existe em outros setores!"
            else window.location.reload()

        }



        setLoading(true)





    }



    return (
        <div className='Form'>



            <div className="titleSetor"> <h2>Editar {dados.nomeSetor}</h2></div>

            <form action="" className='addForm' >

                <label htmlFor="">Nome</label>
                <div className="FormNome">
                    <input type="text" className='inputAdd' ref={inputEdit} />
                    <span id="ErrosSetor"></span>
                </div>

                <label htmlFor="" className='cargoLabel' >Cargo(s)</label>
                <div className="addCargo">
                    <input type="text" className='inputAdd' ref={inputEditCargo} />

                    <span className="botaoAddCargos" onClick={e => handleSubmit(e)}  >Adicionar</span>

                </div>

                <span id='ErrosCargos'></span>
                <div className="cargosAdicionados">

                    {cargos.map((cargos, i) => (
                        <>
                            <div className="cargos" id={String(i)}>
                                <span className="spancargos">{cargos.nome} </span>
                                <ExcluirSVG />
                            </div>
                        </>

                    ))}
                </div>


            </form>
            <div className="SalvarSetor">
                {loading ? <span className="ButtonSalvar" onClick={EditSetor} >Salvar</span> : <LoadingForm />}
            </div>

        </div>
    )
}

export default Editar