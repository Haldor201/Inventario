import { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

export default function AddSFP() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentSerialNumber, setCurrentSerialNumber] = useState("");

  const [formData, setFormData] = useState({
    id:"",
    p_n: "",
    descripcion: "",
    s_n: [],
    cantidad: "",
    p_a: "",
    marca: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.s_n.length !== parseInt(formData.cantidad, 10)) {
      alert(
        `Error: El número de seriales agregados (${formData.s_n.length}) debe ser igual a la cantidad (${formData.cantidad}).`
      );
      return;
    }

    if (formData.s_n.some((serial) => serial.trim() === "")) {
      alert("Error: No se permiten serial numbers vacíos.");
      return;
    }

    console.log("Datos del formulario:", formData);
    

    setFormData({
      id:"",
      p_n: '',
      descripcion: '',
      s_n: [],
      cantidad: '',
      p_a: '',
      marca: ''
    });
    setCurrentSerialNumber('');

    handleClose();
  };
  const handleAddSerialNumber = () => {
    if (currentSerialNumber.trim() !== "") {
      setFormData((prevState) => ({
        ...prevState,
        s_n: [...prevState.s_n, currentSerialNumber],
      }));
      setCurrentSerialNumber(""); // Limpiar el input después de agregar
    }
  };

  return (
    <>
      <div className="mt-5 container d-flex justify-content-center">
        <Button variant="dark" onClick={handleShow}>
          Agregar{" "}
        </Button>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Añadir Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* Campo 1: Part Number */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Part Number
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  name="p_n"
                  value={formData.p_n}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            {/* Campo 2: Descripción */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Descripción
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            {/* Campo 3: Cantidad */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Cantidad
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="number"
                  name="cantidad"
                  value={formData.cantidad}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            {/*
      Si el número de seriales agregados es menor que la cantidad especificada,
      mostramos el input y el botón de agregar.
    */}
            {formData.s_n.length < formData.cantidad && (
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="4">
                  Serial Number
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    type="text"
                    value={currentSerialNumber}
                    onChange={(e) => setCurrentSerialNumber(e.target.value)}
                    placeholder="Ingrese Serial"
                  />
                </Col>
                <Col sm="2">
                  <Button
                    variant="outline-primary"
                    onClick={handleAddSerialNumber}
                  >
                    +
                  </Button>
                </Col>
              </Form.Group>
            )}

            {/* Muestra la lista de seriales agregados */}
            {formData.s_n.length > 0 && (
              <div className="mb-3">
                <p>
                  Serials agregados ({formData.s_n.length} de{" "}
                  {formData.cantidad}):
                </p>
                <ul style={{ maxHeight: "100px", overflowY: "auto" }}>
                  {formData.s_n.map((serial, index) => (
                    <li key={index}>{serial}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Campo 4: Producción o Almacén */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Producción o Almacén
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  name="p_a"
                  value={formData.p_a}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            {/* Campo 5: Marca */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Marca
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  name="marca"
                  value={formData.marca}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
              <Button variant="primary" type="submit">
                Guardar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
