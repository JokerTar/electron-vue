import { ref } from 'vue';
import type { SetupContext } from 'vue';
import type { ModalFormProps, ModalFormEmits } from '../src/modal-form';
import { useProForm, useProModal } from '../../../index';

export function useModalForm(props: ModalFormProps, emits: SetupContext<ModalFormEmits>['emit']) {
	const visiable = ref(false);
	const formProps = ref();

	const [registerModal, modalApi] = useProModal();

	const [registerForm, formApi] = useProForm();

	const open = () => {
		visiable.value = true;
		return modalApi.open();
	};

	const setFormProps = (props) => {
		debugger;
		if (!visiable.value) {
			formProps.value = props;
		} else {
			// formProps.value = {};
			formApi.setProps(props);
		}
	};

	emits('register', {
		modalApi: {
			...modalApi,
			open,
		},
		formApi: {
			...formApi,
			setProps: setFormProps,
		},
	});

	return {
		visiable,
		formProps,
		registerModal,
		registerForm,
	};
}
