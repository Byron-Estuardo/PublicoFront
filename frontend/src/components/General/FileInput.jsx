import React from "react";
import { Card, Placeholder, Form } from "semantic-ui-react";

function FileInput(props) {
    return (
        <Card>
            <Card.Content>
                <Card.Header>{props.title}</Card.Header>
                <Placeholder>
                    <Placeholder.Image rectangular />
                </Placeholder>
                <Card.Description>
                    <Form.Input required type="file" content="Subir Archivo" multiple onChange={props.change} />
                </Card.Description>
            </Card.Content>
        </Card>
    );
}

export default FileInput;
