import React, { useState, useContext, useEffect } from 'react';
import { Table, Dropdown } from 'react-bootstrap'; // <-- Import Table
import { SfpContext } from '../context/SfpContext';
import EditSFP from "../Components/EditSFP.jsx";
import DeleteSFP from "../Components/DeleteSFP.jsx";

export default function FilterSFP() {
  const { sfpArray } = useContext(SfpContext);
  const [selectedBrand, setSelectedBrand] = useState('Select Brand');
  const [brands, setBrands] = useState([]);

  // Get unique brands whenever the sfpArray changes
  useEffect(() => {
    const allBrands = sfpArray.map(sfp => sfp.marca);
    const uniqueBrands = ["None", ...new Set(allBrands)];
    setBrands(uniqueBrands);
  }, [sfpArray]);

  // Filter the array based on the selected brand
  const filteredSfPs = sfpArray.filter(sfp =>
    selectedBrand === 'All' || sfp.marca === selectedBrand
  );

  const handleSelect = (brand) => {
    setSelectedBrand(brand);
  };

  return (
    <div className='container'>
      <h1 className='bold'>Filter by Brand</h1>
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          {selectedBrand === 'All' ? 'Select Brand' : selectedBrand}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {brands.map((brand, index) => (
            <Dropdown.Item key={index} eventKey={brand} active={selectedBrand === brand}>
              {brand}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Table striped bordered hover className='mt-3'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Part Number</th>
            <th>Description</th>
            <th>State</th>
            <th>Serial Numbers</th>
            <th>Brand</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSfPs.map((sfp) => (
            <tr key={sfp.id}>
              <td>{sfp.id}</td>
              <td>{sfp.p_n}</td>
              <td>{sfp.descripcion}</td>
              <td>{sfp.state}</td>
              <td>
                {sfp.s_n.map((item) => (
                  <p>{item}</p>
                ))}
              </td>
              <td>{sfp.marca}</td>
              <td>{sfp.cantidad}</td>
              <td>
                <EditSFP sfp={sfp}></EditSFP>
                <DeleteSFP id={sfp.id}></DeleteSFP>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}