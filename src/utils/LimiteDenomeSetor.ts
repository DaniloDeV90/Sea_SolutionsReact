export const LimiteDeCaracteresInputSetor  =(erro: HTMLSpanElement, ev:Event, lengthmaximo: number) => {
const target = ev.target as HTMLInputElement

    erro.style.color = "red"
    if (target.value.length > lengthmaximo) {
        erro.innerHTML = "nome muito grande"
    }
    else {
        erro.innerHTML = ""
    }


 
}