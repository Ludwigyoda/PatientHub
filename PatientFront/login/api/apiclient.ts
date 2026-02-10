import AsyncStorage from '@react-native-async-storage/async-storage'; // doit etre installé : npm install @react-native-async-storage/async-storage
import axios from 'axios'; // doit etre installé : npm install axios
import { router } from 'expo-router'; // disponible avec expo-router
import { jwtDecode } from 'jwt-decode'; // doit etre installé : npm install jwt-decode



const isTokenValid = (token: string): boolean => {

    if (!token) {
        return false
    }

    try {
        const Decodedtoken = jwtDecode<{ exp: number }>(token)

        const currentTime = Date.now() / 1000;

        return Decodedtoken.exp > currentTime;

    } catch (error) {

        console.log('une erreur dans isTokenValid')
        return false
    }
}
const cleanToken = async () => {
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('user')
}

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-type': 'application/json'
    }

})
apiClient.interceptors.request.use(
    async (request) => {
        const token = localStorage.getItem('token')

        if (token) {
            if (isTokenValid(token)) {
                request.headers.Authorization = `Bearer ${token}`
            } else {
                await cleanToken();
                router.push('/')
                return Promise.reject(new Error('token expiré'))
            }
        }
        return (
            request
        )
    }, (error: Error) => {
        return Promise.reject(error)
    }
)

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 400) {
            await cleanToken();
            router.push('/')
        }
        return Promise.reject(error);
    }

)
export default apiClient