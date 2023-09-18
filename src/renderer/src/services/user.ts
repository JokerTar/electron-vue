import request from '@renderer/utils/request';

export enum Api {
	captcha = '/admin/captcha/default',
	login = '/admin/login',
	userInfo = '/admin/user/info/show',
	permission = '/admin/user/permission/show',
	menus = '/admin/user/permission/show',
	logout = '/admin/logout',
}

/**
 * @description 图形验证码
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const captcha = (params) => {
	return request.get(Api.captcha, params, {
		// promptError: false,
	});
};

/**
 * @description 登录
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const login = (params) => {
	return request.post(Api.login, params, {
		// promptError: false,
	});
};

/**
 * @desc 查询用户信息
 * @returns {Promise<AxiosResponse<any>>}
 */
export const queryUserInfo = () => {
	return request.get(Api.userInfo, {
		// promptError: false,
	});
};

export const queryUserPermissions = () => {
	return request.get(Api.permission);
};

/**
 * @description 查询用户菜单列表
 * @returns
 */
export const queryUserMenus = () => {
	return request.get(Api.menus);
};

/**
 * @desc 登出
 * @returns {Promise<AxiosResponse<any>>}
 */
export const logout = () => {
	return request.post(Api.logout);
};
