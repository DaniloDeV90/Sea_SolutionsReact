/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { TSetores } from "../../interfaces/allSetores";
import { instancia } from "../ConexaoApi";


export const CreateTrabalhador = async (nome:string, cargo:string,nomeSetor: string,cpf:string) => {


    const data = {
    
        nome,
        cargo,
        nomeSetor,
        cpf

    }


    const requisicao: TSetores = await instancia.post ("/trabalhador", data).then(request => request.data).catch(e => e);

    return requisicao
}