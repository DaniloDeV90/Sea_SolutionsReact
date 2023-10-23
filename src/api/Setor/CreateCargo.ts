import { cargos } from "../../interfaces/Cargos";
import { instancia } from "../ConexaoApi";

export const CreateCargo = async (setor: string, cargos: cargos[]) => {


    async function Enviar(cargo: string) {
        const data = {
            nomeCargo: cargo,
            nomeSetor: setor,
        };
        await instancia.post("/cargo", data);
    }

    const promises = cargos.map((cargo) => Enviar(cargo.nome));

    try {
        await Promise.all(promises);
        console.log("tudo certo")
        return true
    } catch (error) {
        console.log("tudo errado")
        return false
    }



}