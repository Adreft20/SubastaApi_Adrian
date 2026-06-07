function Home() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800">¡Bienvenido!</h1>
            <button
                onClick={() => window.location.href = '/detalles-usuario'}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:opacity-75 transition-all"
            >
                Ver perfil
            </button>
        </div>
    );
}

export default Home;