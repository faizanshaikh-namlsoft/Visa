const axios = require('axios');
const config = require('../config/keys');
const fs = require('fs');
const path = require('path');
const https = require('https');

const cert = fs.readFileSync(path.join(__dirname, '../certs/cert.pem'));
const key = fs.readFileSync(path.join(__dirname, '../certs/key_ebbbeda0-1836-44e4-b746-8d364f9102eb.pem'));

exports.processVisaPayment = async (paymentDetails) => {
    const url = 'https://sandbox.api.visa.com/visadirect/fundstransfer/v1/pushfundstransactions';

    const requestBody = {
        "surcharge": "11.2",
        "senderAddress": "901 Metro Center Blvd",
        "pointOfServiceData": {
          "panEntryMode": "90",
          "posConditionCode": "00",
          "motoECIIndicator": "0"
        },
        "recipientPrimaryAccountNumber": "4104920120500001",
        "colombiaNationalServiceData": {
          "addValueTaxReturn": "10.00",
          "taxAmountConsumption": "10.00",
          "nationalNetReimbursementFeeBaseAmount": "20.00",
          "addValueTaxAmount": "10.00",
          "nationalNetMiscAmount": "10.00",
          "countryCodeNationalService": "170",
          "nationalChargebackReason": "11",
          "emvTransactionIndicator": "1",
          "nationalNetMiscAmountType": "A",
          "costTransactionIndicator": "0",
          "nationalReimbursementFee": "20.00"
        },
        "transactionIdentifier": "617020001849971",
        "serviceProcessingType": {
          "requestType": "01"
        },
        "acquiringBin": "408999",
        "retrievalReferenceNumber": "412770451036",
        "systemsTraceAuditNumber": "451018",
        "senderName": "Mohammed Qasim",
        "businessApplicationId": "AA",
        "settlementServiceIndicator": "9",
        "transactionCurrencyCode": "USD",
        "recipientName": "rohan",
        "sourceAmount": "123.12",
        "senderCountryCode": "124",
        "senderAccountNumber": "4104920120500002",
        "amount": "124.05",
        "localTransactionDateTime": new Date().toISOString().replace(/\..+/, ''), // Format as YYYY-MM-DDTHH:mm:ss,
        "purposeOfPayment": "purpose",
        "cardAcceptor": {
          "address": {
            "country": "USA",
            "zipCode": "94404",
            "county": "San Mateo",
            "state": "CA"
          },
          "idCode": "CA-IDCode-77765",
          "name": "Visa Inc. USA-Foster City",
          "terminalId": "TID-9999"
        },
        "senderReference": "",
        "acquirerCountryCode": "840",
        "sourceCurrencyCode": "840",
        "senderCity": "Foster City",
        "senderStateCode": "CA",
        "merchantCategoryCode": "6012",
        "sourceOfFundsCode": "05"
      }

    try {
        console.log('Sending request to Visa API:', JSON.stringify(requestBody, null, 2));

        const response = await axios.post(url, requestBody, {
            headers: {
                'Content-Type': 'application/json'
            },
            auth: {
                username: config.visa.userID,
                password: config.visa.password
            },
            httpsAgent: new https.Agent({
                cert: cert,
                key: key,
                rejectUnauthorized: false // This should be set to true in production
            })
        });

        console.log('Response from Visa API:', response.data);

        return response.data;
    } catch (error) {
        console.error('Visa payment processing failed:', error.response ? error.response.data : error.message);
        throw new Error(`Visa payment processing failed: ${JSON.stringify(error.response ? error.response.data : error.message)}`);
    }
};
