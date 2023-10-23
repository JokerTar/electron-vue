import request from '@/utils/request';
import { ref, Ref } from 'vue';
import { isFunction, isObject, get } from 'lodash-es';
import { isPromise } from '@/utils';

export interface FetchConfig {
	url: string;
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'patch';
	// data?: Record<string, any>;
	params?: Record<string, any>;
	beforeFetch?: (params: Record<string, any>) => any;
	afterFetch?: (params: Record<string, any>) => any;
	getPath?: string;
	to?: string;
}

interface IResponse {
	dataRef: Ref;
	reload: (fetchQuery?: Record<string, any>) => void;
	getData: () => any;
}

export function useFetch(props: FetchConfig | string): IResponse {
	// debugger;
	const dataRef: Ref<any> = ref();

	const getData = (): any => {
		return dataRef.value;
	};

	const reload = async (params?: Record<string, any>): Promise<void> => {
		await fetchData(params);
	};

	const fetchData = async (fetchQuery?: Record<string, any>): Promise<void> => {
		let result: any;

		if (isObject(props)) {
			// @ts-ignore
			const { url, method = 'GET', params, afterFetch, beforeFetch, getPath }: FetchConfig = props;

			let fetchQueryData: Record<string, any> | undefined | false = Object.assign(params || {}, fetchQuery);
			if (beforeFetch && isFunction(beforeFetch)) {
				if (isPromise(beforeFetch)) {
					try {
						fetchQueryData = await beforeFetch(params || {});
					} catch (error) {
						fetchQueryData === false;
					}
				} else {
					fetchQueryData = beforeFetch(params || {});
				}

				// 阻止继续查询
				if (fetchQueryData === false) return;
			}

			result = await request.request({
				url,
				method,
				data: fetchQueryData,
				params,
			});

			result = getPath ? get(result, getPath) : result;

			if (afterFetch && isFunction(afterFetch)) {
				dataRef.value = afterFetch(result);
			} else {
				dataRef.value = result;
			}
		} else {
			result = await request.get(props);
			dataRef.value = result;
		}
	};

	return {
		dataRef,
		reload,
		getData,
	};
}
