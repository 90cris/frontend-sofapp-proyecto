import { useState } from 'react'
import Alert from './Alert'

const Formulario = () => {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmar, setConfirmar] = useState("")
  const [color, setColor] = useState("")
  const [message, setMessage] = useState("")
  const validarInput = (e) => {
    e.preventDefault()
    if (nombre === '' || email === '' || password === '' || confirmar === '') {
      
    }

  }

  return (
    <>
      <form onSubmit={validarInput}>
        <div className="form-group">
          <input className="form-control" name="nombre" placeholder="Nombre" onChange={(e) => setNombre(e.target.value)} />
          <input className="form-control" name="email" placeholder="tuemail@ejemplo.com" onChange={(e) => setEmail(e.target.value)} />
          <input className="form-control" name="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
          <input className="form-control" name="confirmar" placeholder="Confirma tu contraseña" onChange={(e) => setConfirmar(e.target.value)} />
          <button className="btn btn-success mt-3" type="submit">
            Registrarse</button>
        </div>
      </form>
      <Alert />
    </>
  )
}

export default Formulario;