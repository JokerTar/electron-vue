import { reactive } from 'vue';
import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', () => {
	/** 状态对象 */
	const state = reactive({
		cacheTagsView: [],
	});

	const changeSetting = (key, val) => {
		state[key] = val;
	};

	/** 获取要缓存的数据：将 state 对象转化为 settings 对象 */
	const getCacheData = () => {
		const settings = {};
		for (const [key, value] of Object.entries(state)) {
			// @ts-ignore
			settings[key as SettingsStoreKey] = value.value;
		}
		return settings;
	};

	return {
		...state,
		changeSetting,
		getCacheData,
	};
});
