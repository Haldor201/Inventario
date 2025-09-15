import { createContext, useEffect, useState,useCallback } from 'react'
export const SfpContext = createContext(null);
import { getAllSfps, addSfpT, editSfpt, deleteSfpt } from '../services/sfpApi';
//Ruta de los credenciales
import { getUserProfile,loginUser,logoutUser } from "../services/userAPI";

export default function SfpProvider({ children }) {
  const [sfpArray, setSfpArray] = useState([]);
  //Funciones de la Ruta de los usuarios
  const [user,setUser]=useState({})
  const fetchProfile = useCallback(async () => {
        try {
            const userData = await getUserProfile();
            setUser(userData);
            console.log('Datos del usuario:', userData); // Para ver que no se repite
        } catch (error) {
            console.error('Error al cargar el perfil:', error);
            setUser(null);
        }
    }, []);
  const fetchLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Failed ", error);
    }
  };
  const fetchLogin = async (user) => {
    try {
      const data = await loginUser(user);
      console.log(data)
    } catch (error) {
      alert( error);
    }
  };
  /**
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   */
  const fetchSfps = async () => {
      try {
        const data = await getAllSfps();
        console.log(data)
        setSfpArray(data);
      } catch (error) {
        console.error("Failed to fetch SFPs:", error);
      }
    };

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
      const response = await editSfpt(id, updatedSfp);
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
      await deleteSfpt(sfpId);
      setSfpArray(prevArray => prevArray.filter(sfp => sfp._id !== sfpId));
    } catch (error) {
      console.error("Error deleting SFP:", error.message);
    }
  };

  return (
    <SfpContext.Provider value={{fetchLogout,fetchSfps,fetchLogin, fetchProfile,user ,sfpArray, addSfp, setSfpArray, editSfp, deleteSfp }}>{children}</SfpContext.Provider>
  )
}
