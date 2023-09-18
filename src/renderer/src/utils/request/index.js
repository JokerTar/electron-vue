/**
 * 基本业务服务请求
 */
import axios from 'axios';
// import { getAccessToken } from '../storage';
// import { contentType, requestTimeout } from '@/settings';
import { contentType, requestTimeout } from '@renderer/settings';
// import { getAuthCache } from 'dh-core/lib/utils/auth'
// import { CHANNEL_CACHE_KEY } from 'dh-core/lib/enums/cacheEnum'

import { requestFulfilled, requestRejected, responseFulfilled, responseRejected } from './supply';

/**
 * @description axios初始化
 */
const instance = axios.create({
	baseURL: import.meta.env.RENDERER_VITE_BASE_URL,
	timeout: requestTimeout,
	// withCredentials: true,
	headers: {
		'Content-Type': contentType,
	},
});

/**
 * @description axios请求拦截器
 */
instance.interceptors.request.use(
	(config) => {
		const cfg = requestFulfilled(config);
		// cfg.headers.Pipeline = getAuthCache(CHANNEL_CACHE_KEY)
		// ...
		return cfg;
	},
	(error) => {
		const res = requestRejected(error);

		// ...
		return res;
	}
);

/**
 * @description axios响应拦截器
 */
instance.interceptors.response.use(
	(response) => {
		const res = responseFulfilled(response);

		// ...
		return res;
	},
	(error) => {
		const res = responseRejected(error);

		// ...
		return res;
	}
);

export default instance;
