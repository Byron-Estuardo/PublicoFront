import { React, useState } from 'react'
import { Menu } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

const colores = ['blue', 'brown']
const opciones = ['Iniciar Sesion', 'Crear Usuario']

function NavBarLogin() {
    const [activo, setactivo] = useState(colores[10])
    if (activo === "brown") {
        window.location.href = "/Registro"
    } else if (activo === "blue") {
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

export default NavBarLogin
