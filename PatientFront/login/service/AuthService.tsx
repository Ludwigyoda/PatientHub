import apiClient from "../api/apiclient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const authService = {
    login: async (email: string, password: string) => {
        const réponse = await apiClient.post('/auth', { email, password })
        const { patient: cleanPatient, token } = réponse.data
        await AsyncStorage.setItem('token', token)
        await AsyncStorage.setItem('user', JSON.stringify(cleanPatient))
        return {cleanPatient}
    }, 

    // logout 
    // register 
    // get Token 

    // Admin easter egg login ? 
};
