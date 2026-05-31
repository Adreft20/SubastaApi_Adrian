import { useState } from 'react'

function Signup() {
  const [form, setForm] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correo: '',
    contrasenia: ''
  })
  const [visible, setVisible] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:5288/api/auth/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, cveTipoUsuario: 1 })
      })

      if (response.ok) {
        alert('¡Cuenta creada exitosamente!')
        window.location.href = '/'
      } else {
        const mensaje = await response.text()
        alert('Error: ' + mensaje)
      }
    } catch (error) {
      alert('No se pudo conectar con el servidor')
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <img src="/logo.png" alt="Logo" />

        <label>Nombre(s)</label>
        <input
          type="text"
          name="nombre"
          placeholder="Juan"
          value={form.nombre}
          onChange={handleChange}
          required
        />

        <label>Apellido paterno</label>
        <input
          type="text"
          name="apellidoPaterno"
          placeholder="García"
          value={form.apellidoPaterno}
          onChange={handleChange}
          required
        />

        <label>Apellido materno</label>
        <input
          type="text"
          name="apellidoMaterno"
          placeholder="López"
          value={form.apellidoMaterno}
          onChange={handleChange}
          required
        />

        <label>Correo</label>
        <input
          type="email"
          name="correo"
          placeholder="correo@ejemplo.com"
          value={form.correo}
          onChange={handleChange}
          required
        />

        <label>Contraseña</label>
        <input
          type={visible ? 'text' : 'password'}
          name="contrasenia"
          placeholder="Contraseña"
          value={form.contrasenia}
          onChange={handleChange}
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

        <button type="submit">Crear cuenta</button>

        <p className="link-abajo">
          ¿Ya tienes cuenta? <a href="/">Inicia sesión</a>
        </p>
      </form>
    </div>
  )
}

export default Signup