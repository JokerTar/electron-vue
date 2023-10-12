import type { ExtractPropTypes, PropType } from 'vue';
import type { ModalProps } from '../../pro-modal/src/modal.js';
import { formProps } from '../../pro-form/src/form.js';
import { isObject } from '@/utils';

export const modalFormProps = {
	modalProps: {
		type: Object as PropType<ModalProps>,
	},
	type: {
		type: String as PropType<'modal' | 'drawer'>,
		default: 'modal',
	},
	title: {
		type: String as PropType<ModalProps['title']>,
	},
	...formProps,
};

export const modalFormEmits = {
	register: (val: Record<string, any>) => isObject(val),
};

export type ModalFormProps = Partial<ExtractPropTypes<typeof modalFormProps>>;
export type ModalFormEmits = typeof modalFormEmits;
