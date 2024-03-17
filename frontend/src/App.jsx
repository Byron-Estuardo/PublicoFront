import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/General/Login.jsx';
import Error from './components/Error/Error.jsx';
import CrearTicket from './components/Clientes/CrearTicket.jsx';
import AgentesVerTickets from './components/Agentes/VerTickets.jsx';
import VerTickets from './components/Clientes/VerTickets.jsx';
import Registro from './components/Administradores/Registro.jsx';
import './App.css';
import 'semantic-ui-css/semantic.min.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Rutas Administrador */}
        <Route path={"Admin/RegistroAdmin"} element={<Registro />} /> 

        {/* Rutas Clientes */}
        <Route path={"/Clientes/CrearTicket"} element={<CrearTicket />} />
        <Route path={"/Clientes/VerTicket"} element={<VerTickets />} />

        {/* Rutas Agentes */}
        <Route path={"/Agentes/VerTickets"} element={<AgentesVerTickets />} />

        {/* Pagina de Error */}
        <Route path="/error" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;