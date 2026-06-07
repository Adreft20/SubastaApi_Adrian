import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import SignupVendedor from './pages/SignupVendedor'
import DetallesUsuario from './pages/DetallesUsuario'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import ActualizarDatos from './pages/ActualizarDatos'
import CambiarContraseña from './pages/CambiarContraseña'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="pt-14">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup-vendedor" element={<SignupVendedor />} />
          <Route path="/detalles-usuario" element={<DetallesUsuario />} />
          <Route path="/home" element={<Home />} />
          <Route path="/actualizar-datos" element={<ActualizarDatos />} />
          <Route path="/cambiar-contrasenia" element={<CambiarContraseña />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App