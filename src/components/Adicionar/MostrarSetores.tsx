/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useRef, useState } from 'react'
import SetaBaixo from '../svgs/SetaBaixo'
import SetaCima from '../svgs/SetaCima'
import { RetorneTodosOsSetores } from '../../api/Setor/MostrarSetores'
import { ListarSetores } from '../../utils/ListarSetores'
import { ControllarSetas } from '../../utils/ControllarSetas'
import { TSetores } from '../../interfaces/allSetores'
import { useContext } from "react"
import { SetoresContext } from '../../context/ContextSetores'
import { PaginasContext } from '../../context/ContextPag'
import { CortarLetras } from '../../utils/CortarLetras'
import LoadingForm from '../loadings/loadingForm'

const MostrarSetores = () => {
    const [seta, setSeta] = useState<boolean[]>([])
    const addSetores = useContext(SetoresContext)
    const [setores, setSetores] = useState<TSetores[]>([])
    const primeiroRender = useRef(true);
    const pag = useContext(PaginasContext)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (primeiroRender.current) {
            primeiroRender.current = false;

            const TodosSetores = async () => {
                setLoading(false)
                const dados: TSetores[] = await RetorneTodosOsSetores()



                addSetores?.addSetores(dados)

                const novoSeta = Array(dados.length).fill(false);
                setSeta(novoSeta);

                setSetores([...setores, ...dados])
                setLoading(true)
            }
            void TodosSetores()
        }

    }, [])
     const HandleSeta = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

        const id = parseInt(e.currentTarget.id)

        const cargos = document.getElementById("setores-" + String(id)) as HTMLDivElement


        const value = ListarSetores(cargos);
        cargos.style.display = value
        const novoArr = ControllarSetas(id, seta)
        setSeta(novoArr)

    }



    const Cargo = (cargo: string | null) => {


        if (!cargo) return null

        if (cargo.length > 11) {
            const split = cargo.split("")
            const cortada = CortarLetras(split);
            return cortada + "..."
        }
        return cargo

    }

    const EditHandle = ( dados: TSetores) => {


        pag?.toggle("editar")
        pag?.toggleDados(dados)
    }


    const DeleHandle = ( dados: TSetores) => {
        pag?.toggle("excluir")
        pag?.toggleDados(dados)
    }
    return (
        <div className="Setores">
            <div className='TItulo'>  <h1>Setores</h1></div>

            <div className="ListaDeSetores" >
                <div className="VerSetores" >
                    {loading ? setores.map((e, i) => (
                        <div key={i} className='se_tor' >

                            <div className="NomeSetor" id={String(i)} onClick={HandleSeta}>
                                <span className='tituloSetor'>{e.nomeSetor}</span>
                                <div className="ativarcargo">
                                    {seta[i] ? <SetaCima /> : <SetaBaixo />}

                                </div>
                            </div>

                            <div className="TodosOsSetores" id={'setores-' + String(i)} >
                                <div className="SetoresSalvos">
                                    {e.cargos.map(e => (
                                        <>
                                            <span className='SpanCargos'>{Cargo(e.cargo)}</span>
                                        </>

                                    ))}
                                </div>
                                <div className="botoesControllerSetor">
                                    <span onClick={_i => EditHandle(e)}>Editar</span> <span onClick={_i => DeleHandle(e)}>Excluir / Editar cargos</span> 
                                </div>

                            </div>
                        </div>
                    )) : null}
                    {loading && !setores.length ? <span>Adicione um setor!</span> : null}

                    {!loading ? <LoadingForm /> : null}

                </div>
            </div>

        </div>
    )
}

export default MostrarSetores