import { Tcargos } from "./Cargos"
import { TTrabalhadores } from "./Trabalhadores"



export type TSetores = {
    nomeSetor: string,
    cargos: [Tcargos] 
    trabalhadores: [TTrabalhadores] ,

}