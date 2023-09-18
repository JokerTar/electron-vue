import copy from './copy';

/**
 * v-copy 指令
 */
export default {
	// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
	install: (app, _options) => {
		app.directive('copy', copy); // 注册全局指令
	},
};
