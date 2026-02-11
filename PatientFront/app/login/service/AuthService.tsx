import apiClient from "../api/apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const authService = {
    login: async (email: string, password: string) => {
        const response = await apiClient.post('/auth', { email, password })
        const { patient: cleanPatient, token } = response.data
        await AsyncStorage.setItem('token', token)
        await AsyncStorage.setItem('user', JSON.stringify(cleanPatient))
        return { cleanPatient }
    },

    // logout
    // register
    // get Token

    // Admin easter egg login ? ABANDON TOTAL
};
