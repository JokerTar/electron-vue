//缓存路由的最大数量
export const keepAliveMaxNum = 99;

//路由模式，可选值为 history 或 hash
export const routerMode = 'hash';

// 鉴权成功跳转route（平台首页）
export const authSuccessPath = '/';

// 鉴权失败跳转route（登陆页）
export const authFailPath = '/login';

// 空页面跳转route（404页）
export const notFoundPath = '/404';

// 错误页
export const errorPagePath = '/500';

// 中转页
export const redirectPath = '/redirect';
export const redirectName = 'Redirect';

// 首页route
export const homePath = '/';

//路由白名单列表，无需鉴权
export const routeWhiteList = [
	'/403',
	'/404',
	'/error/*',
	'/website-*',
	'/transit/(callback|login)',
	'/login',
	'/demo',
];

//Token失效回退到登录页时是否记录当前页路由
export const routeRemember = true;

//路由来源：local本地生成  server服务端拉取  constant基本路由配置，默认server
export const routerSource: 'local' | 'server' | 'constant' = 'local';

//是否验证路由权限，默认true
export const routeVerification = true;

//是否开启角色控制
export const routeRolesControl = false;
