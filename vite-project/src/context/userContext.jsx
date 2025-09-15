import { createContext,useState } from "react";
import { getUserProfile } from "../services/userAPI";
export const userContext=createContext(null);


export default function UserProvider({children}){
    const [user,setUser]=useState({"name":"haldor","password":"ICHFBHBWE8"})
    const fetchUser = async () => {
          try {
            const data = await getUserProfile();
            console.log(data)
          } catch (error) {
            console.error("Failed ", error);
          }
        };
        fetchUser();
    return(
        <userContext.Provider value={{user}}>{children}</userContext.Provider>
    )
}