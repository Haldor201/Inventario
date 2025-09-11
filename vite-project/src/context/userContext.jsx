import { createContext,useState } from "react";

export const userContext=createContext(null);


export default function UserProvider({children}){
    const [user,setUser]=useState({"name":"haldor","password":"ICHFBHBWE8"})

    return(
        <userContext.Provider value={{user}}>{children}</userContext.Provider>
    )
}