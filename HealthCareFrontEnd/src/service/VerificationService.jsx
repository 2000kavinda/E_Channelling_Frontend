import axios from 'axios';

export const VerificationService = async (email) => {
    try {
        const response = await axios.get("http://localhost:8082/api/v1/auth/createverification", {
            params: { email },
        });
        return response;
    } catch (err) {
        throw new Error("Login failed: " + err.message);
    }
};
