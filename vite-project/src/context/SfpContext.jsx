import { createContext, useEffect, useState } from 'react'
export const SfpContext = createContext(null);
import { getAllSfps,addSfpT  } from '../services/sfpApi';

export default function SfpProvider({ children }) {
  const [sfpArray, setSfpArray] = useState([]);

  useEffect(() => {
    const fetchSfps = async () => {
      try {
        const data = await getAllSfps();
        setSfpArray(data);
      } catch (error) {
        console.error("Failed to fetch SFPs:", error);
      }
      console.log(data)
    };
    fetchSfps();
  }, []); 

  const addSfp = async (newSfp) => {
    try {
      const response = await addSfpT(newSfp);
      setSfpArray(prevArray => [...prevArray, response.data]);
    } catch (error) {
      console.error("Error adding SFP:", error.message);
      // You can handle error notifications here
    }
  };

  // Function to edit an existing SFP
  const editSfp = async (id, updatedSfp) => {
    try {
      const response = await editSfpApi(id, updatedSfp);
      setSfpArray(prevArray =>
        prevArray.map(sfp => (sfp._id === id ? response.data : sfp))
      );
    } catch (error) {
      console.error("Error editing SFP:", error.message);
    }
  };

  // Function to delete an SFP
  const deleteSfp = async (sfpId) => {
    try {
      await deleteSfpApi(sfpId);
      setSfpArray(prevArray => prevArray.filter(sfp => sfp._id !== sfpId));
    } catch (error) {
      console.error("Error deleting SFP:", error.message);
    }
  };

  return (
    <SfpContext.Provider value={{ sfpArray, addSfp, setSfpArray, editSfp, deleteSfp }}>{children}</SfpContext.Provider>
  )
}
