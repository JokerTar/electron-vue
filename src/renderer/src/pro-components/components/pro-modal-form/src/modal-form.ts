import type { ExtractPropTypes, PropType } from 'vue';
import type { ModalProps } from '../../pro-modal/src/modal.js';
import { modalProps } from '../../pro-modal/src/modal.js';
import type { FormProps } from '../../pro-form/src/form.js';
// import { formProps } from '../../pro-form/src/form.js';
import { isObject } from '@/utils';
import type { TabsProps } from 'ant-design-vue/lib/tabs';
import type { ITabsPane } from './types.js';

export const modalFormProps = {
	// modalProps: {
	// 	type: Object as PropType<ModalProps>,
	// },
	...modalProps,

	tabs: {
		type: Object as PropType<TabsProps & ITabsPane<FormProps>>,
	},

	type: {
		type: String as PropType<'modal' | 'drawer'>,
		default: 'modal',
	},
	title: {
		type: String as PropType<ModalProps['title']>,
	},
	formProps: {
		type: Object as PropType<FormProps>,
	},
};

export const modalFormEmits = {
	register: (val: Record<string, any>) => isObject(val),
};

export type ModalFormProps = Partial<ExtractPropTypes<typeof modalFormProps>>;
export type ModalFormEmits = typeof modalFormEmits;
