const CryptoJS = require('crypto-js');

export default class CryptoHandler {
  public static encrypt = (text: string): string => {
    return CryptoJS.AES.encrypt(text, 'Constants.ENCRIPTATION_KEY', {
      iv: 'Constants.INIT_VECTOR',
    }).toString();
  };

  public static decrypt = (text: string): string => {
    return CryptoJS.AES.decrypt(text, 'Constants.ENCRIPTATION_KEY', {
      iv: 'Constants.INIT_VECTOR',
    }).toString(CryptoJS.enc.Utf8);
  };
}
