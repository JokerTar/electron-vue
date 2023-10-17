import type { PropType } from 'vue';
import type { TabsProps } from 'ant-design-vue/lib/tabs';
import type { ButtonProps } from 'ant-design-vue/lib/button';
import { isNumber, isObject, isString } from '@/utils';
import type { ITabsPane } from './types';

export const commonProps = {
	showCancelBtn: {
		type: Boolean,
		default: true,
	},

	cancelText: {
		type: String,
		default: '取消',
	},

	cancelBtnProps: {
		type: Object as PropType<ButtonProps>,
		default: {
			type: '',
		},
	},

	cancelFn: {
		type: Function as PropType<() => Promise<any>>,
	},

	showOkBtn: {
		type: Boolean,
		default: true,
	},

	okText: {
		type: String,
		default: '确定',
	},

	okBtnProps: {
		type: Object as PropType<ButtonProps>,
		default: {
			type: 'primary',
		},
	},

	okFn: {
		type: Function as PropType<() => Promise<any>>,
	},

	closable: {
		type: Boolean,
		default: true,
	},

	width: {
		type: [String, Number],
		default: 480,
	},

	tabs: {
		type: Object as PropType<TabsProps & ITabsPane>,
	},
};

export const commonEmits = {
	register: (val: Record<string, any>) => isObject(val),
	tabsChange: (val: string | number) => isString(val) || isNumber(val),
};
