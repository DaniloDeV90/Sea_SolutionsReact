/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { instancia } from "../ConexaoApi";


export const DeleteSetor = async (nomeSetor: string) => {


    const data = {
    
        nomeSetor
    }


    const requisicao = await instancia.delete ("/setor", {data}).then(request => request.data).catch(e => e);

    return requisicao
}