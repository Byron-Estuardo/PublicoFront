import { React, useState } from 'react'
import { Input, Header, Icon, Segment, Button, Label, Select, Form, TextArea } from 'semantic-ui-react'
import NavBar from '../BarraNavegacion/Bar_Cliente'
import FileInput from '../General/FileInput';
import { SHA256 } from 'crypto-js';
import axios from 'axios'
import '../estilos.css'
import ruta from '../../Rutas';

function CrearTicket() {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [tipo, setTipo] = useState("");
    const [prioridad, setPrioridad] = useState("");
    const [archivos, setArchivos] = useState([]);


    const handleFilesChange = (event) => {
        const files = event.target.files;
        if (!files) return;
    
        const fileArray = Array.from(files).map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    let base64 = reader.result;
                    // Remover el prefijo
                    base64 = base64.replace(/^data:(.+?);base64,/, '');
                    resolve({
                        name: file.name,
                        size: file.size,
                        type: file.type,
                        base64: base64,
                    });
                };
                reader.onerror = error => reject(error);
            });
        });
    
        Promise.all(fileArray)
            .then(arrayOfBase64Files => {
                setArchivos(arrayOfBase64Files);
                console.log(arrayOfBase64Files);
            })
            .catch(error => {
                console.error('Error al leer archivos:', error);
            });
    };
    
    

    const options = [
        { key: 'baja', value: 'Baja', text: 'Baja' },
        { key: 'media', value: 'Media', text: 'Media' },
        { key: 'alta', value: 'Alta', text: 'Alta' }
    ];

    const registro = async () => {
        console.log(archivos)
        document.getElementById("Nombre").style.visibility = "hidden";
        document.getElementById("Apellido").style.visibility = "hidden";
        document.getElementById("Correo").style.visibility = "hidden";
        document.getElementById("Telefono").style.visibility = "hidden";
        document.getElementById("Descripcion").style.visibility = "hidden";
        document.getElementById("Tipo").style.visibility = "hidden";
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
        } else if (descripcion === "") {
            document.getElementById("Descripcion").innerHTML = "Ingrese una descripcion del problema"; 
            document.getElementById("Descripcion").style.visibility = "visible";
            return;
        } else if (tipo === "") {
            document.getElementById("Tipo").innerHTML = "Ingrese un tipo de problema";
            document.getElementById("Tipo").style.visibility = "visible";
            return;
        } else if (prioridad === "") {
            document.getElementById("Prioridad").innerHTML = "Ingrese un tipo de prioridad";
            document.getElementById("Prioridad").style.visibility = "visible";
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

        const campos = {
            id_cliente: localStorage.getItem("id"),
            Nombre: nombre,
            Apellido: apellido,
            Correo: correo,
            Telefono: telefono,
            Descripcion: descripcion,
            Tipo: tipo,
            Prioridad: prioridad,
            Archivos: archivos
        }
        console.log(campos);
        await axios.post("http://" + ruta.ip + ":" + ruta.port + "/api/clientes/crearticket", JSON.stringify(campos), { headers: { 'Content-Type': 'application/json; charset=UTF-8' } })
            .then(response => {
                console.log(response.data)
                if (response.data.error === false) {
                    document.getElementById("aceptado").innerHTML = "TICKET CREADO CON ÉXITO";
                    document.getElementById("aceptado").style.visibility = "visible";
                    window.location.href = "/Clientes/VerTicket";
                } else {
                    document.getElementById("no").innerHTML = response.data.message.toUpperCase();
                    window.location.href = "/Clientes/VerTicket";
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
                <div className="FondoRegistro" id="FondoRegistro1">
                        <Segment placeholder id="IniciarLogin">
                            <Header icon>
                                <Form>
                                    <Icon name='ticket alternate' style={{ color: "white" }} />
                                    <h1 style={{ color: "white" }}>CREAR TICKET</h1>
                                    <Input type="text" name="Nombre" label='Nombre' placeholder='Byron Estuardo' onChange={e => setNombre(e.target.value)} className="Datos" autoComplete="off" />
                                    <br />
                                    <Label pointing prompt color="red" id="Nombre" className="Alerta"></Label>
                                    <br />
                                    <Input type="text" name="Apellido" label='Apellido' placeholder='Caal Catun' onChange={e => setApellido(e.target.value)} className="Datos" autoComplete="off" />
                                    <br />
                                    <Label pointing prompt color="red" id="Apellido" className="Alerta"></Label>
                                    <br />
                                    <Input type="text" name="correo" label='Correo' placeholder='Jesse@gmail.com' onChange={e => setCorreo(e.target.value)} className="Datos" autoComplete="off" />
                                    <br />
                                    <Label pointing prompt color="red" id="Correo" className="Alerta"></Label>
                                    <br />
                                    <Input type="number" name="Telefono" label='Telefono' placeholder='12345678' onChange={e => setTelefono(e.target.value)} className="Datos" autoComplete="off" />
                                    <br />
                                    <Label pointing prompt color="red" id="Telefono" className="Alerta"></Label>
                                    <br />
                                    <Input type="text" name="Descripcion" label='Descripcion' placeholder='Describe el problema...' onChange={e => setDescripcion(e.target.value)} className="Datos" autoComplete="off" />
                                    <br />
                                    <Label pointing prompt color="red" id="Descripcion" className="Alerta"></Label>
                                    <br />
                                    <Input type="text" name="Tipo" label='Tipo' placeholder='Facturacion, tecnico, etc...' onChange={e => setTipo(e.target.value)} className="Datos" autoComplete="off" />
                                    <br />
                                    <Label pointing prompt color="red" id="Tipo" className="Alerta"></Label>
                                    <br />
                                    <Label horizontal size='big'>Prioridad</Label>
                                    <Select
                                        options={options}
                                        name="Prioridad"
                                        label='Prioridad'
                                        placeholder='Selecciona una Opcion'
                                        onChange={(e, { value }) => setPrioridad(value)} // Usa destructuración para obtener el valor seleccionado
                                    />
                                    <br />
                                    <Label pointing prompt color="red" id="Prioridad" className="Alerta"></Label>
                                    <br />
                                    <Label horizontal size='big'>Archivos</Label>
                                    <br />
                                    <br />
                                    <center><FileInput change={handleFilesChange} title={""} /></center>
                                    <br />
                                    <Label pointing prompt color="red" id="Archivo" className="Alerta"></Label>
                                    <br />
                                    <Label pointing="below" prompt color="red" id="no" className="Alerta"></Label>
                                    <br />
                                    <Button color='green' className="Datos" onClick={registro}>Crear Ticket</Button>
                                    <br />
                                    <Label pointing prompt color="blue" id="aceptado" className="Alerta"></Label>
                                </Form>
                            </Header>
                        </Segment>
                    
                </div>
            </div>
        </>
    )
}

export default CrearTicket
