import type { ExtractPropTypes, PropType } from 'vue';
import { isObject } from '@/utils';

export const modalFormProps = {
	type: {
		type: String as PropType<'modal' | 'drawer'>,
		default: 'modal',
	},
};

export const modalFormEmits = {
	register: (val: Record<string, any>) => isObject(val),
};

export type ModalFormProps = ExtractPropTypes<typeof modalFormProps>;
export type ModalFormEmits = typeof modalFormEmits;
