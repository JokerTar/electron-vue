import type { ExtractPropTypes, PropType } from 'vue';
// import { tabs as antTabsProps } from 'ant-design-vue/lib/tabs';
import type { TabsProps } from 'ant-design-vue/lib/tabs';
import { modalProps as antModalProps } from 'ant-design-vue/lib/modal/Modal';
import { isObject } from '@/utils';
import type { ITabsPane } from './types';

export const modalProps = {
	...antModalProps(),

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

export const modalEmits = {
	register: (val: Record<string, any>) => isObject(val),
};

export type ModalProps = Partial<ExtractPropTypes<typeof modalProps>>;
export type ModalEmits = typeof modalEmits;
