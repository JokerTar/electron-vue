import { ref } from 'vue';
import type { ModalProps } from '../src/modal';

export function useProModal(props?: ModalProps): [
	register: (key: any) => void,
	methods: {
		setProps: (props: ModalProps) => void;
		open: () => void;
		close: () => void;
	},
] {
	const modalApi = ref();

	const register = (api) => {
		modalApi.value = api;
		props && setProps(props);
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
