import type { ExtractPropTypes } from 'vue';
// import type { FormItem } from 'ant-design-vue/lib/form'
import { formItemProps as antFormItemProps } from 'ant-design-vue/lib/form';
// import type { FormItemProps as AntFormItemProps } from 'ant-design-vue/lib/form'

export const formItemProps = {
	...antFormItemProps(),

	type: {
		type: String,
	},

	customClass: {
		type: String,
	},
};

interface IExtra {
	hasFeedback?: boolean;
	autoLink?: boolean;
	hidden?: boolean;
	noStyle?: boolean;
}

export type FormItemProps = Omit<ExtractPropTypes<typeof formItemProps>, 'hasFeedback' | 'autoLink' | 'hidden' | 'noStyle'> & IExtra;
