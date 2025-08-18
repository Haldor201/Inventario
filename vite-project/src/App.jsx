import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Login from './Routes/Login';
import Nav_P from './Components/Nav_P.jsx'
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Nav_P/>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
      </Routes>
    </>
  )
}

export default App;