import React from 'react';
import { Header, Icon, Segment, Button } from 'semantic-ui-react';
import '../estilos.css';

function Error() {
    const salir = () => {
        console.log("salir");
    };

    return (
        <>
            <div className="Error">
                <div className="FondoLogin">
                    <Segment placeholder id="IniciarLogin">
                        <Header icon>
                            <h1>ERROR</h1>
                            <Icon name='user times' style={{ color: "white" }} />
                            <h1 style={{ color: "white" }}>QUE HACE AQUI PA!</h1>
                            <h1 style={{ color: "white" }}>NO TIENE PERMISOS PARA INGRESAR A ESTA PÁGINA</h1>
                            <Button color='blue' className="Datos1" onClick={salir}>VOLVER</Button>
                        </Header>
                    </Segment>
                </div>
            </div>
        </>
    );
}

export default Error;
