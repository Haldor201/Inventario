// src/components/EditSFP.jsx
import { useState, useEffect, useContext } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import editSVG from "../icons/edit.svg";
import { SfpContext } from '../context/SfpContext';   

export default function EditSFP({ sfp }) {
  const { editSfp } = useContext(SfpContext); 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentSerialNumber, setCurrentSerialNumber] = useState("");

  const [formData, setFormData] = useState({
    id: "",
    p_n: "",
    descripcion: "",
    state: "", // Added state field
    s_n: [],
    cantidad: 0,
    p_a: "",
    marca: "",
  });

  useEffect(() => {
    if (sfp) {
      setFormData({
        id: sfp.id,
        p_n: sfp.p_n,
        descripcion: sfp.descripcion,
        state: sfp.state || "New", // Set initial state from sfp.state or default to "New"
        s_n: sfp.s_n || [],
        cantidad: sfp.cantidad || 0,
        p_a: sfp.p_a,
        marca: sfp.marca,
      });
    }
  }, [show, sfp]);

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      cantidad: prevState.s_n.length,
    }));
  }, [formData.s_n.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddSerialNumber = () => {
    const serialTrimmed = currentSerialNumber.trim();
    if (serialTrimmed !== "") {
      setFormData((prevState) => ({
        ...prevState,
        s_n: [...prevState.s_n, serialTrimmed],
      }));
      setCurrentSerialNumber("");
    }
  };

  const handleRemoveSerialNumber = (indexToRemove) => {
    setFormData((prevState) => ({
      ...prevState,
      s_n: prevState.s_n.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.s_n.some((serial) => serial.trim() === "")) {
      alert("Error: No se permiten serial numbers vacíos.");
      return;
    }

    // Call the context function to update the data
    editSfp(formData);

    handleClose();
  };

  return (
    <>
      <img
        src={editSVG}
        onClick={handleShow}
        alt="Editar"
        className="icon-action me-2 pointer"
      />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
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

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Cantidad
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="number"
                  name="cantidad"
                  value={formData.cantidad}
                  readOnly
                  disabled
                />
              </Col>
            </Form.Group>

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

            {formData.s_n.length > 0 && (
              <div className="mb-3">
                <p>Serials agregados ({formData.s_n.length}):</p>
                <ul style={{ maxHeight: "100px", overflowY: "auto" }}>
                  {formData.s_n.map((serial, index) => (
                    <li
                      key={index}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <span>{serial}</span>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemoveSerialNumber(index)}
                      >
                        -
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Nuevo Campo: Estado (New/Refurbished) */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Estado
              </Form.Label>
              <Col sm="8">
                <Form.Select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                >
                  <option value="New">New</option>
                  <option value="Refurbished">Refurbished</option>
                </Form.Select>
              </Col>
            </Form.Group>

            {/* Campo: Producción o Almacén */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Producción o Almacén
              </Form.Label>
              <Col sm="8">
                <Form.Select
                  name="p_a"
                  value={formData.p_a}
                  onChange={handleChange}
                >
                  <option value="Producción">Producción</option>
                  <option value="Almacén">Almacén</option>
                </Form.Select>
              </Col>
            </Form.Group>

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
                Guardar Cambios
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}