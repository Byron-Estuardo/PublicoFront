import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, ModalHeader, ModalContent, ModalDescription, ModalActions, Dropdown } from 'semantic-ui-react'; // Quité las importaciones innecesarias
import axios from 'axios';
import ruta from '../../Rutas.jsx';
import FormularioSolucion from '../General/FormularioSolucion.jsx'

const TablaTickets1 = (props) => {
    console.log(props)
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;
    const tableData = Array.isArray(props.almacenados.data) ? props.almacenados.data : [];
    const [showModal, setShowModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [agentes, setAgentes] = useState([]);
    const [selectedAgente, setSelectedAgente] = useState(null);
    const [historialCambios, setHistorialCambios] = useState([]);
    const [notas, setNotas] = useState([]);
    const [anexos, setAnexos] = useState([]);
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const rowsToShow = tableData.slice(startIndex, endIndex);
    const [showSolucionModal, setShowSolucionModal] = useState(false);

    const handleOpenSolucionModal = async (ticket) =>  {
        setSelectedTicket(ticket);
        setShowSolucionModal(true);
    };

    const handleCloseSolucionModal = () => {
        setShowSolucionModal(false);
    };


    const goToPrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const goToNextPage = () => {
        if (endIndex < tableData.length) {
            setPage(page + 1);
        }
    };
    const handleOpenModal = async (ticket) => {
        setSelectedTicket(ticket);
        setShowModal(true);
        await obtenerHistorialCambios(ticket.idTicket);
        await obtenerNotas(ticket.idTicket);
        await obtenerAnexos(ticket.idTicket);
    };

    const handleCloseModal = () => {
        setSelectedTicket(null);
        setShowModal(false);
        setHistorialCambios([]);
        setNotas([]);
        setAnexos([]);
    };

    const obtenerHistorialCambios = async (idTicket) => {
        try {
            const response = await axios.post("http://" + ruta.ip + ":" + ruta.port + '/api/agentes/historial', { id: idTicket });
            setHistorialCambios(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const obtenerNotas = async (idTicket) => {
        try {
            // const response = await axios.post("http://" + ruta.ip + ":" + ruta.port + '/api/agentes/Vercomentarios', { id: idTicket });
            // setNotas(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const obtenerAnexos = async (idTicket) => {
        try {
            const response = await axios.post("http://" + ruta.ip + ":" + ruta.port + '/api/agentes/AnexosTicket', { id: idTicket });
            setAnexos(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    async function aceptar(id, correo) {
        try {
            const campos = {
                id: id,
                correo: correo
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Table celled inverted selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>NO.</Table.HeaderCell>
                        <Table.HeaderCell>TIPO DE TICKET</Table.HeaderCell>
                        <Table.HeaderCell>ESTADO</Table.HeaderCell>
                        <Table.HeaderCell>PRIORIDAD</Table.HeaderCell>
                        <Table.HeaderCell>FECHA DE CREACION</Table.HeaderCell>
                        <Table.HeaderCell>AGENTE ASIGNADO</Table.HeaderCell>
                        <Table.HeaderCell>DETALLES</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {rowsToShow.map((row, index) => {
                        if (row.id === 0) {
                            return null;
                        }
                        return (
                            <Table.Row key={index}>
                                <Table.Cell>{row.idTicket}</Table.Cell>
                                <Table.Cell>{row.Tipo}</Table.Cell>
                                <Table.Cell>{row.Estado}</Table.Cell>
                                <Table.Cell>{row.Prioridad}</Table.Cell>
                                <Table.Cell>{row.FechaCreacion}</Table.Cell>
                                <Table.Cell>
                                    {row.tiene_agente === 1 ? (
                                        <span>{row.nombre_agente}</span>
                                    ) : (
                                        <span>SIN AGENTE ASIGNADO</span>
                                    )}
                                </Table.Cell>
                                <Table.Cell>
                                    <Button color="green" onClick={() => handleOpenModal(row)}> Ver TICKET </Button> {/* Cambiado de "Ver Ticket" a "Ver Estado" */}
                                </Table.Cell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
            <Button disabled={page === 1} onClick={goToPrevPage}>
                Anterior
            </Button>
            <Button disabled={endIndex >= tableData.length} onClick={goToNextPage}>
                Siguiente
            </Button>
            <Modal open={showModal} onClose={handleCloseModal}>
                <ModalHeader>Detalles del Ticket</ModalHeader>
                <ModalContent>
                    <ModalDescription>
                        {/* Información del ticket */}
                        <div>
                            <h3>Información del Ticket</h3>
                            <p>Nombres: {selectedTicket && selectedTicket.Nombre}</p>
                            <p>Apellidos: {selectedTicket && selectedTicket.Apellido}</p>
                            <p>Correo: {selectedTicket && selectedTicket.Correo}</p>
                            <p>ID del Ticker: {selectedTicket && selectedTicket.idTicket}</p>
                            <p>Tipo de Ticket: {selectedTicket && selectedTicket.Tipo}</p>
                            <p>Estado: {selectedTicket && selectedTicket.Estado}</p>
                            <p>Prioridad: {selectedTicket && selectedTicket.Prioridad}</p>
                            <p>Descipcion: {selectedTicket && selectedTicket.Descripcion}</p>
                            <p>Fecha de Creación: {selectedTicket && selectedTicket.FechaCreacion}</p>
                            {selectedTicket && selectedTicket.tiene_agente === 1 ? ( // Verifica si hay un agente asignado
                                <p>Agente Asignado: {selectedTicket && selectedTicket.nombre_agente}</p>// Si hay un agente asignado, muestra el nombre del agente
                            ) : (
                                <p>Agente Asignado: {"Sin Agente Asignado"}</p>// Si no hay agente asignado, muestra un botón que abre el modal
                            )}
                            <p>Ultima Actualizacion: {selectedTicket && selectedTicket.Ultimaactualizacion}</p>
                            
                            {selectedTicket && selectedTicket.Solucion === "" ? (
                                <p>Solucion: {"Sin solucion, Vuelve mas Tarde"}</p>
                            ) : (
                                <p>Solucion: {selectedTicket && selectedTicket.Solucion}</p>
                            )}
                            <p> </p>
                            <p> </p>
                        </div>

                        {/* Historial de cambios */}
                        <div>
                            <h3>Historial de Cambios</h3>
                            <ul>
                                {historialCambios.map((cambio, index) => (
                                    <li key={index}>
                                        <p>Cambio: {cambio.Cambio}</p>
                                        <p>Fecha del Cambio: {cambio.Fecha_Hora}</p>
                                        <p>Encargado: {cambio.Encargado}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Notas */}
                        <div>
                            <h3>Notas</h3>
                            <ul>
                                PROXIMAMENTE
                            </ul>
                        </div>

                        {/* Anexos */}
                        <div>
                            <h3>Anexos</h3>
                            <ul>
                                {anexos.map((anexo, index) => (
                                    <li key={index}><a href={anexo.Archivo} target="_blank" rel="noopener noreferrer">Descargar Anexo {index + 1}</a></li>
                                ))}
                            </ul>
                        </div>
                    </ModalDescription>
                </ModalContent>
                <ModalActions>
                    <Button onClick={handleCloseModal}>Cerrar</Button>
                </ModalActions>
            </Modal>
        </>
    );
};
export default TablaTickets1;
