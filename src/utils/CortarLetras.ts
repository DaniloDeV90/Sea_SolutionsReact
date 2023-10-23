export const CortarLetras = (valor: string[]):string => {
    let newValue = "";
    for (let i = 0 ; i < 11 ; i++) {
        newValue += valor[i];
    }

    return newValue
}