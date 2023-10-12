import { createStorage as create, CreateStorageParams } from './storageCache';
import { DEFAULT_CACHE_TIME } from './encryptionSetting';
// import { shortName, version } from '@/settings'

export type Options = Partial<CreateStorageParams>;
// const prefixKey = `${shortName.toLocaleUpperCase()}_V${version}_`
const prefixKey = '';

const createOptions = (storage: Storage, options: Options = {}): Options => {
	return {
		// No encryption in debug mode
		isEncrypt: false,
		storage,
		prefixKey,
		...options,
	};
};

export const WebStorage = create(createOptions(sessionStorage));

export const createStorage = (storage: Storage = sessionStorage, options: Options = {}) => {
	return create(createOptions(storage, options));
};

export const createSessionStorage = (options: Options = {}) => {
	return createStorage(sessionStorage, {
		timeout: DEFAULT_CACHE_TIME,
		...options,
	});
};

export const createLocalStorage = (options: Options = {}) => {
	return createStorage(localStorage, {
		timeout: DEFAULT_CACHE_TIME,
		...options,
	});
};

export default WebStorage;
