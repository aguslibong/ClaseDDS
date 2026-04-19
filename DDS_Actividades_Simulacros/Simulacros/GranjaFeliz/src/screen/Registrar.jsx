import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Registrar = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [datos, setDatos] = useState(null)

    const altaAnimal = data => {
        setDatos(data);
        console.log(data);
        // Aquí puedes manejar el registro (ej: enviar a una API)
    };

    return (
        <Form onSubmit={handleSubmit(altaAnimal)}>
            <Form.Group as={Row} className="mb-3" controlId="formNombre">
                <Form.Label column lg={3}>Nombre:</Form.Label>
                <Col>
                    <Form.Control
                        type="text"
                        placeholder="Nombre del animal"
                        {...register('nombre', { required: 'El nombre es obligatorio' })}
                        isInvalid={!!errors.nombre}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.nombre && errors.nombre.message}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formDesc">
                <Form.Label column lg={3}>Descripción:</Form.Label>
                <Col>
                    <Form.Control
                        type="text"
                        placeholder="Descripción"
                        {...register('descripcion', { required: 'La descripción es obligatorio' })}
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.desc && errors.desc.message}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formFoto">
                <Form.Label column lg={3}>Foto:</Form.Label>
                <Col>
                    <Form.Control
                        type="text"
                        placeholder="Inserte url de la imagen"
                        {...register('foto', { required: 'La url de la foto es obligatoria' })}
                        isInvalid={!!errors.foto}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.foto && errors.foto.message}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Button variant="primary" type="submit">
                Registrar
            </Button>
        </Form>
    );
};

export default Registrar;