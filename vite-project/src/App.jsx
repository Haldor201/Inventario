import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Login from './Routes/Login';
import Nav_P from './Components/Nav_P.jsx'
import Transceivers from './Routes/Transceivers.jsx';
import Devices from './Routes/Devices.jsx';
import Logs from './Routes/Logs.jsx';
import Account from './Routes/Account.jsx';
import { Route, Routes } from 'react-router-dom';
import SfpProvider from './context/GeneralContext.jsx';


function App() {
  return (
    <><SfpProvider>
      <Nav_P/>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/Transceivers' element={<Transceivers/>}></Route>
          <Route path='/Devices' element={<Devices/>}></Route>
          <Route path='/Logs' element={<Logs/>}></Route>
          <Route path='/Account' element={<Account/>}></Route>
        </Routes>
      </SfpProvider>
    </>
  )
}

export default App;