import { React, useState } from 'react'
import { Menu } from 'semantic-ui-react'

const colores = ['blue', 'olive', 'yellow']
const opciones = ['Ver Tickets', "Escar Tickets", "Salir"]
function NavBarAdmin() {
    const [activo, setactivo] = useState(colores[10])
    if (activo === "blue") {
        window.location.href = "/Agentes/VerTickets"
    } else if (activo === "olive") {
        window.location.href = "/Agentes/EscalarTickets"
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
