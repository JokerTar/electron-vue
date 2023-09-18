import qs from 'qs';
import { unref } from 'vue';
import store from '@renderer/store';
import { promptError, authFailPath, routeWhiteList } from '@renderer/settings';
import { getErrorMessage, showErrorMessage } from './error';
import { getToken } from '../auth';
// import { getSignParam } from '../cipher';
import router from '@renderer/router';
// import { createLocalStorage } from '../cache'
// import { PLATFORM_APP_TYPE } from '../../enums/cacheEnum';

// const ls = createLocalStorage()
/**
 * @description 请求前config配置处理
 * @param config
 * @returns {{data}|*}
 */
export const requestFulfilled = (config) => {
	if (config.data && config.headers['Content-Type'].includes('application/x-www-form-urlencoded') && typeof config.data !== 'string')
		config.data = qs.stringify(config.data);

	// 设置默认提示错误
	if (typeof config.promptError == 'undefined') {
		config.promptError = promptError;
	}

	// const uri = config.url.replace(config.baseURL, '');
	// const _token = store.getters['user/accessToken'];

	// 设置header参数
	config.headers = {
		...config.headers,
		// ...getSignParam(),
		// Authorization: getToken(),
		Authorization: getToken(),
		// App: ls.get(PLATFORM_APP_TYPE), // 应用类型
	};

	return config;
};

/**
 * @description 请求发起前异常处理
 * @param error
 * @returns {Promise<never>}
 */
export const requestRejected = (error) => {
	return Promise.reject(error);
};

/**
 * @description 请求发起后返回成功处理
 * @param response
 * @returns {*}
 */
export const responseFulfilled = (response) => {
	const { data, config } = response;
	const { code, message } = data;
	if (code === 10001) {
		// 10001参数错误，则由外部处理状态
		if (config.promptError) {
			const messages = [];
			Object.values(data?.data)?.forEach((errMsgs) => messages.push(errMsgs.join(',')));
			showErrorMessage(code, messages.length ? messages.join('\n') : message);
		}
		return Promise.reject(response);
	} else if (!config.promptError) {
		// 配置不提示错误或者为10001参数错误，则由外部处理状态
		return response;
	} else if (code === 0) {
		// 正常请求
		return data.data;
	} else if (code === 403 && config.promptError) {
		// 登录态失效
		const { path } = unref(router.currentRoute);
		store.dispatch('user/clearAuth');
		if (!routeWhiteList.includes(path)) {
			// 非白名单router页面需要登录
			showErrorMessage(code, message, () => {
				router.push({
					path: authFailPath,
					query: {
						redirect: encodeURIComponent(router.currentRoute.value.fullPath),
					},
				}); // 后续补充登录成功回调
			});
		}

		return Promise.reject(data);
	} else {
		showErrorMessage(code, message);
		return Promise.reject(data);
	}
};

/**
 * @description 请求发起后异常处理
 * @param error
 * @returns {Promise<never>}
 */
export const responseRejected = (error) => {
	let promptError = false;
	if (error && error.response) {
		promptError = error.config.promptError;
	}

	if (promptError) {
		const code = error.response.status;
		const errorMessage = getErrorMessage(error);
		showErrorMessage(code, errorMessage);
	}

	/*  if (error.response.status == 401) {
    console.log('登陆失效，正在进入登录页...');
    store.dispatch('user/logout');
    if (!routeWhiteList.includes(router.currentRoute.value.path)) {
      setTimeout(() => router.push(authFailPath), 1000);
    }
  }*/

	return Promise.reject(error);
};
