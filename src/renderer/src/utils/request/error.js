import { message as Message } from 'ant-design-vue';
// import { useMessage } from '../../hooks/web/useMessage'

/**
 * @desc 正在展示的错误提示
 * @type {{}}
 */
const exhibition = {};

/**
 * @description 提取错误信息
 * @param error
 * @returns {string|*}
 */
export const getErrorMessage = (error) => {
	if (error && error.response) {
		const { status } = error.response;

		switch (status) {
			case 400:
				error.message = '错误请求';
				break;
			case 401:
				error.message = '未授权，请重新登录';
				break;
			case 403:
				error.message = '拒绝访问';
				break;
			case 404:
				error.message = '请求错误,未找到该资源';
				break;
			case 405:
				error.message = '请求方法未允许';
				break;
			case 408:
				error.message = '请求超时';
				break;
			case 500:
				error.message = '服务器端错误';
				break;
			case 501:
				error.message = '网络未实现';
				break;
			case 502:
				error.message = '网络错误';
				break;
			case 503:
				error.message = '服务不可用';
				break;
			case 504:
				error.message = '网络超时';
				break;
			case 505:
				error.message = 'http版本不支持该请求';
				break;
			default:
				error.message = `未知错误${error.response.status}`;
		}
	} else {
		error.message = '连接到服务器失败';
	}

	return error.message;
};

/**
 * @desc 显示错误信息提示
 * @param code
 * @param content
 * @param callback
 */
// eslint-disable-next-line no-unused-vars
export const showErrorMessage = (code, message, callback) => {
	// const { createMessage, createErrorModal } = useMessage()

	if (!exhibition[code]) {
		// 避免重复错误提示处理
		exhibition[code] = true;
		if (code === 9000) {
			Message({
				content: '很抱歉，登录已过期，请重新登录！',
				afterClose: () => {
					delete exhibition[code];
					callback && callback();
				},
			});
		} else {
			Message.error(message, () => {
				delete exhibition[code];
				callback && callback();
			});
		}
	}
};
