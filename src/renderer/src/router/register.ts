import Router from './index';
import { setupGuard } from './permission';

/**
 * 注册Router
 * @param {object<vue>} app
 */
export const registerRouter = (app) => {
	app.use(Router);
	setupGuard(Router);
};
