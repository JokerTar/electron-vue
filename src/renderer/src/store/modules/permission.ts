import { ref } from 'vue';
// import store from '@renderer/store'
import { defineStore } from 'pinia';
// import { type RouteRecordRaw } from 'vue-router'
import { constantRoutes, localRouters } from '@renderer/router';
// import asyncRouteSettings from '@renderer/config/async-route'
// import { routerSetting } from '@renderer/settings'
import { Router } from '@renderer/router/types';
import { routerSource } from '@renderer/settings';

// const asyncRouteSettings = {
//   open: true,
//   defaultRoles: ['DEFAULT_ROLE']
// }

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles: string[], route: Router) {
	const routeRoles = route.meta?.roles;
	if (route.meta && routeRoles) {
		// @ts-ignore
		return roles.some((role) => routeRoles.includes(role));
	} else {
		return true;
	}
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
	const res: Router[] = [];

	routes.forEach((route: Router) => {
		const tmp: Router = { ...route };
		if (hasPermission(roles, tmp)) {
			if (tmp.children) {
				tmp.children = filterAsyncRoutes(tmp.children, roles);
			}
			res.push(tmp);
		}
	});

	return res;
}

export function filterMenu(routes) {
	return routes
		.filter((item) => item?.meta?.hidden !== true)
		.map((item) => {
			if (item.children) {
				return {
					...item,
					children: filterMenu(item.children),
				};
			} else {
				return item;
			}
		});
}

export const usePromiseStore = defineStore('permise', () => {
	const routes = ref<Router[]>(constantRoutes);
	const asyncRoutes = ref<Router[]>([]);

	const getMenus = () => {
		return filterMenu(routes.value);
	};

	// 获取远程路由
	const getAsyncRouter = async () => {
		asyncRoutes.value = constantRoutes.concat([]);
		return asyncRoutes.value;
	};

	const generateRoutes = (roles: any[]) => {
		let accessedRoutes: Router[] = [];

		if (routerSource === 'local') accessedRoutes = localRouters;

		if (!roles || roles.includes(1)) {
			accessedRoutes = accessedRoutes.concat(asyncRoutes.value || []);
		} else {
			accessedRoutes = accessedRoutes.concat(filterAsyncRoutes(asyncRoutes.value, roles));
		}

		routes.value = constantRoutes.concat(accessedRoutes);
		return routes.value;
	};

	return {
		getMenus,
		generateRoutes,
		getAsyncRouter,
	};
});
