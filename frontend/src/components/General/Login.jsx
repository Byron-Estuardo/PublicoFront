import { React, useState, useEffect } from 'react'
import { Input, Header, Icon, Segment, Button, Label, Select } from 'semantic-ui-react'
//import { SHA256 } from 'crypto-js';
import axios from 'axios'
//import jwt_decode from "jwt-decode";
import '../estilos.css'
import ruta from '../../Rutas.jsx'

function Login() {
    const [nombre, setNombre] = useState("")
    const [contra, setContra] = useState("")

    const inicio = () => {

    document.getElementById("ContraValido").style.visibility = "hidden"
    document.getElementById("UsuarioValido").style.visibility = "hidden"
    document.getElementById("Error").style.visibility = "hidden"

    if (nombre === "") {
        document.getElementById("UsuarioValido").innerHTML = "Ingrese un nombre de usuario"
        document.getElementById("UsuarioValido").style.visibility = "visible"
        return
    } else if (contra === "") {
        document.getElementById("ContraValido").innerHTML = "Ingrese una contraseña"
        document.getElementById("ContraValido").style.visibility = "visible"
        return
    }
    const campos = {
        correo: nombre,
        contra: contra
    }

    axios.post("http://" + ruta.ip + ":" + ruta.port + "/api/general/login", JSON.stringify(campos), { headers: { 'Content-Type': 'application/json; charset=UTF-8' } })
        .then(response => {
        if (response.data.id) {
            localStorage.setItem("id", response.data.id);
            localStorage.setItem("nombre", response.data.Nombres);
            localStorage.setItem("apellido", response.data.Apellidos);
            if (response.data.role === "cliente") {
                localStorage.setItem("role", response.data.role);
                window.location.href = "/Clientes/CrearTicket"
            } else if (response.data.role === "administrador") {
                localStorage.setItem("role", response.data.role);
                window.location.href = "/Admin/RegistroAdmin"
            }else if (response.data.role === "agente") {
                localStorage.setItem("role", response.data.role);
                window.location.href = "/Agentes/VerTickets"
            }
        } else {
            if (response.data.salida === "Contraseña incorrecta") {
                document.getElementById("ContraValido").innerHTML = "CONTRASEÑA INCORRECTA"
                document.getElementById("ContraValido").style.visibility = "visible"
            } else {
                document.getElementById("UsuarioValido").innerHTML = response.data.salida
                document.getElementById("UsuarioValido").style.visibility = "visible"
            }
            setTimeout(function () {
                document.getElementById("UsuarioValido").style.visibility = "hidden";
                document.getElementById("ContraValido").style.visibility = "hidden";
            }, 2000);
        }
    }).catch(error => {
        console.log(error)
    })
}

function Obtener() {
    useEffect(() => {
        if (localStorage.getItem("id") !== null || localStorage.getItem("id") !== undefined) {
            localStorage.removeItem("id");
            localStorage.removeItem("nombre");
            localStorage.removeItem("role");
            localStorage.removeItem("apellido");
            localStorage.removeItem("ticket");
        }
    }, []);
}


return (
    Obtener(),
    <>
        <div className="GeneralLogin">
            <div className="FondoLogin">
            <Segment placeholder id="IniciarLogin">
                <Header icon>
                <Icon name='user' style={{ color: "white" }} />
                <h1 style={{ color: "white" }}>INICIAR SESIÓN</h1>
                <br></br>
                <Input type="text" name="Correo" label='Correo' placeholder='' onChange={e => setNombre(e.target.value)} className="Datos1" autoComplete="off" />
                <br />
                <Label pointing prompt color="red" id="UsuarioValido" className="Alerta"></Label>
                <br />
                <Input type="password" label='Contraseña' placeholder='' onChange={e => setContra(e.target.value)} className="Datos1" autoComplete="off" />
                <br />
                <Label pointing prompt color="red" id="ContraValido" className="Alerta"></Label>
                <br />
                <Button color='green' className="Datos1" onClick={inicio}>INICIAR SESIÓN</Button>
                <Label pointing prompt color="red" id="Error" className="Alerta"></Label>
                </Header>
            </Segment>
            </div>
        </div>
    </>
    )
}

export default Login
