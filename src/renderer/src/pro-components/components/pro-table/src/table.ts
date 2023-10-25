import type { ExtractPropTypes, PropType } from 'vue';
import type { ColumnType } from 'ant-design-vue/lib/table';
import type { Rule } from 'ant-design-vue/lib/form';
import { tableProps as antTableProps } from 'ant-design-vue/lib/table';
import { formItemProps as antFormItemProps } from 'ant-design-vue/lib/form';
import { isObject } from '@/utils';
import type { FetchConfig } from '../../../hooks/useFetch';
import type { ModalFuncProps } from 'ant-design-vue/lib/modal/Modal';
import type { FormProps } from '../../index';

export const formItemProps = {
	...antFormItemProps(),
};

export interface IAction {
	type?: 'button' | 'dropdown';
	label?: string;
	onClick?: (record: Record<string, any>, index: number) => void;
	isShow?: (record: Record<string, any>) => boolean;
	popConfirm?: ModalFuncProps;
	props?: Record<string, any>;
	auth?: string;
	items?: Partial<Omit<IAction, 'type' | 'items'>>[];
}

export interface IExtarColumns {
	type?: 'input' | 'select' | 'image' | 'link' | 'tag' | 'index' | 'option';
	rules?: Rule[];
	props?: Record<string, any>;
	formItemProps?: Partial<typeof formItemProps>;

	edit?: IExtarColumns;
	copyable?: boolean;
	actions?: IAction[];
}

const defaultAntTableProps = antTableProps();

export const tableProps = {
	...defaultAntTableProps,

	fetch: {
		type: Object as PropType<FetchConfig>,
	},

	columns: {
		type: Array as PropType<(ColumnType & IExtarColumns)[]>,
	},

	rootName: {
		type: String,
	},

	name: {
		type: String,
	},

	immediate: {
		type: Boolean,
		default: true,
	},

	searchForm: {
		type: Object as PropType<FormProps>,
	},
};

export const tableEmits = {
	'update:value': (val: Record<string, any>) => isObject(val),
	register: (val: Record<string, any>) => isObject(val),
};

export type TableProps = Partial<ExtractPropTypes<typeof tableProps>>;
export type TableEmits = typeof tableEmits;
