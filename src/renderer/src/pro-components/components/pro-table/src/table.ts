import type { ExtractPropTypes, PropType } from 'vue';
import type { ColumnType } from 'ant-design-vue/lib/table';
import type { Rule } from 'ant-design-vue/lib/form';
import { tableProps as antTableProps } from 'ant-design-vue/lib/table';
import { formItemProps as antFormItemProps } from 'ant-design-vue/lib/form';
import { isObject } from '@/utils';

export const formItemProps = {
	...antFormItemProps(),
};

export interface IExtarColumns {
	type?: 'input' | 'select' | 'image' | 'link' | 'tag';
	rules?: Rule[];
	props?: Record<string, any>;
	formItemProps?: Partial<typeof formItemProps>;
}

const defaultAntTableProps = antTableProps();

export const tableProps = {
	...defaultAntTableProps,

	columns: {
		type: Array as PropType<(ColumnType & IExtarColumns)[]>,
	},

	rootName: {
		type: String,
	},

	name: {
		type: String,
	},
};

export const tableEmits = {
	'update:value': (val: Record<string, any>) => isObject(val),
	register: (val: Record<string, any>) => isObject(val),
};

export type TableProps = Partial<ExtractPropTypes<typeof tableProps>>;
export type TableEmits = typeof tableEmits;
