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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-80 flex flex-col items-center gap-2 py-8 px-6 rounded-xl shadow-lg"
      >
        <img src="/logo.png" alt="Logo" className="w-24 h-24 mb-2" />

        <label className="w-full font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          name="nombre"
          placeholder="Juan"
          value={form.nombre}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500"
        />

        <label className="w-full font-medium text-gray-700">Apellido paterno</label>
        <input
          type="text"
          name="apellidoPaterno"
          placeholder="García"
          value={form.apellidoPaterno}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500"
        />

        <label className="w-full font-medium text-gray-700">Apellido materno</label>
        <input
          type="text"
          name="apellidoMaterno"
          placeholder="López"
          value={form.apellidoMaterno}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500"
        />

        <label className="w-full font-medium text-gray-700">Correo</label>
        <input
          type="email"
          name="correo"
          placeholder="correo@ejemplo.com"
          value={form.correo}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500"
        />

        <label className="w-full font-medium text-gray-700">Contraseña</label>
        <input
          type={visible ? 'text' : 'password'}
          name="contrasenia"
          placeholder="Contraseña"
          value={form.contrasenia}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500"
        />

        <div className="w-full flex items-center gap-2 mt-1">
          <input
            type="checkbox"
            id="visible"
            checked={visible}
            onChange={() => setVisible(!visible)}
          />
          <label htmlFor="visible" className="text-sm text-gray-600">
            Mostrar contraseña
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-2 rounded-full mt-3 hover:opacity-75 transition-all"
        >
          Crear cuenta
        </button>

        <p className="text-sm text-gray-500 mt-2">
          ¿Ya tienes cuenta?{' '}
          <a href="/" className="text-blue-600 font-medium hover:underline">
            Inicia sesión
          </a>
        </p>
      </form>
    </div>
  )
}

export default Signup