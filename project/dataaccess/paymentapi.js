const axios = require('axios');

async function processPayment() {
    try {
        const response = await axios.post(`http://localhost:4500/api/pay`);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

module.exports = {
    processPayment
};