import type { ExtractPropTypes, PropType } from 'vue';
// import { tabs as antTabsProps } from 'ant-design-vue/lib/tabs';
import type { TabsProps, TabPaneProps } from 'ant-design-vue/lib/tabs';
import { modalProps as antModalProps } from 'ant-design-vue/lib/modal/Modal';
import { isObject } from '@/utils';

export interface ITabsPane {
	tabsPane?: TabPaneProps[];
}

export const modalProps = {
	...antModalProps(),

	tabs: {
		type: Object as PropType<TabsProps & ITabsPane>,
	},
};

export const modalEmits = {
	register: (val: Record<string, any>) => isObject(val),
};

export type ModalProps = Partial<ExtractPropTypes<typeof modalProps>>;
export type ModalEmits = typeof modalEmits;
