import {createContext, useEffect, useState} from 'react'

export const SfpContext=createContext(null);


export default function SfpProvider({children}) {
  const [sfpArray,setSfpArray]=useState([]);

  const addSfp = (newSfp) => {
    setSfpArray(prevArray => [...prevArray, newSfp]);
  };

    // Function to edit an existing SFP
  const editSfp = (updatedSfp) => {
    setSfpArray(prevArray =>
      // Find the SFP by its ID and replace it with the updated object
      prevArray.map(sfp => (sfp.id === updatedSfp.id ? updatedSfp : sfp))
    );
  };

  // Function to delete an SFP by its ID
  const deleteSfp = (sfpId) => {
    setSfpArray(prevArray => prevArray.filter(sfp => sfp.id !== sfpId));
  };
  useEffect(()=>{
    setSfpArray([{
      id: "48Y7EHDWASJDQWIE",
      p_n: "SFP-10G-SR-S=",
      state:"New",
      descripcion: "Transceiver Cisco 10G, 850nm, 300m, MMF",
      s_n: ["JSODNEI209", "SJWDNIKPS"],
      cantidad: 2,
      p_a: "Almacén",
      marca: "Cisco",
    }])

  },[])
  return (
    <SfpContext.Provider value={{sfpArray,addSfp,setSfpArray,editSfp,deleteSfp}}>{children}</SfpContext.Provider>
  )
}
