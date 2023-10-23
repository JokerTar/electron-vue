import type { TabPaneProps } from 'ant-design-vue/lib/tabs';

export interface ITabsPane<T> {
	tabsPane?: (TabPaneProps & {
		children?: T;
	})[];
	value?: string | number;
	children?: T;
}
