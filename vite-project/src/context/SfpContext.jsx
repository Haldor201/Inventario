import {createContext, useEffect, useState} from 'react'

export const SfpContext=createContext(null);


export default function SfpProvider({children}) {
  const [sfpArray,setSfpArray]=useState([]);

  const addSfp = (newSfp) => {
    setSfpArray(prevArray => [...prevArray, newSfp]);
  };


  useEffect(()=>{
    setSfpArray([{
      id: "48Y7EHDWASJDQWIE",
      p_n: "SFP-10G-SR-S=",
      descripcion: "Transceiver Cisco 10G, 850nm, 300m, MMF",
      s_n: ["JSODNEI209", "SJWDNIKPS"],
      cantidad: 2,
      p_a: "A",
      marca: "Cisco",
    }])

  },[])
  return (
    <SfpContext.Provider value={{sfpArray,addSfp}}>{children}</SfpContext.Provider>
  )
}
