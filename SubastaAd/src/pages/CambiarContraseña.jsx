import {useState} from 'react'

function CambiarContrasenia() {
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('idUsuario')

    const [form, setForm] = useState({
        contraseniaActual: '',
        contraseniaNueva: '',
        confirmarContrasenia: ''
    })
    const [visible, setVisible] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (form.contraseniaNueva !== form.confirmarContrasenia) {
            alert('Las constraseñas no coinciden')
            return
        }

        if (form.contraseniaNueva.length < 8) {
            alert('La nueva contraseña debe tener al menos 8 caracteres')
            return
        }

        try {
            const response = await fetch(`http://localhost:5288/api/usuario/${id}/contrasenia`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    contraseniaActual: form.contraseniaActual,
                    contraseniaNueva: form.contraseniaNueva 
                })
            })

            if (response.ok) {
                alert('Contraseña cambiada correctamente')
                window.location.href = '/detalles-usuario'
            } else {
                alert('La nueva contraseña no puede ser igual a la actual o la contraseña actual es incorrecta')
            }
        } catch (error) {
            alert('No se pudo conectar con el servidor')
        }
    }
    
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white w-full max-w-md rounded-xl shadow-lg p-8 flex flex-col gap-4"
            >
                <h2 className="text-2xl font-semibold text-gray-800">Cambiar contraseña</h2>
                
                <div>
                    <label className="w-full font-medium text-gray-700">Contraseña actual</label>
                    <input
                        type={visible ? 'text' : 'password'}
                        name="contraseniaActual"
                        placeholder="Contraseña actual"
                        value={form.contraseniaActual}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="w-full font-medium text-gray-700">Nueva contraseña</label>
                    <input
                        type={visible ? 'text' : 'password'}
                        name="contraseniaNueva"
                        placeholder="Nueva contraseña"
                        value={form.contraseniaNueva}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <p className="text-sm text-gray-500 mt-1">La contraseña debe tener al menos 8 caracteres</p>
                </div>

                <div>
                    <label className="w-full font-medium text-gray-700">Confirmar nueva contraseña</label>
                    <input
                        type={visible ? 'text' : 'password'}
                        name="confirmarContrasenia"
                        placeholder="Confirmar nueva contraseña"
                        value={form.confirmarContrasenia}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <p className="text-sm text-gray-500 mt-1">La contraseña debe tener al menos 8 caracteres</p>
                </div>

                <div className="w-full flex items-center gap-2 mt-1">
                    <input
                        type="checkbox"
                        id="visible"
                        checked={visible}
                        onChange={() => setVisible(!visible)}
                    />
                    <label htmlFor="visible">Mostrar contraseñas</label>
                </div>

                <div className="flex gap-3 mt-2">
                    <button
                        type="button"
                        onClick={() => window.location.href = '/detalles-usuario'}
                        className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:opacity-75 transition-all"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Cambiar contraseña
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CambiarContrasenia