import { React, useState } from 'react'
import { Input, Header, Icon, Segment, Button, Label, Select } from 'semantic-ui-react'
import NavBar from '../BarraNavegacion/Bar_Admin'
import { SHA256 } from 'crypto-js';
import axios from 'axios'
import '../estilos.css'
import ruta from '../../Rutas';


const options = [
    { key: 'cliente', value: 'cliente', text: 'Cliente' },
    { key: 'administrador', value: 'administrador', text: 'Administrador' },
    { key: 'agente', value: 'agente', text: 'Agente' }
];
function Registro() {
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [correo, setCorreo] = useState("")
    const [contra, setContra] = useState("")
    const [tipo, setTipo] = useState("");
    const [contra2, setContra2] = useState("")
    const [telefono, setTelefono] = useState("")

    const registro = () => {
        document.getElementById("Nombre").style.visibility = "hidden";
        document.getElementById("Apellido").style.visibility = "hidden";
        document.getElementById("Correo").style.visibility = "hidden";
        document.getElementById("Contra").style.visibility = "hidden";
        document.getElementById("Contra2").style.visibility = "hidden";
        document.getElementById("Telefono").style.visibility = "hidden";

        if (nombre === "") {
            document.getElementById("Nombre").innerHTML = "Ingrese un nombre";
            document.getElementById("Nombre").style.visibility = "visible";
            return;
        } else if (apellido === "") {
            document.getElementById("Apellido").innerHTML = "Ingrese un apellido";
            document.getElementById("Apellido").style.visibility = "visible";
            return;
        } else if (correo === "") {
            document.getElementById("Correo").innerHTML = "Ingrese un correo";
            document.getElementById("Correo").style.visibility = "visible";
            return;
        } else if (telefono === "") {
            document.getElementById("Telefono").innerHTML = "Ingrese un número de telefono válido";
            document.getElementById("Telefono").style.visibility = "visible";
            return;
        } else if (contra === "") {
            document.getElementById("Contra").innerHTML = "Ingrese una contraseña";
            document.getElementById("Contra").style.visibility = "visible";
            return;
        } else if (contra2 === "") {
            document.getElementById("Contra2").innerHTML = "Ingrese una contraseña";
            document.getElementById("Contra2").style.visibility = "visible";
            return;
        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            document.getElementById("Correo").innerHTML = "Ingrese un correo válido";
            document.getElementById("Correo").style.visibility = "visible";
            return;
        } else {
            document.getElementById("Correo").style.visibility = "hidden";
        }

        if (contra !== contra2) {
            document.getElementById("Contra").innerHTML = "LAS CONTRASEÑAS NO COINCIDEN"
            document.getElementById("Contra").style.visibility = "visible"
            document.getElementById("Contra2").innerHTML = "LAS CONTRASEÑAS NO COINCIDEN"
            document.getElementById("Contra2").style.visibility = "visible"
            return
        } else {
            document.getElementById("Contra").style.visibility = "hidden"
            document.getElementById("Contra2").style.visibility = "hidden"
        }
        console.log(localStorage.getItem("id"))
        const campos = {
            nombres: nombre,
            apellidos: apellido,
            correo: correo,
            telefono: telefono,
            tipo: tipo,
            pass: contra
        }

        axios.post("http://" + ruta.ip + ":" + ruta.port + "/api/administrador/registro", JSON.stringify(campos), { headers: { 'Content-Type': 'application/json; charset=UTF-8' } })
            .then(response => {
                console.log(response.data)
                if (response.data.error === false) {
                    document.getElementById("aceptado").innerHTML = "USUARIO CREADO CON ÉXITO";
                    document.getElementById("aceptado").style.visibility = "visible";
                    window.location.href = "/Admin/RegistroAdmin";
                } else {
                    document.getElementById("no").innerHTML = response.data.salida.toUpperCase();
                    document.getElementById("no").style.visibility = "visible";
                }
                
                setTimeout(function () {
                    document.getElementById("no").style.visibility = "hidden";
                }, 2000);

            }).catch(error => {
                console.log(error)
            }); 
    }

    return (
        <>
            <div className="General">
                <NavBar />
                <div className="FondoRegistro">

                    <Segment placeholder id="IniciarLogin">
                        <Header icon>
                            <Icon name='add user' style={{ color: "white" }} />
                            <h1 style={{ color: "white" }}>CREAR USUARIO</h1>
                            <Input type="text" name="Nombre" label='Nombre' placeholder='Byron Estuardo' onChange={e => setNombre(e.target.value)} className="Datos" autoComplete="off" />
                            <br />
                            <Label pointing prompt color="red" id="Nombre" className="Alerta"></Label>
                            <br />
                            <Input type="text" name="Apellido" label='Apellido' placeholder='Caal Catun' onChange={e => setApellido(e.target.value)} className="Datos" autoComplete="off" />
                            <br />
                            <Label pointing prompt color="red" id="Apellido" className="Alerta"></Label>
                            <br />
                            <Input type="text" name="correo" label='Correo' placeholder='byron.ccaal@gmail.com' onChange={e => setCorreo(e.target.value)} className="Datos" autoComplete="off" />
                            <br />
                            <Label pointing prompt color="red" id="Correo" className="Alerta"></Label>
                            <br />
                            <Input type="number" name="Telefono" label='Telefono' placeholder='+502 41600372' onChange={e => setTelefono(e.target.value)} className="Datos" autoComplete="off" />
                            <br />
                            <Label pointing prompt color="red" id="Telefono" className="Alerta"></Label>
                            <br />
                            <Label horizontal size='big'>Tipo de Usuario</Label>
                            <Select
                                options={options}
                                name="Tipo de Usuario"
                                label='Tipo de Usuario'
                                placeholder='Selecciona una Opcion'
                                onChange={(e, { value }) => setTipo(value)} // Usa destructuración para obtener el valor seleccionado
                            />
                            <br />
                            <br />
                            <Input type="password" name="Contra" label='Contraseña' placeholder='********' onChange={e => setContra(e.target.value)} className="Datos" autoComplete="off" />
                            <br />
                            <Label pointing prompt color="red" id="Contra" className="Alerta"></Label>
                            <br />
                            <Input type="password" name="Contra2" label='Confirmar Contraseña' placeholder='********' onChange={e => setContra2(e.target.value)} className="Datos" autoComplete="off" />
                            <br />
                            <Label pointing prompt color="red" id="Contra2" className="Alerta"></Label>
                            <br />
                            <Label pointing="below" prompt color="red" id="no" className="Alerta"></Label>
                            <br />
                            <Button color='green' className="Datos" onClick={registro}>Crear Usuario</Button>
                            <br />
                            <Label pointing prompt color="blue" id="aceptado" className="Alerta"></Label>

                        </Header>
                    </Segment>
                </div>
            </div>
        </>
    )
}

export default Registro
