// import permission from './_permission';
// import * as directives from 'dh-core/lib/directives'

// // https://webpack.js.org/guides/dependency-management/#require-context
// const requireComponent = require.context(
//   // Look for files in the current directory
//   '.',
//   // Do not look in subdirectories
//   true,
//   // 指令仅收录index.*
//   /index.*$/
// )

// // 注册全局指令
// // directive.forEach(item => {
// //     Vue.use(item)
// // })
// export const registerDirectives = (app) => {
//   // 注册本地自定义指令
//   requireComponent.keys().forEach((fileName) => {
//     const componentConfig = requireComponent(fileName)
//     app.use(componentConfig.default)
//   })

//   // 注册框架预置指令
//   const directiveNames = Object.keys(directives)
//   console.log('directives[name]', directives, directives['auth'])
//   if (directiveNames?.length) {
//     directiveNames.forEach((name) => app.use(directives[name]))
//   }
// }

// export default directives
export const registerDirectives = (app) => {
	// 注册本地自定义指令
	const directives = {};
	const files = import.meta.globEager('./*/index.js');
	Object.keys(files).forEach((fileName) => {
		const name = fileName.replace(/\.\/|\.ts/g, '');
		directives[name] = files[fileName].default;
		app.use(files[fileName].default);
	});
};
