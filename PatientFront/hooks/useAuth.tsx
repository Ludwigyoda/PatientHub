import { useContext } from "react";
import { AuthContext } from "../app/context/authContext";


export const useAuth = () => {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error("Le context est undefined dans le hooks useAuth");
    }

    const {user, login, register, logout, isLoading, error, isAuthenticated} = context;
    return {user, login, register, logout, isLoading, error, isAuthenticated};
}