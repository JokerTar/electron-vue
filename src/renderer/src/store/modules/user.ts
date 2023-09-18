import { ref } from 'vue';
import store from '@renderer/store';
import { defineStore } from 'pinia';
import { usePromiseStore } from './permission';
import { useTagsViewStore } from './tags-view';
import { useSettingsStore } from './settings';
import { getToken, removeToken, setToken } from '@renderer/utils';
import router, { resetRouter } from '@renderer/router';
import { login as loginServer, queryUserInfo } from '@renderer/services/user';

export const useUserStore = defineStore('user', () => {
	const userInfo = ref<any>({});
	const token = ref<string>(getToken() || '');
	const roles = ref<string[]>([]);
	const username = ref<string>('');

	const permissionStore = usePromiseStore();
	const tagsViewStore = useTagsViewStore();
	const settingsStore = useSettingsStore();

	/** 设置角色数组 */
	const setRoles = (value: string[]) => {
		roles.value = value;
	};
	/** 登录 */
	const login = async ({ username, password, captcha, key }) => {
		const result = await loginServer({ username, password, captcha, key });
		setToken(result.access_token);
		token.value = result.access_token;
		return result.access_token;
	};
	/** 获取用户详情 */
	const getInfo = async () => {
		const result = await queryUserInfo();
		userInfo.value = result.user;
		username.value = result.user?.username;
		// 验证返回的 roles 是否为一个非空数组，否则塞入一个没有任何作用的默认角色，防止路由守卫逻辑进入无限循环
		roles.value = result.user?.role_ids?.length > 0 ? result.user?.role_ids : [];

		return userInfo.value;
	};
	/** 切换角色 */
	const changeRoles = async (role: string) => {
		const newToken = 'token-' + role;
		token.value = newToken;
		setToken(newToken);
		await getInfo();
		resetRouter();

		const accessRoutes = permissionStore.generateRoutes(roles.value);
		accessRoutes.forEach((route) => {
			// @ts-ignore
			router.addRoute(route);
		});
		_resetTagsView();
	};
	/** 登出 */
	const logout = () => {
		removeToken();
		token.value = '';
		roles.value = [];
		resetRouter();
		_resetTagsView();
	};
	/** 重置 Token */
	const resetToken = () => {
		removeToken();
		token.value = '';
		roles.value = [];
	};
	/** 重置 Visited Views 和 Cached Views */
	const _resetTagsView = () => {
		if (!settingsStore.cacheTagsView) {
			tagsViewStore.delAllVisitedViews();
			tagsViewStore.delAllCachedViews();
		}
	};

	return { getToken, roles, username, setRoles, login, getInfo, changeRoles, logout, resetToken };
});

/** 在 setup 外使用 */
export function useUserStoreHook() {
	return useUserStore(store);
}
