/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TSetores } from "../../interfaces/allSetores";
import { instancia } from "../ConexaoApi"




export const UpdateNameSetor = async (nome:string, novoNome: string) => {

    const data = {
        nome,
        novoNome
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const request: TSetores = await instancia.put ("/setor", data) .then (response => response.data).catch (e => e);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return request;


}