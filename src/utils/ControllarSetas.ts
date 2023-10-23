export const ControllarSetas = (id: number,setas: boolean[]) => {
    const novoArr = [...setas];
    const valor = novoArr[id] ? false : true
    novoArr[id] = valor;

    return novoArr;
}