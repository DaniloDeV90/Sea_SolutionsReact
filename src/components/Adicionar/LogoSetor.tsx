import React, { useContext } from 'react'
import SetorLogo from '../svgs/SetorLogo'
import { PaginasContext } from '../../context/ContextPag'

const LogoSetor = () => {
  const pag = useContext(PaginasContext)


  const handleSetor = () => {
    pag?.toggle ("formulario")

  }
  return (
    <div className="SetorLogo" onClick={handleSetor} >

    <SetorLogo />
    <span >Setores</span>

</div>

  )
}

export default LogoSetor