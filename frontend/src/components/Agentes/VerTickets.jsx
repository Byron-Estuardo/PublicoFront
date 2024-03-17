import React, { useEffect, useState } from 'react';
import NavBar from '../BarraNavegacion/Bar_Agente.jsx'
import Tabla from '../General/TablaTickets.jsx';
import { Icon } from 'semantic-ui-react';
import axios from 'axios';
import '../estilos.css';
import ruta from '../../Rutas.jsx';

function AgentesVerTickets() {
    const [almacenados, setAlmacenados] = useState([
        {
            id: 0,
            user: "------",
            correo: "------",
            nacimiento: "------"
        }
    ]);

    useEffect(() => {
        Obtener();
    }, []);


    async function Obtener() {
        try {
            if (localStorage.getItem("role") === "administrador" || localStorage.getItem("role") === "cliente") {
                window.location.href = "/Error";
                return;
            }

            const response = await axios.get("http://" + ruta.ip + ":" + ruta.port + "/api/agentes/mostrartickets");
            console.log(response.data)
            if (response.data !== null) { 
                setAlmacenados(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="GeneralAdmin">
            <NavBar />
            <div className="Fondo">
                <h1 id="titulo" style={{ color: "white", fontSize: "2.5rem", textAlign: "center", marginBottom: "2rem" }}>
                    <span>
                        TICKETS
                        <Icon circular name='ticket alternate' />
                    </span>
                </h1>
            </div>
            <div className="Tabla">
                <div className="interno">
                    <Tabla
                        almacenados={almacenados}
                    />
                </div>
            </div>
        </div>
    );
}

export default AgentesVerTickets;
