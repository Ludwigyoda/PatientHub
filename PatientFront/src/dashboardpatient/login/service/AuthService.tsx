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

    register : async ( username : string , email : string , password : string ) => {
        const response = await apiClient.post('/auth/register', {username, email , password});

        const { patient: cleanPatient, token } = response.data
        await AsyncStorage.setItem('token', token)
        await AsyncStorage.setItem('user', JSON.stringify(cleanPatient))
        return { cleanPatient }

    },

    logout : async () => {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");

    },

    getToken : async () => {
        const token = await AsyncStorage.getItem('token');
        return token;
    }

};
