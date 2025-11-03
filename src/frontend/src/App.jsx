import {BrowserRouter as Router, Route, Routes, BrowserRouter} from 'react-router-dom';
import Home from '../pages/home.jsx';
import Login from '../pages/login.jsx';
import LoginSuccess from '../pages/LoginSuccess.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/login-success' element={<LoginSuccess/>}/>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
} 

export default App
