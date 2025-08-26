import Table from "react-bootstrap/Table";
import deleteSVG from "../icons/delete.svg";
import EditSFP from "../Components/EditSFP.jsx";
import editSVG from "../icons/edit.svg";
function Table_P() {
  const sfpArray = [
    {
      id: "48Y7EHDWASJDQWIE",
      p_n: "SFP-10G-SR-S=",
      descipcion: "Transceiver Cisco 10G, 850nm, 300m, MMF",
      s_n: ["JSODNEI209", "SJWDNIKPS"],
      cantidad: 2,
      p_a: "A",
      marca: "Cisco",
    },
  ];
  return (
    <Table striped bordered hover className="container mt-3" variant="dark">
      <thead>
        <tr>
          <th>ID</th>
          <th>Part Number</th>
          <th>Descripción</th>
          <th>Serial Number</th>
          <th>Cantidad</th>
          <th>Producción o Almacen</th>
          <th>Marca</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {sfpArray.map((sfp) => (
          <tr key={sfp.id}>
            <td>{sfp.id}</td>
            <td>{sfp.p_n}</td>
            <td>{sfp.descipcion}</td>
            <td>
              {sfp.s_n.map((item) => (
                <p>{item}</p>
              ))}
            </td>
            <td>{sfp.cantidad}</td>
            <td>{sfp.p_a}</td>
            <td>{sfp.marca}</td>
            <td>
              <img
                src={editSVG}
                alt="Editar"
                className="icon-action me-2"
              />
              <img
                src={deleteSVG}
                alt="Eliminar"
                className="icon-action"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Table_P;
