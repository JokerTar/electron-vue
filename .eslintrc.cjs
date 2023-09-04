module.exports = {
	root: true,
	// 设置我们的运行环境为浏览器 + es2021 + node ,否则eslint在遇到 Promise，window等全局对象时会报错
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	// 继承eslint推荐的规则集，vue基本的规则集，typescript的规则集
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:vue/vue3-essential',
		//1.继承.prettierrc.js文件规则2.开启rules的 "prettier/prettier": "error"3.eslint fix的同时执行prettier格式化
		'plugin:prettier/recommended',
	],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	// 新增，解析vue文件
	parser: 'vue-eslint-parser',
	// 支持ts的最新语法
	parserOptions: {
		ecmaVersion: 'latest',
		parser: '@typescript-eslint/parser',
		sourceType: 'module',
	},
	// 添加vue和@typescript-eslint插件，增强eslint的能力
	plugins: ['@typescript-eslint', 'vue'],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? ['error', { allow: ['error', 'warn'] }] : 'off', //生产模式不允许使用log
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', //生产默认不允许使用debugger
		'@typescript-eslint/no-explicit-any': 'off', // 允许ts使用any
	},
};
