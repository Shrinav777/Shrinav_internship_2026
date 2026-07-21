import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/auth`;

class AuthService {

    async register(fullName, email, password) {
        const response = await axios.post(`${API_URL}/register`, {
            fullName,
            email,
            password
        });
        return response.data;
    }

    async login(email, password) {
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password
        });
        // On success, frontend pages will call login() from AuthContext to store user.
        return response.data;
    }

    async forgotPassword(email, newPassword) {
        const response = await axios.put(`${API_URL}/forgot-password`, {
            email,
            newPassword
        });
        return response.data;
    }

    async getUser(id) {
        const response = await axios.get(`${API_URL}/user/${id}`);
        return response.data;
    }

    getCurrentUser() {
        try {
            return JSON.parse(localStorage.getItem('user'));
        } catch (e) {
            return null;
        }
    }

    isAuthenticated() {
        return !!localStorage.getItem('user');
    }
}

export default new AuthService();
