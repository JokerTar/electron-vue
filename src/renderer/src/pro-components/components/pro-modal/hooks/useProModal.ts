import { ref } from 'vue';
import type { ModalProps } from '../src/modal';

export function useProModal(props: ModalProps) {
	const modalApi = ref();

	const register = (api) => {
		modalApi.value = api;
		setProps(props);
	};

	const setProps = (props: ModalProps) => {
		modalApi.value.setProps(props);
	};

	const open = () => {
		modalApi.value.open();
	};

	const close = () => {
		modalApi.value.close();
	};

	return [register, { setProps, open, close }];
}
