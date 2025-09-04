import Table from "react-bootstrap/Table";
import EditSFP from "../Components/EditSFP.jsx";
import DeleteSFP from "../Components/DeleteSFP.jsx";
import { useContext } from "react";
import { SfpContext } from '../context/SfpContext.jsx'



function Table_P() {
  const { sfpArray } = useContext(SfpContext);
  console.log(sfpArray)
  return (
    <>
      <Table striped bordered hover className="container mt-3" variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Part Number</th>
            <th>Refurbished</th>
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
              <td>{sfp.refurbished}</td>
              <td>{sfp.descripcion}</td>
              <td>
                {sfp.s_n.map((item) => (
                  <p>{item}</p>
                ))}
              </td>
              <td>{sfp.cantidad}</td>
              <td>{sfp.p_a}</td>
              <td>{sfp.marca}</td>
              <td>
                <EditSFP sfp={sfp}></EditSFP>
                <DeleteSFP id={sfp.id}></DeleteSFP>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Table_P;
