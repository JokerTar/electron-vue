import request from '@renderer/utils/request';

export enum Api {
	dictItemDetail = '/admin/dict/dict/show',
	systemSetting = '',
	queryOptions = '',
	upload = '',
	uploadMaterial = '',
	pageConfig = '/admin/config/page/show',
}

export const fetchDict = (params) => {
	return request.get(Api.dictItemDetail, { params });
};
// 获取系统设置
export const fetchSetting = () => {
	return request.get(Api.systemSetting);
};
// 请求选项列表
export const fetchOptions = (params) => {
	return request.post(Api.queryOptions, params);
};

// 获取页面配置
export const fetchPageConfig = (params) => {
	return request.get(Api.pageConfig, { params });
};
