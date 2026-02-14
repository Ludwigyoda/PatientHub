import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { authService } from "../login/service/AuthService";
import { UserContext } from "../login/modele/userContext";

interface AuthContextType {
    user: UserContext | null;
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}
interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {

    const [user, setUser] = useState<UserContext | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const isAuthenticated = user !== null && user.id !== null;

    useEffect(() => {


        const loadDataUser = async () => {
            setIsLoading(true);
            try {
                const user = await AsyncStorage.getItem('user')
                const token = await authService.getToken();

                if (user && token) {
                    setUser(JSON.parse(user))
                }

            } catch (error) {
                console.log('Erreur AuthContext :' + error);

                await authService.logout();
            }
            finally {
                setIsLoading(false);


            };
        }

        loadDataUser();


    }, [])

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const { cleanPatient } = await authService.login(email, password);
            setUser(cleanPatient);

        } catch (error) {
            setError('erreur dauthentification : ' + error);
            throw error;
        }
        finally {
            setIsLoading(false);
        }
    };


    const register = async (username: string, email: string, password: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const { cleanPatient } = await authService.register(username, email, password);
            setUser(cleanPatient);

        } catch (error) {
            setError('Erreur lors de inscription' + error);
            throw error;
        }
        finally {
            setIsLoading(false);
        }
    }

    const logout = async () => {
        setIsLoading(true);
        setError(null);

        try {
            await authService.logout();
            setUser(null);

        } catch (error) {
            setError('Erreur lors de la déconnexion' + error);
            console.log('Erreur lors du logout authContext : ' + error);

        }
        finally {
            setIsLoading(false);
        }
    }
    return (
        <AuthContext.Provider value={{ user, login, register, logout, isLoading, error, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}


// Hook pour utiliser facilement le contexte
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth doit être utilisé dans un AuthProvider');
    }
    return context;
};

export { AuthContext, AuthProvider };

