/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { instancia } from "../ConexaoApi"

export const RetorneTodosOsSetores = async () => {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const data = await instancia.get ("/setor").then (response => response.data).catch (e => e);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data;


}