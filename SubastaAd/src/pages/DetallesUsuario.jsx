import { useState, useEffect } from "react";

function DetallesUsuario() {
    const [usuario, setUsuario] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('idUsuario');
        
        if (!token || !id) {
            window.location.href = '/';
            return;
        }

        fetch(`http://localhost:5288/api/usuario/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(data => setUsuario(data))
        .catch(err => setError('No se pudo cargar la información del usuario'));
    }, []);

    if (error) {
        return <p className = "text-center mt-10 text-red-500">{error}</p>;
    }
    if (!usuario) {
        return <p className = "text-center mt-10 text-gray-500">Cargando...</p>;
    }

    return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-start py-10 px-10">

        {/* Foto y datos principales */}
        <div className="bg-white w-150 rounded-xl shadow-lg p-6 flex items-center gap-4">
            <div className="w-30 h-30 bg-gray-300 rounded-full flex items-center justify-center text-3xl">
                <img src="/logo.png" alt="logo" className="w-15 h-15" />
            </div>
            <div className="flex-1">
                <h2 className="text-4xl font-semibold text-gray-800">
                    {usuario.nombre} {usuario.apellidoPaterno} {usuario.apellidoMaterno}
                </h2>
                <p className="text-lg text-gray-500">{usuario.correo}</p>
            </div>
            <div className="text-right">
                <p className="text-lg text-gray-500">Calificación</p>
                <p className="text-lg font-bold text-blue-600">
                    {usuario.calificacion ?? 'N/A'}
                </p>
            </div>
        </div>

        {/* Subastas (solo si es vendedor) */}
        {usuario.cveTipoUsuario === 2 && (
            <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 mt-4">
                <h3 className="text-md font-semibold text-gray-700 mb-4">Mis subastas</h3>
                {usuario.subastas && usuario.subastas.length > 0 ? (
                    <div className="flex gap-4 flex-wrap">
                        {usuario.subastas.map((subasta, index) => (
                            <div key={index} className="bg-gray-100 rounded-lg p-4 w-36 flex flex-col items-center gap-2">
                                <div className="w-20 h-20 bg-gray-300 rounded"></div>
                                <button className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full hover:opacity-75">
                                    Ver detalles
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-400">No tienes subastas activas</p>
                )}
            </div>
        )}

        {/* Botones */}
        <div className="flex gap-3 mt-6">
            <button
                onClick={() => window.location.href = '/home'}
                className="bg-gray-400 text-white px-4 py-2 rounded-full hover:opacity-75 transition-all"
            >
                Volver al inicio
            </button>
            <button
                onClick={() => window.location.href = '/actualizar-datos'}
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:opacity-75 transition-all"
            >
                Actualizar datos
            </button>
            <button
                onClick={() => window.location.href = '/cambiar-contrasenia'}
                className="bg-green-600 text-white px-4 py-2 rounded-full hover:opacity-75 transition-all"
            >
                Cambiar contraseña
            </button>
        </div>
    </div>
    )
    
}
export default DetallesUsuario;