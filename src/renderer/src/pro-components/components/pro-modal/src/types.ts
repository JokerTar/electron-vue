import type { TabPaneProps } from 'ant-design-vue/lib/tabs';

export interface ITabsPane {
	tabsPane?: (TabPaneProps & { children?: { type: string; props?: Record<string, any> } })[];
	value?: string | number;
	children?: {
		type: string;
		props?: Record<string, any>;
	};
}
