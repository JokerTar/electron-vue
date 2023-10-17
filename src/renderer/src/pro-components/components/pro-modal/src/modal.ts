import type { ExtractPropTypes } from 'vue';
// import { tabs as antTabsProps } from 'ant-design-vue/lib/tabs';
import { modalProps as antModalProps } from 'ant-design-vue/lib/modal/Modal';
import { commonEmits, commonProps } from './common';

export const modalProps = {
	...antModalProps(),

	...commonProps,
};

export const modalEmits = {
	...commonEmits,
};

export type ModalProps = Partial<ExtractPropTypes<typeof modalProps>>;
export type ModalEmits = typeof modalEmits;
