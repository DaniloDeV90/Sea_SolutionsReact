import  { useContext } from 'react'
import { MeuComponenteProps } from '../Editar/Editar'
import "./StyleExcluir.css"
import ExcluirSVG from '../svgs/Excluir'

import { OpcaoDeleteContext } from '../../context/ContextBotaoExcluir'
import CardExclusao from './CardExclusao'
import { Tcargos } from '../../interfaces/Cargos'
import { CargosContext } from '../../context/ContextTrabalhoCargo'
import AdicionarTrabalhador from '../Adicionar/trabalhadores/AdicionarTrabalhador'
import { TrabalhadorContext } from '../../context/TrabalhadorContext'
import { OpcaoUpdateContext } from '../../context/ContextBotaoEditar'

const Excluir = ({ dados }: MeuComponenteProps) => {
    const cardDeExclusao = useContext(OpcaoDeleteContext)
    const cargos = useContext(CargosContext)
    const trabalhador = useContext(TrabalhadorContext)
    const cardDeUpdate = useContext(OpcaoUpdateContext)




    const handleExclude = ( dados: Tcargos, nomeSetor: string) => {

        cardDeExclusao?.toggleValor("flex")

        cargos?.addCargos(dados)
        cargos?.addSetor(nomeSetor)
    }

    const ExcludeSetor = () => {
        cardDeExclusao?.toggleValor("flex")
        cargos?.addSetor(dados.nomeSetor)
        
    }

    const adicionarTrabalhador = ( dadoss: Tcargos) => {

        cardDeUpdate?.toggleValor ("flex");
        trabalhador?.addSetor(dadoss)
        
        trabalhador?.addNomeSetor (dados.nomeSetor)
    }
    return (
        <div className='Form'>
            <AdicionarTrabalhador />
            <CardExclusao />

            <div className="titleSetor"> <h2>Excluir/Editar dados de {dados.nomeSetor}</h2>   <span className='ButtonDeletarSetor' onClick={ExcludeSetor}>Apagar Setor</span> </div>

            <form action="" className='addForm' >


                <div className="Excluir">
                    {dados.cargos.map((ev, i) => (
                        <>

                            <div className="Cargos_Trabalhadores" key={i} id={'cargos_trabalhadores-' + dados.nomeSetor + "-" + String(i)}  >
                                <div className="dadosTrabalhadores">


                                    <span> Cargo:  {ev.cargo}</span>
                                    <span> Trabalhador: {ev.trabalhador ? ev.trabalhador.nome : "nenhum "}</span>
                                    <span>{ev.trabalhador ? "CPF: " + ev.trabalhador.cpf : ""}</span>
                                </div>
                                <div className="opcoes">
                                    <span title='excluir cargo' className='spanExclusao' onClick={ () => handleExclude( ev, dados.nomeSetor)}>
                                        <ExcluirSVG />
                                    </span>




                                    {!ev.trabalhador ? <span title="adicionar trabalhadores" className="material-symbols-outlined  spanEdit" onClick={() => adicionarTrabalhador( ev)} >
                                        edit
                                    </span> : null}
                                </div>
                            </div>



                        </>
                    ))}

                </div>


            </form>
            <div className="SalvarSetor">
                <span className="ButtonSalvar"  >Salvar</span>
            </div>

        </div>
    )
}

export default Excluir