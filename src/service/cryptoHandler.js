const CryptoJS = require('crypto-js');

const encrypt = (text) => {
  return CryptoJS.AES.encrypt(
    text,
    process.env.ENCRIPTATION_KEY || '1234'
  ).toString();
};

const decrypt = (text) => {
  return CryptoJS.AES.decrypt(
    text,
    process.env.ENCRIPTATION_KEY || '1234'
  ).toString(CryptoJS.enc.Utf8);
};

module.exports = {
  encrypt,
  decrypt,
};
