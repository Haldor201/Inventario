import Table from 'react-bootstrap/Table';

function Table_P() {
  return (
    <Table striped bordered hover className='container mt-3' variant='dark'>
      <thead>
        <tr>
          <th>#</th>
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
        <tr>
          <td>1</td>
          <td>SFP-10G-SR-S=</td>
          <td>Transceiver MMF, 10G, Enterprise-Class</td>
          <td>AHSB829SJ-OAOAMODNI</td>
          <td>2</td>
          <td>P</td>
          <td>Cisco</td>
          <td>  </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default Table_P;