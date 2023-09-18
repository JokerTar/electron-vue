import type { App } from 'vue';

import * as components from './components';
export * from './components';

export const install = function (app: App) {
	Object.keys(components).forEach((key) => {
		const component = components[key];
		app.component(key, component);
		// if (component.install) {
		// 	app.use(component);
		// }
	});

	return app;
};

export default {
	version: '0.0.10',
	install,
};
