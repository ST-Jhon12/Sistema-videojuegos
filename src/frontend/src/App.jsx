import {BrowserRouter as Router, Route, Routes, BrowserRouter} from 'react-router-dom';
import Home from '../pages/home.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
} 

export default App
