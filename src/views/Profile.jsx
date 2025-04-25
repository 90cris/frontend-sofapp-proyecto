import React, { useState, useContext, useEffect } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import jwtDecode from "jwt-decode";

const Profile = () => {
  const {
    token
  } = useContext(UserContext);

  const decodedToken = jwtDecode(token);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    fono: "",
  });

  useEffect(() => {
    setFormData({
      firstName: decodedToken.nombre,
      lastName: decodedToken.apellido,
      email: decodedToken.email,
      fono: decodedToken.fono,
    });
  }, []);  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Perfil de usuario</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFirstName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled
              />
            </Form.Group>

            <Form.Group controlId="formFono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="fono"
                value={formData.fono}
                onChange={handleChange}
                disabled
              />
            </Form.Group>

          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
