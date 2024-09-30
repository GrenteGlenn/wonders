const axios = require('axios');

// migrate to class

class AuthUser {
    constructor() {
    }

    async login(userData, config, API_BASE_URL) {
        console.log('Logging in user...');
        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth`, userData, config);
            //console.log('User registered successfully:', response.data.data);
            return response.data.data;
        } catch (error) {
            // throw this error to the caller
            throw error;
        }
    }

    async refresh(config, API_BASE_URL) {
        console.log('Refreshing token...');
        try {
            const response = await axios.post(`${API_BASE_URL}/api/refresh`, config);
            console.log('User registered successfully:', response.data);
            return response.data;
        } catch (error) {
            // throw this error to the caller
            throw error;
        }
    }

    async register(userData, config, API_BASE_URL) {
        console.log('Registering user...');
        try {
            const response = await axios.post(`${API_BASE_URL}/api/register`, userData, config);
            // console.log('User registered successfully:', response.data);
        } catch (error) {
            // throw this error to the caller
            throw error;
        }
    }
}

module.exports = AuthUser;