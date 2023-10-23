export const ListarSetores  = (e: HTMLDivElement) => {
    const styled = e.style.display

    
    const value = styled === "" || styled === "none" ? "inline" : "none"

    return value
}