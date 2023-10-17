import { defineComponent } from 'vue';

export type Component<T = any> = ReturnType<typeof defineComponent> | (() => Promise<typeof import('*.vue')>) | (() => Promise<T>);

export interface RouterMeta {
	title: string;
	keepAlive?: boolean;
	icon?: any;
	permission?: Array<string>;
	target?: string;
	hidden?: boolean;
	hiddenHeaderContent?: boolean;
	hideHeader?: boolean;
	blank?: boolean;
	hideChildrenInMenu?: boolean;
	roles?: string[];
}

export interface Router {
	name: string;
	path: string;
	redirect?: string;
	meta?: RouterMeta;
	component?: Component | string;
	children?: Router[];
	hidden?: boolean;
	hideChildrenInMenu?: boolean;
}
