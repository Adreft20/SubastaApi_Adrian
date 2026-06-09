import { useState } from 'react'
import Navbar from '../components/Navbar'

function CrearSubasta() {

    const idUsuario = localStorage.getItem('idUsuario')
    const token = localStorage.getItem('token')

    const opcionesCategoria = [
        { valor: 1, texto: 'Vehículo' },
        { valor: 2, texto: 'Inmueble' },
        { valor: 3, texto: 'Electrónicos' },
        { valor: 4, texto: 'Arte y coleccionables' },
        { valor: 5, texto: 'Antigüedades' },
        { valor: 6, texto: 'Ropas y accesorios' },
        { valor: 7, texto: 'Artículos deportivos' },
        { valor: 8, texto: 'Libros' },
        { valor: 9, texto: 'Juguetes' },
        { valor: 10, texto: 'Contenidos digitales' },
        { valor: 11, texto: 'Entrada a eventos' }
    ]

    const opcionesCondicion = [
        { valor: 1, texto: 'Nuevo' },
        { valor: 2, texto: 'Usado' },
        { valor: 3, texto: 'Reacondicionado' }
    ]

    const opcionesTipoSubasta = [
        { valor: 1, texto: 'Inglesa' },
        { valor: 2, texto: 'Holandesa' },
        { valor: 3, texto: 'Sellada' }
    ]

    const [form, setForm] = useState({
        Nombre: '',
        Descripcion: '',
        Ubicacion: '',
        CveCategoria: 3,
        CveCondicion: 1,

        Marca: '',
        Modelo: '',
        Anio: '',
        Kilometraje: '',
        NumeroSerie: '',
        UrlDocumentacionVehiculo: '',

        SuperficieTerreno: '',
        SuperficieConstruida: '',
        NumeroHabitaciones: '',
        UrlDocumentacionInmueble: '',

        PrecioInicial: '',
        PrecioMinimo: '',
        Incremento: '',

        FechaInicio: '',
        FechaFinal: '',

        CveTipoSubasta: 1
    })

    const [fotos, setFotos] = useState([])
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value, type } = e.target
        
        if (name === 'CveCategoria' || name === 'CveCondicion' || name === 'CveTipoSubasta') {
            setForm({
                ...form,
                [name]: parseInt(value)
            })
        } else {
            setForm({
                ...form,
                [name]: value
            })
        }
    }

    const handleFotos = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setFotos(Array.from(e.target.files))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!idUsuario || !token) {
            alert('No se ha iniciado sesión correctamente')
            return
        }

        setLoading(true)

        try {
            const formData = new FormData()

            // Datos básicos requeridos
            formData.append('Nombre', form.Nombre)
            formData.append('Descripcion', form.Descripcion)
            formData.append('Ubicacion', form.Ubicacion)
            formData.append('CveCategoria', form.CveCategoria)
            formData.append('CveCondicion', form.CveCondicion)
            formData.append('CveUsuario', parseInt(idUsuario))

            // Datos de subasta requeridos
            formData.append('PrecioInicial', form.PrecioInicial)
            formData.append('FechaInicio', form.FechaInicio)
            formData.append('FechaFinal', form.FechaFinal)
            formData.append('CveTipoSubasta', form.CveTipoSubasta)

            // Campos según tipo subasta
            if (parseInt(form.CveTipoSubasta) === 1 && form.Incremento) {
                formData.append('Incremento', form.Incremento)
            }
            if (parseInt(form.CveTipoSubasta) === 2 && form.PrecioMinimo) {
                formData.append('PrecioMinimo', form.PrecioMinimo)
            }

            // Campos de vehículo
            if (parseInt(form.CveCategoria) === 1) {
                if (form.Marca) formData.append('Marca', form.Marca)
                if (form.Modelo) formData.append('Modelo', form.Modelo)
                if (form.Anio) formData.append('Anio', form.Anio)
                if (form.Kilometraje) formData.append('Kilometraje', form.Kilometraje)
                if (form.NumeroSerie) formData.append('NumeroSerie', form.NumeroSerie)
                if (form.UrlDocumentacionVehiculo) formData.append('UrlDocumentacionVehiculo', form.UrlDocumentacionVehiculo)
            }

            // Campos de inmueble
            if (parseInt(form.CveCategoria) === 2) {
                if (form.SuperficieTerreno) formData.append('SuperficieTerreno', form.SuperficieTerreno)
                if (form.SuperficieConstruida) formData.append('SuperficieConstruida', form.SuperficieConstruida)
                if (form.NumeroHabitaciones) formData.append('NumeroHabitaciones', form.NumeroHabitaciones)
                if (form.UrlDocumentacionInmueble) formData.append('UrlDocumentacionInmueble', form.UrlDocumentacionInmueble)
            }

            // Fotos - Solo si hay fotos seleccionadas
            if (fotos.length > 0) {
                fotos.forEach((foto) => {
                    formData.append('Fotos', foto, foto.name)
                })
            }

            console.log('Enviando formulario...')
            
            const response = await fetch(
                'http://localhost:5288/api/Subasta/crear',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
                }
            )

            if (response.ok) {
                const data = await response.json()
                alert(`Subasta creada correctamente. ID: ${data.idSubasta}`)
                window.location.href = '/home'
            } else {
                const error = await response.text()
                console.error('Error:', error)
                alert(`Error: ${error}`)
            }

        } catch (error) {
            console.error('Error:', error)
            alert('No se pudo conectar con el servidor')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 pt-28 pb-10 px-4">
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
                    <h1 className="text-3xl font-bold mb-8 text-gray-800">
                        Crear Subasta
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="font-medium">Nombre *</label>
                            <input
                                type="text"
                                name="Nombre"
                                value={form.Nombre}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg p-3"
                                placeholder="Nombre del artículo"
                            />
                        </div>

                        <div>
                            <label className="font-medium">Descripción *</label>
                            <textarea
                                name="Descripcion"
                                value={form.Descripcion}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full border rounded-lg p-3"
                                placeholder="Describe el artículo"
                            />
                        </div>

                        <div>
                            <label className="font-medium">Ubicación *</label>
                            <input
                                type="text"
                                name="Ubicacion"
                                value={form.Ubicacion}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg p-3"
                                placeholder="Ciudad, Estado"
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="font-medium">Categoría</label>
                                <select
                                    name="CveCategoria"
                                    value={form.CveCategoria}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-3"
                                >
                                    {opcionesCategoria.map(opcion => (
                                        <option key={opcion.valor} value={opcion.valor}>
                                            {opcion.texto}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="font-medium">Condición</label>
                                <select
                                    name="CveCondicion"
                                    value={form.CveCondicion}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-3"
                                >
                                    {opcionesCondicion.map(opcion => (
                                        <option key={opcion.valor} value={opcion.valor}>
                                            {opcion.texto}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="font-medium">Fotografías (opcional)</label>
                            <input
                                type="file"
                                multiple
                                accept=".jpg,.jpeg,.png,.webp"
                                onChange={handleFotos}
                                className="w-full"
                            />
                            {fotos.length > 0 && (
                                <p className="text-sm text-gray-600 mt-1">
                                    {fotos.length} archivo(s) seleccionado(s)
                                </p>
                            )}
                        </div>

                        {parseInt(form.CveCategoria) === 1 && (
                            <div className="border-t pt-6 mt-6">
                                <h3 className="text-lg font-semibold mb-4">Datos del Vehículo</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="font-medium">Marca</label>
                                        <input type="text" name="Marca" value={form.Marca} onChange={handleChange} className="w-full border rounded-lg p-3" />
                                    </div>
                                    <div>
                                        <label className="font-medium">Modelo</label>
                                        <input type="text" name="Modelo" value={form.Modelo} onChange={handleChange} className="w-full border rounded-lg p-3" />
                                    </div>
                                    <div>
                                        <label className="font-medium">Año</label>
                                        <input type="number" name="Anio" value={form.Anio} onChange={handleChange} className="w-full border rounded-lg p-3" />
                                    </div>
                                    <div>
                                        <label className="font-medium">Kilometraje</label>
                                        <input type="number" name="Kilometraje" value={form.Kilometraje} onChange={handleChange} className="w-full border rounded-lg p-3" />
                                    </div>
                                    <div>
                                        <label className="font-medium">Número de Serie</label>
                                        <input type="number" name="NumeroSerie" value={form.NumeroSerie} onChange={handleChange} className="w-full border rounded-lg p-3" />
                                    </div>
                                    <div>
                                        <label className="font-medium">Documentación (URL)</label>
                                        <input type="text" name="UrlDocumentacionVehiculo" value={form.UrlDocumentacionVehiculo} onChange={handleChange} className="w-full border rounded-lg p-3" placeholder="https://..." />
                                    </div>
                                </div>
                            </div>
                        )}

                        {parseInt(form.CveCategoria) === 2 && (
                            <div className="border-t pt-6 mt-6">
                                <h3 className="text-lg font-semibold mb-4">Datos del Inmueble</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="font-medium">Superficie Terreno (m²)</label>
                                        <input type="number" step="0.01" name="SuperficieTerreno" value={form.SuperficieTerreno} onChange={handleChange} className="w-full border rounded-lg p-3" />
                                    </div>
                                    <div>
                                        <label className="font-medium">Superficie Construida (m²)</label>
                                        <input type="number" step="0.01" name="SuperficieConstruida" value={form.SuperficieConstruida} onChange={handleChange} className="w-full border rounded-lg p-3" />
                                    </div>
                                    <div>
                                        <label className="font-medium">Número de Habitaciones</label>
                                        <input type="number" name="NumeroHabitaciones" value={form.NumeroHabitaciones} onChange={handleChange} className="w-full border rounded-lg p-3" />
                                    </div>
                                    <div>
                                        <label className="font-medium">Documentación (URL)</label>
                                        <input type="text" name="UrlDocumentacionInmueble" value={form.UrlDocumentacionInmueble} onChange={handleChange} className="w-full border rounded-lg p-3" placeholder="https://..." />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="border-t pt-6 mt-6">
                            <h3 className="text-lg font-semibold mb-4">Datos de la Subasta</h3>
                            
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="font-medium">Tipo de Subasta</label>
                                    <select name="CveTipoSubasta" value={form.CveTipoSubasta} onChange={handleChange} className="w-full border rounded-lg p-3">
                                        {opcionesTipoSubasta.map(opcion => (
                                            <option key={opcion.valor} value={opcion.valor}>{opcion.texto}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="font-medium">Precio Inicial *</label>
                                    <input type="number" step="0.01" name="PrecioInicial" value={form.PrecioInicial} onChange={handleChange} required className="w-full border rounded-lg p-3" placeholder="0.00" />
                                </div>
                            </div>

                            {parseInt(form.CveTipoSubasta) === 1 && (
                                <div className="mb-4">
                                    <label className="font-medium">Incremento mínimo</label>
                                    <input type="number" step="0.01" name="Incremento" value={form.Incremento} onChange={handleChange} className="w-full border rounded-lg p-3" placeholder="0.00" />
                                </div>
                            )}

                            {parseInt(form.CveTipoSubasta) === 2 && (
                                <div className="mb-4">
                                    <label className="font-medium">Precio Mínimo</label>
                                    <input type="number" step="0.01" name="PrecioMinimo" value={form.PrecioMinimo} onChange={handleChange} className="w-full border rounded-lg p-3" placeholder="0.00" />
                                </div>
                            )}

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="font-medium">Fecha de Inicio *</label>
                                    <input type="datetime-local" name="FechaInicio" value={form.FechaInicio} onChange={handleChange} required className="w-full border rounded-lg p-3" />
                                </div>
                                <div>
                                    <label className="font-medium">Fecha de Finalización *</label>
                                    <input type="datetime-local" name="FechaFinal" value={form.FechaFinal} onChange={handleChange} required className="w-full border rounded-lg p-3" />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-green-600 text-white px-6 py-3 rounded-full hover:opacity-80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creando subasta...' : 'Crear Subasta'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CrearSubasta