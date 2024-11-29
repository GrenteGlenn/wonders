const axios = require('axios');

class userUser {
    constructor() {
    }

    async get_users(config, API_BASE_URL) {
        console.log('Getting users...');
        try {
            const response = await axios.get(`${API_BASE_URL}/api/users`, config);
            // console.log('Users:', response.data);
            return response.data;
        } catch (error) {
            // throw this error to the caller
            throw error;
        }
    }

    async get_user(config, API_BASE_URL, id) {
        console.log('Getting user...');
        try {
            const response = await axios.get(`${API_BASE_URL}/api/users/${id}`, config);
            // console.log('User:', response.data.user);
            return response.data.user;
        } catch (error) {
            // throw this error to the caller
            throw error;
        }
    }

    async update_user(config, API_BASE_URL, id, userData) {
        console.log('Updating user...');
        try {
            const response = await axios.put(`${API_BASE_URL}/api/users/${id}`, userData, config);
            // console.log('User updated successfully:', response.data);
            return response.data;
        } catch (error) {
            // throw this error to the caller
            throw error;
        }
    }

    async delete_user(config, API_BASE_URL, id) {
        console.log('Deleting user...');
        try {
            const response = await axios.delete(`${API_BASE_URL}/api/users/${id}`, config);
            // console.log('User deleted successfully:', response.data);
            return response.data;
        } catch (error) {
            // throw this error to the caller
            throw error;
        }
    }
}

module.exports = userUser;