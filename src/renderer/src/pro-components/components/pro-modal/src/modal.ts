import type { ExtractPropTypes, PropType } from 'vue';
// import { tabs as antTabsProps } from 'ant-design-vue/lib/tabs';
import type { TabsProps, TabPane } from 'ant-design-vue/lib/tabs';

export interface ITabsPane {
	tabsPane?: {
		key: string;
		children?: typeof TabPane;
	}[];
}

export const modalProps = {
	title: {
		type: String,
	},

	closable: {
		type: Boolean,
		default: true,
	},

	tabs: {
		type: Object as PropType<TabsProps & ITabsPane>,
	},
};

export const modalEmits = {};

export type ModalProps = ExtractPropTypes<typeof modalProps>;
export type ModalEmits = typeof modalEmits;
