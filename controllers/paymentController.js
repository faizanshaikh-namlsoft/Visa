const visaService = require('../services/visaService');

exports.processPayment = async (req, res) => {
    try {
        const paymentDetails = req.body;
        const result = await visaService.processVisaPayment(paymentDetails);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
