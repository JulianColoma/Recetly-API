import { createContext, useState, useEffect, useContext } from "react";
import { User } from "../services/user.js";

const AuthContext = createContext()

export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    
      useEffect(async() => {
        try{
          const res = await User.get();
          const response = await res.json();
          const session = response.user;
          if (session) {
            setUser(session);
          }
        }catch(e){
          setUser(null)
        }
      }, []);
    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext)
}