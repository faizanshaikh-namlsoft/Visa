const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Load your RSA private key from a file
const privateKey = fs.readFileSync(path.join(__dirname, '../certs/key_ebbbeda0-1836-44e4-b746-8d364f9102eb.pem'), 'utf8');

module.exports = (userID) => {
    const header = {
        alg: 'RS256',
        typ: 'JWT'
    };

    const payload = {
        iss: userID,
        exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour expiration
    };

    const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64').replace(/=+$/, '');
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64').replace(/=+$/, '');

    const signature = crypto.createSign('RSA-SHA256').update(`${encodedHeader}.${encodedPayload}`).sign(privateKey, 'base64').replace(/=+$/, '');

    return `${encodedHeader}.${encodedPayload}.${signature}`;
};
