import React, { useState } from 'react';
import { Form, TextArea, Button } from 'semantic-ui-react'; // Asegúrate de importar los componentes necesarios

const FormularioSolucion = ({ onSubmit }) => {
    const [solucion, setSolucion] = useState('');

    const handleSubmit = () => {
        onSubmit(solucion);
        setSolucion(''); // Limpiar el campo de texto después de enviar la solución
    };

    return (
        <Form>
            <Form.Field>
                <label>Solución</label>
                <TextArea 
                    placeholder='Escribe la solución aquí...' 
                    value={solucion} 
                    onChange={(e) => setSolucion(e.target.value)} 
                />
            </Form.Field>
            <Button onClick={handleSubmit} primary>Enviar Solución</Button>
        </Form>
    );
};

export default FormularioSolucion;
