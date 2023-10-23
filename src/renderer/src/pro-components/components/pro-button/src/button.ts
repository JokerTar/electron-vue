import type { ExtractPropTypes } from 'vue';
import antButtonProps from 'ant-design-vue/lib/button';

export const buttonProps = {
	...antButtonProps,

	submit: {
		type: Function,
	},
};

export const buttonEmits = {};

export type ButtonProps = Partial<ExtractPropTypes<typeof buttonProps>>;
export type ButtonEmits = typeof buttonEmits;
