import { cacheCipher } from './encryptionSetting';

import type { EncryptionParams } from './cipher';

import { AesEncryption } from './cipher';

import { isNullOrUnDef, isNumber } from '../index';

export interface CreateStorageParams extends EncryptionParams {
	prefixKey: string;
	storage: Storage;
	isEncrypt: boolean;
	timeout?: number | null;
}

export const createStorage = ({
	prefixKey = '',
	storage = sessionStorage,
	key = cacheCipher.key,
	iv = cacheCipher.iv,
	timeout = null,
	isEncrypt = true,
}: Partial<CreateStorageParams> = {}) => {
	if (isEncrypt && [key.length, iv.length].some((item) => item !== 16)) {
		throw new Error('When isEncrypt is true, the key or iv must be 16 bits!');
	}

	const encryption = new AesEncryption({ key });

	/**
	 *Cache class
	 *Construction parameters can be passed into sessionStorage, localStorage,
	 * @class Cache
	 * @example
	 */
	const WebStorage = class WebStorage {
		storage: Storage;
		prefixKey?: string;
		encryption: AesEncryption;
		isEncrypt: boolean;
		/**
		 *
		 * @param {*} storage
		 */
		constructor() {
			this.storage = storage;
			this.prefixKey = prefixKey;
			this.encryption = encryption;
			this.isEncrypt = isEncrypt;
		}

		public getKey(key: string) {
			return `${this.prefixKey}${key}`.toUpperCase();
		}

		/**
		 *
		 *  Set cache
		 * @param {string} key
		 * @param {*} value
		 * @expire Expiration time in seconds
		 * @memberof Cache
		 */
		public set(key: string, value: any, expire: number | null = timeout) {
			const stringData = JSON.stringify({
				value,
				time: Date.now(),
				expire: expire && isNumber(expire) ? new Date().getTime() + expire * 1000 : null,
			});
			const stringifyValue = this.isEncrypt ? this.encryption.encryptByAES(stringData) : stringData;
			this.storage.setItem(this.getKey(key), stringifyValue);
		}

		/**
		 *Read cache
		 * @param {string} key
		 * @memberof Cache
		 */
		public get(key: string, def: any = null): any {
			const val = this.storage.getItem(this.getKey(key));
			if (!val) return def;

			try {
				const decVal = this.isEncrypt ? this.encryption.decryptByAES(val) : val;
				const data = JSON.parse(decVal);
				const { value, expire } = data;
				if (isNullOrUnDef(expire) || expire >= new Date().getTime()) {
					return value;
				}
				this.remove(key);
			} catch (e) {
				return def;
			}
		}

		/**
		 * Delete cache based on key
		 * @param {string} key
		 * @memberof Cache
		 */
		public remove(key: string) {
			this.storage.removeItem(this.getKey(key));
		}

		/**
		 * Delete all caches of this instance
		 */
		public clear(): void {
			this.storage.clear();
		}
	};
	return new WebStorage();
};
