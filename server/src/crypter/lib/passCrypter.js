const crypto = require('crypto');
const config = require('./../../../config/config');

const algorithm = config.local.passCrypter.algorithm;
const key = config.local.passCrypter.key;
const iv = config.local.passCrypter.iv

module.exports.encrypt = function (plainTtext) {
 let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
 let encrypted = cipher.update(plainTtext);
 encrypted = Buffer.concat([encrypted, cipher.final()]);
 return encrypted.toString('hex');
}

module.exports.decrypt = function (cipherText) {
 let encryptedText = Buffer.from(cipherText, 'hex');
 let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
 let decrypted = decipher.update(encryptedText);
 decrypted = Buffer.concat([decrypted, decipher.final()]);
 return decrypted.toString();
}
