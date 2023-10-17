import type { ExtractPropTypes } from 'vue';
// import { tabs as antTabsProps } from 'ant-design-vue/lib/tabs';
import { drawerProps as antDrawerProps } from 'ant-design-vue/lib/drawer';
import { commonEmits, commonProps } from './common';

export const drawerProps = {
	...antDrawerProps(),

	...commonProps,
};

export const drawerEmits = {
	...commonEmits,
};

export type DrawerProps = Partial<ExtractPropTypes<typeof drawerProps>>;
export type DrawerEmits = typeof drawerEmits;
