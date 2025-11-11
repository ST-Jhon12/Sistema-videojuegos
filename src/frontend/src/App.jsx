import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/home.jsx';
import Login from '../pages/login.jsx';
import LoginSuccess from '../pages/LoginSuccess.jsx';
import LoginError from '../pages/LoginError.jsx';
import Register from '../pages/Register.jsx';
import Inicio from '../pages/Inicio.jsx';
import Biblioteca from '../pages/Biblioteca.jsx';
import ProtectedRoute from '../pages/ProtectedRoute.jsx';
import Libros from '../pages/Libros.jsx';
import Tendencias from '../pages/Tendencias.jsx';
import Perfil from '../pages/Perfil.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* 🏠 Rutas públicas */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login-success' element={<LoginSuccess />} />
        <Route path='/login-error' element={<LoginError />} />

        {/* 🔐 Rutas protegidas */}
        <Route
          path='/inicio'
          element={
            <ProtectedRoute>
              <Inicio />
            </ProtectedRoute>
          }
        />
        <Route
          path='/biblioteca'
          element={
            <ProtectedRoute>
              <Biblioteca />
            </ProtectedRoute>
          }
        />
        <Route
          path='/libros'
          element={
            <ProtectedRoute>
              <Libros />
            </ProtectedRoute>
          }
        />
        <Route
          path='/tendencias'
          element={
            <ProtectedRoute>
              <Tendencias />
            </ProtectedRoute>
          }
        />
        <Route
          path='/perfil'
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
