import type { ExtractPropTypes, CSSProperties, VNode, PropType } from 'vue';
import { formProps as antFormProps } from 'ant-design-vue/lib/form';
import type { FormItemProps } from './form-item';
import type { FormProps as AntFormProps } from 'ant-design-vue/lib/form';

interface IExtra {
	model?: AntFormProps['model'];
	validateMessages?: AntFormProps['validateMessages'];
}

export const formProps = {
	...antFormProps(),
	formData: {
		type: Object,
	},
	schemas: {
		type: [Array, Function] as PropType<FormSchema[] | ((data?: Record<string, any>) => FormSchema[])>,
	},
	onSubmit: {
		type: Function as PropType<(parms: any) => void>,
	},
};
export const formEmits = {};

export type FormSchema = {
	type?:
		| 'input'
		| 'input-password'
		| 'input-number'
		| 'mentions'
		| 'radio'
		| 'radio-group'
		| 'checkbox-group'
		| 'rate'
		| 'select'
		| 'slider'
		| 'switch'
		| 'time-picker'
		| 'transfer'
		| 'tree-select'
		| 'upload'
		| 'cascader'
		| 'time-picker'
		| 'range-picker'
		| 'date-picker';
	// | string

	field?: any;
	slot?: string;
	props?: { [key: string]: any };
	formItemProps?: FormItemProps;
	prefix?: string | VNode; // 前缀
	suffix?: string | VNode; // 后缀
	style?: CSSProperties; // form-item ->
};
export type FormProps = Omit<ExtractPropTypes<typeof formProps>, 'model' | 'validateMessages'> & IExtra;
export type FormEmits = typeof formEmits;
