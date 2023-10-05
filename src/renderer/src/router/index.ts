import { createRouter, createWebHashHistory } from 'vue-router';
import { Router } from '@renderer/router/types';

const Layouts = () => import('@renderer/layouts/index.vue');

/** 常驻路由 */
export const constantRoutes: Router[] = [
	{
		path: '/',
		name: 'index',
		component: Layouts,
		meta: { title: 'menu.home', icon: 'mail-outlined' },
		redirect: '/dashboard',
		children: [
			// dashboard
			{
				path: '/dashboard',
				name: 'dashboard',
				component: () => import('@renderer/views/dashboard/index.vue'),
				meta: {
					title: 'menu.dashboard.title',
					icon: 'mail-outlined',
					keepAlive: true,
					permission: ['admin'],
				},
			},
			{
				path: '/login',
				name: 'login',
				component: () => import('@renderer/views/login/index.vue'),
				meta: {
					title: 'menu.login.title',
					icon: 'bx-analyse',
					keepAlive: true,
					permission: ['admin'],
					hidden: true,
				},
			},
		],
	},

	{
		path: '/login',
		name: 'login',
		component: () => import('@renderer/views/login/index.vue'),
		meta: {
			title: 'login',
			hidden: true,
		},
	},

	{
		path: '/403',
		name: '403',
		component: () => import('@renderer/views/error-page/403.vue'),
		meta: {
			title: '403',
			hidden: true,
		},
	},
	{
		path: '/404',
		name: '404',
		component: () => import('@renderer/views/error-page/404.vue'),
		meta: {
			title: '404',
			hidden: true,
		},
		// alias: '/:pathMatch(.*)*'
	},
];

/** 本地路由 */
export const localRouters: Router[] = [
	{
		path: '/form',
		name: 'form',
		component: Layouts,
		redirect: '/form/base',
		meta: {
			title: 'pro-form',
			icon: 'form-outlined',
		},
		children: [
			{
				path: 'base',
				name: 'pro-form-name',
				component: () => import('@renderer/views/pro-form/base.vue'),
				meta: {
					title: 'base',
				},
			},

			{
				path: 'base2',
				name: 'target',
				meta: {
					title: 'baidu',
					target: 'http://www.baidu.com',
					blank: true,
				},
			},
		],
	},

	{
		path: '/target',
		name: 'target',
		meta: {
			title: 'baidu2',
			target: 'http://www.baidu.com',
			blank: true,
		},
	},
];

const router = createRouter({
	history: createWebHashHistory(import.meta.env.RENDERER_VITE_PUBLIC_PATH),
	// history: createWebHistory(import.meta.env.RENDERER_VITE_PUBLIC_PATH),
	// @ts-ignore
	routes: [...localRouters, ...constantRoutes],
});

/** 重置路由 */
export function resetRouter() {
	// 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
	try {
		router.getRoutes().forEach((route) => {
			const { name, meta } = route;
			// @ts-ignore
			if (name && meta.roles?.length) {
				router.hasRoute(name) && router.removeRoute(name);
			}
		});
	} catch {
		// 强制刷新浏览器也行，只是交互体验不是很好
		window.location.reload();
	}
}

export default router;
