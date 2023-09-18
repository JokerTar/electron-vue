// import router from '@renderer/router'
// import { type RouteRecordRaw } from 'vue-router'
// import { useUserStoreHook } from '@renderer/store/modules/user'
import { Router } from '@renderer/router/types';
import { message } from 'ant-design-vue';
import { useUserStore } from '@renderer/store/modules/user';
import { routerSource, routeWhiteList } from '@renderer/settings';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// @ts-ignore
import { usePromiseStore } from '@renderer/store/modules/permission';

export function setupGuard(router) {
	NProgress.configure({ showSpinner: false });

	router.beforeEach(async (to, _from, next) => {
		NProgress.start();
		// const userStore = useUserStoreHook()
		const { generateRoutes, getAsyncRouter } = usePromiseStore();
		const { getToken, roles: userStoreRoles, getInfo, resetToken } = useUserStore();

		// 判断该用户是否登录
		if (getToken()) {
			if (to.path === '/login') {
				// 如果已经登录，并准备进入 Login 页面，则重定向到主页
				next({ path: '/' });
				NProgress.done();
			} else {
				// 检查用户是否已获得其权限角色
				if (userStoreRoles.length === 0) {
					try {
						let accessRoutes: Router[] = [];
						// 注意：角色必须是一个数组！ 例如: ['admin'] 或 ['developer', 'editor']
						await getInfo();

						if (routerSource === 'server') {
							// 根据角色生成可访问的 Routes（可访问路由 = 常驻路由 + 有访问权限的动态路由）
							await getAsyncRouter();
							accessRoutes = generateRoutes(userStoreRoles);
						} else {
							// 没有开启动态路由功能，则启用默认角色
							accessRoutes = generateRoutes(userStoreRoles);
						}

						// 将'有访问权限的动态路由' 添加到 Router 中
						accessRoutes.forEach((route) => {
							router.addRoute(route);
						});
						// 确保添加路由已完成
						// 设置 replace: true, 因此导航将不会留下历史记录
						next({ ...to, replace: true });
					} catch (err: any) {
						// 过程中发生任何错误，都直接重置 Token，并重定向到登录页面
						resetToken();
						message.error(err.message || '路由守卫过程发生错误');
						next('/login');
						NProgress.done();
					}
				} else {
					next();
				}
			}
		} else {
			// next()
			// 如果没有 Token
			if (routeWhiteList.includes(to.path)) {
				// 如果在免登录的白名单中，则直接进入
				next();
			} else {
				// 其他没有访问权限的页面将被重定向到登录页面
				next('/login');
				NProgress.done();
			}
		}
	});

	router.afterEach(() => {
		NProgress.done();
	});
}
