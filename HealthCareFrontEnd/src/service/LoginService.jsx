import axios from 'axios';

export const loginService = async (email, pw) => {
    try {
        const response = await axios.get("http://localhost:8082/api/v1/auth/login", {
            params: { email, pw },
        });
        return response;
    } catch (err) {
        throw new Error("Login failed: " + err.message);
    }
};
