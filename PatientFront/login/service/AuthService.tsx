import apiClient from "../api/apiclient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const authService = {
    login: async (email: string, password: string) => {
        const réponse = await apiClient.post('/auth/login', { email, password })
        const { token, user } = réponse.data
        await AsyncStorage.setItem('token', token)
        await AsyncStorage.setItem('user', JSON.stringify(user))
        return {user}
    }, 

    // logout 
    // get Token 

    // Admin easter egg login ? 
};
