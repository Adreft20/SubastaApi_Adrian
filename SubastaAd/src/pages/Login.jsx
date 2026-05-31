import { useState } from 'react'

function Login() {
  const [correo, setCorreo] = useState('')
  const [contrasenia, setContrasenia] = useState('')
  const [visible, setVisible] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (correo === '' || contrasenia === '') {
      alert('Por favor llena todos los campos')
      return
    }

    try {
      const response = await fetch('http://localhost:5288/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, contrasenia })
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('token', data.token)
        window.location.href = '/home'
      } else {
        alert('Correo o contraseña incorrectos')
      }
    } catch (error) {
      alert('No se pudo conectar con el servidor')
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <img src="/logo.png" alt="Logo" />

        <label>Correo</label>
        <input
          type="email"
          placeholder="correo@ejemplo.com"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <label>Contraseña</label>
        <input
          type={visible ? 'text' : 'password'}
          placeholder="Contraseña"
          value={contrasenia}
          onChange={(e) => setContrasenia(e.target.value)}
          required
        />

        <div className="box-visible">
          <input
            type="checkbox"
            id="visible"
            checked={visible}
            onChange={() => setVisible(!visible)}
          />
          <label htmlFor="visible">Mostrar contraseña</label>
        </div>

        <button type="submit">Iniciar sesión</button>

        <p className="link-abajo">
          ¿No tienes cuenta? <a href="/signup">Regístrate</a>
        </p>
      </form>
    </div>
  )
}

export default Login