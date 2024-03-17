import { React, useState } from 'react'
import { Menu } from 'semantic-ui-react'

const colores = ['blue', 'green', 'yellow']
const opciones = ['Crear Ticket', 'Seguir Tickes Creados', 'salir']

function NavBarAdmin() {
    const [activo, setactivo] = useState(colores[10])
    if (activo === "blue") {
        window.location.href = "/Clientes/CrearTicket"
    } else if (activo === "green") {
        window.location.href = "/Clientes/VerTicket"
    } else if (activo === "yellow") {
        window.location.href = "/"
    }

    return (
        <Menu inverted className="Nav" >
            {colores.map((c, iterador) => (
                <Menu.Item
                    key={c}
                    name={opciones[iterador]}
                    active={activo === c}
                    color={c}
                    onClick={() => setactivo(c)}
                />
            ))}
        </Menu>
    )
}

export default NavBarAdmin
