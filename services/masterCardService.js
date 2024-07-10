const axios = require('axios');
const config = require('../config/keys');

exports.processMasterCardPayment = async (paymentDetails) => {
    try {
        const response = await axios.post('https://sandbox.api.mastercard.com/v1/payments', paymentDetails, {
            headers: {
                'Authorization': `Basic ${Buffer.from(config.masterCard.apiKey + ':' + config.masterCard.apiSecret).toString('base64')}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`MasterCard payment processing failed: ${error.response ? error.response.data : error.message}`);
    }
};
