import {useState, useEffect} from 'react'

function ActualizarDatos() {
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('idUsuario')

    const [form, setForm] = useState({
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        correo: '',
    })

    useEffect(() => {
        if (!token || !id) {
            window.location.href = '/'; return
        }

        fetch(`http://localhost:5288/api/usuario/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => setForm({
            nombre: data.nombre,
            apellidoPaterno: data.apellidoPaterno,
            apellidoMaterno: data.apellidoMaterno,
            correo: data.correo
        }))
        .catch(() => alert('No se pudo cargar la información del usuario'))
    }, [])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`http://localhost:5288/api/usuario/${id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ idUsuario: parseInt(id), ...form })
            })

            if (response.ok) {
                alert('Información actualizada correctamente')
                window.location.href = '/detalles-usuario'
            } else {
                alert('Error al actualizar la información')
            }
        } catch (error) {
            alert('No se pudo conectar con el servidor')
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white w-full max-w-md rounded-xl shadow-lg p-8 flex flex-col gap-4"
            >
                <h2 className="text-lg font-semibold text-gray-800">Actualizar datos</h2>
                <div>
                    <label className="block font-medium text-gray-700">Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block font-medium text-gray-700">Apellido paterno</label>
                    <input
                        type="text"
                        name="apellidoPaterno"
                        value={form.apellidoPaterno}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block font-medium text-gray-700">Apellido materno</label>
                    <input
                        type="text"
                        name="apellidoMaterno"
                        value={form.apellidoMaterno}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block font-medium text-gray-700">Correo electrónico</label>
                    <input
                        type="email"
                        name="correo"
                        value={form.correo}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex gap-3 mt-2">
                    <button
                        type="button"
                        onClick={() => window.location.href = '/detalles-usuario'}
                        className="bg-gray-400 text-white px-4 py-2 rounded-full hover:opacity-75 transition-all"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-full hover:opacity-75 transition-all"
                    >
                        Guardar cambios
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ActualizarDatos