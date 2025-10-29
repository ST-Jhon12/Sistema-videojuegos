import {BrowserRouter as Router, Route, Routes, BrowserRouter} from 'react-router-dom';
import{home} from './pages/home.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<home/>}/>
      </Routes>
    </BrowserRouter>
  );
} 

export default App
