/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { instancia } from "../ConexaoApi";


export const DeleteCargo = async (nomeCargo:string,setorNome: string) => {


    const data = {
        nomeCargo,
        setorNome
    }


    const requisicao = await instancia.delete ("/cargo", {data}).then(request => request.data).catch(e => e);

    return requisicao
}