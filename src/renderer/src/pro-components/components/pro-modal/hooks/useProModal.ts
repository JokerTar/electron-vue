import { ref } from 'vue';
import type { ModalProps } from '../src/modal';

export function useProModal(props?: ModalProps): [
	register: (key: any) => void,
	methods: {
		setProps: (props: ModalProps) => void;
		open: () => void;
		close: () => void;
		setTabs: (val: string | number) => void;
	},
] {
	const modalApi = ref();

	const register = (api) => {
		modalApi.value = api;
		props && setProps(props);
	};

	const setProps = (props: ModalProps) => {
		modalApi.value?.setProps(props);
	};

	const open = () => {
		modalApi.value.open();
	};

	const close = () => {
		modalApi.value.close();
	};

	const setTabs = (val: string | number) => {
		modalApi.value.setTabs(val);
	};

	return [register, { setProps, open, close, setTabs }];
}
