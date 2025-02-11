import { createContext, useState, useContext } from "react";
import { User } from "../services/user.js";

const AuthContext = createContext()

export function AuthProvider({children}){
    const [user, setUser] = useState(null)

    const login = (userdata) => {setUser(userdata)}
    const logout = async () => {
        setUser(null)
        await User.logout()
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext)
}