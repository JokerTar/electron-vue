// import { isDevMode } from '/../env';

// 缓存时间，默认设置为7天
export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

// aes encryption key
export const cacheCipher = {
	key: '!_1111000001111@',
	iv: '@1111100001111_!',
};

// Whether the system cache is encrypted using aes
// export const enableStorageEncryption = process.env.NODE_ENV === 'production';
