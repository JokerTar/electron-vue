// import { encrypt, decrypt } from 'crypto-js/aes';
// import { parse } from 'crypto-js/enc-utf8';
// import pkcs7 from 'crypto-js/pad-pkcs7';
// import ECB from 'crypto-js/mode-ecb';
// import md5 from 'crypto-js/md5';
// import UTF8 from 'crypto-js/enc-utf8';
// import Base64 from 'crypto-js/enc-base64';
import { encryptAES, decryptAES } from '../cipher';

export interface EncryptionParams {
	key: string;
	iv: string;
}

export class AesEncryption {
	private key;

	constructor(opt: Partial<EncryptionParams> = {}) {
		const { key } = opt;
		if (key) {
			this.key = key;
		}
	}

	encryptByAES(cipherText: string) {
		return encryptAES(cipherText, this.key);
	}

	decryptByAES(cipherText: string) {
		return decryptAES(cipherText, this.key);
	}
}

// export function encryptByBase64(cipherText: string) {
//   return UTF8.parse(cipherText).toString(Base64);
// }

// export function decodeByBase64(cipherText: string) {
//   return Base64.parse(cipherText).toString(UTF8);
// }

// export function encryptByMd5(password: string) {
//   return md5(password).toString();
// }
