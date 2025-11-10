import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from '../pages/home.jsx';
import Login from '../pages/login.jsx';
import LoginSuccess from '../pages/LoginSuccess.jsx';
import LoginError from '../pages/LoginError.jsx';
import Register from '../pages/Register.jsx';
import Inicio from '../pages/Inicio.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/login-success' element={<LoginSuccess />} />
        <Route path='/login-error' element={<LoginError />} />
        <Route path='/register' element={<Register />} />
        <Route path='/inicio' element={<Inicio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
