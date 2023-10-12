import type { ExtractPropTypes, PropType } from 'vue';
// import { tabs as antTabsProps } from 'ant-design-vue/lib/tabs';
import type { TabsProps } from 'ant-design-vue/lib/tabs';
import type { ButtonProps } from 'ant-design-vue/lib/button';
import { drawerProps as antDrawerProps } from 'ant-design-vue/lib/drawer';
import { isObject } from '@/utils';
import type { ITabsPane } from './types';

export const drawerProps = {
	...antDrawerProps(),

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

export const drawerEmits = {
	register: (val: Record<string, any>) => isObject(val),
};

export type DrawerProps = Partial<ExtractPropTypes<typeof drawerProps>>;
export type DrawerEmits = typeof drawerEmits;
