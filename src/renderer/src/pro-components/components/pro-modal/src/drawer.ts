import type { ExtractPropTypes, PropType } from 'vue';
// import { tabs as antTabsProps } from 'ant-design-vue/lib/tabs';
import type { TabsProps } from 'ant-design-vue/lib/tabs';
import { drawerProps as antDrawerProps } from 'ant-design-vue/lib/drawer';
import { isObject } from '@/utils';
import type { ITabsPane } from './types';

export const drawerProps = {
	...antDrawerProps(),

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
