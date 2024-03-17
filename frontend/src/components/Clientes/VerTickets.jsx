import React, { useEffect, useState } from 'react';
import NavBar from '../BarraNavegacion/Bar_Cliente.jsx'
import TablaTickets1 from '../General/TablaTickets1.jsx';
import { Icon } from 'semantic-ui-react';
import axios from 'axios';
import '../estilos.css';
import ruta from '../../Rutas.jsx';

function VerTickets() {
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
            if (localStorage.getItem("role") === "administrador" || localStorage.getItem("role") === "agente") {
                window.location.href = "/Error";
                return;
            }

            const response = await axios.post("http://" + ruta.ip + ":" + ruta.port + "/api/clientes/mostrartickets", {id: localStorage.getItem("id")});
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
                    <TablaTickets1
                        almacenados={almacenados}
                    />
                </div>
            </div>
        </div>
    );
}


export default VerTickets;

