import { resolve } from 'path';
import { defineConfig, externalizeDepsPlugin, loadEnv } from 'electron-vite';
import vue from '@vitejs/plugin-vue';
// import path from 'path'

/** @type {import('vite').UserConfig} */
export default defineConfig(({ command, mode }) => {
	console.log('command', command);
	console.log('mode', loadEnv(mode));
	console.log('mode', mode);
	const { RENDERER_VITE_BASE_URL, RENDERER_VITE_BASE_API } = loadEnv(mode);

	console.log('代理地址', RENDERER_VITE_BASE_URL);

	return {
		main: {
			plugins: [externalizeDepsPlugin()],
		},
		preload: {
			plugins: [externalizeDepsPlugin()],
		},
		renderer: {
			resolve: {
				alias: {
					'@renderer': resolve('src/renderer/src'),
					'@': resolve('src/renderer/src'),
				},
			},
			plugins: [vue()],
		},

		server: {
			hmr: {
				overlay: false,
			},
			proxy: {
				// 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
				[RENDERER_VITE_BASE_API]: {
					// target: 'http://jsonplaceholder.typicode.com',
					target: RENDERER_VITE_BASE_URL,
					changeOrigin: true,
					port: 9527,
					// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
					rewrite: (pathApi) => pathApi.replace(/^\/api/, ''),
				},
				// 代理 websockets 或 socket.io 写法：ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
				'/socket.io': {
					target: 'ws://localhost:5174',
					ws: true,
				},
			},
		},

		css: {
			preprocessorOptions: {
				less: {
					javascriptEnabled: true,
				},
			},
		},
	};
});
