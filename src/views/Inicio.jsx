import { useState } from 'react'

function Inicio() {
  const [busqueda, setbusqueda] = useState('');

  return (
    <>
    <input type="text" value={busqueda}	onChange={(e) => setbusqueda(e.target.value)}/>
    </>
  )
}

export default Inicio
