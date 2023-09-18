// import Cookies from 'js-cookie';
import { createLocalStorage } from './index';

const options = {
	timeout: 60 * 60 * 24 * 365, // 保存一年
};

const TokenKey = 'Admin-Token';

export function getToken() {
	return createLocalStorage(options).get(TokenKey);
	// return Cookies.get(TokenKey);
}

export function setToken(token: string) {
	return createLocalStorage(options).set(TokenKey, token);

	// return Cookies.set(TokenKey, token);
}

export function removeToken() {
	return createLocalStorage(options).remove(TokenKey);
	// return Cookies.remove(TokenKey);
}
