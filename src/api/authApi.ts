import axios from 'axios';
import { API_PATHS } from './apiPaths'

export async function loginUser(email: string, password: string) {
    const API_URL = API_PATHS.AUTH.LOGIN;
    try {
        const response = await axios.post(API_URL, { email, password });
        if (response.status === 200) {
            return response.data;
        }
        return null;

    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error("Error during login:", error.response?.data || error.message);
        } else {
            console.error("Unexpected error during login:", error);
        }
        return null;
    }
}