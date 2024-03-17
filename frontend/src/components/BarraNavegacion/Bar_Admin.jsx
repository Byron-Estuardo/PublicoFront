import { React, useState } from 'react'
import { Menu } from 'semantic-ui-react'

const colores = ['blue', 'green', 'olive', 'brown', 'yellow']
const opciones = ['Crear Usuarios', 'Gestionar Usuarios', "Configuracion", "Generar Informes", "Salir"]

function NavBarAdmin() {
    const [activo, setactivo] = useState(colores[10])
    if (activo === "blue") {
        window.location.href = "/Admin/RegistroAdmin"
    } else if (activo === "green") {
        window.location.href = "/Admin/RegistroAdmin"
    } else if (activo === "olive") {
        window.location.href = "/Admin/RegistroAdmin"
    } else if (activo === "brown") {
        window.location.href = "/Admin/RegistroAdmin"
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
