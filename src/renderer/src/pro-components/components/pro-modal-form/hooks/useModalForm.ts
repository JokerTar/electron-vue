import { ref, nextTick, computed } from 'vue';
import type { SetupContext } from 'vue';
import type { ModalFormProps, ModalFormEmits } from '../src/modal-form';
import type { FormProps } from '../../pro-form/src/form.js';
import type { ModalProps } from '../../pro-modal/src/modal.js';
import { useProForm, useProModal } from '../../../index';
import { isFunction } from '@/utils';
import { omit } from 'lodash-es';

export function useModalForm(props: ModalFormProps & FormProps, emits: SetupContext<ModalFormEmits>['emit']) {
	const visiable = ref(false);
	const formProps = ref<FormProps>();
	const modalProps = ref<ModalProps>();
	const modalType = ref('pro-modal');
	const activeKey = ref(props.modalProps?.tabs?.value || props.modalProps?.tabs?.tabsPane?.[0].tabKey);

	const [registerModal, modalApi] = useProModal();
	const [registerForm, formApi] = useProForm();

	const open = () => {
		visiable.value = true;
		nextTick(() => {
			formApi.reset();
		});
		return modalApi.open();
	};

	const setModalProps = (props: ModalFormProps) => {
		modalProps.value = props;
		modalApi.setProps(omit(props, 'type'));
		activeKey.value = modalProps.value?.tabs?.value || modalProps.value?.tabs?.tabsPane?.[0].tabKey;
	};

	const setModalFormType = (type?: ModalFormProps['type']) => {
		if (type) {
			modalType.value = `pro-${type}`;
		}
	};

	const setFormProps = (props: FormProps) => {
		if (!visiable.value) {
			formProps.value = omit(props, 'type');
		} else {
			formApi.setProps(omit(props, 'type'));
		}
	};

	const getTabsPaneChildren = computed(() => {
		const { tabs } = modalProps.value;
		const item = tabs?.tabsPane?.find((item) => item.tabKey === activeKey.value)?.children;
		return item;
	});

	const getTabsChildren = computed(() => {
		const { tabs } = modalProps.value;

		return tabs?.children;
	});

	const handleOk = async () => {
		const params = await formApi.submit();
		if (formProps.value?.onSubmit && isFunction(formProps.value.onSubmit)) {
			return formProps.value.onSubmit(params);
		} else {
			return params;
		}
	};

	const handleCancel = async () => {
		formApi.clearValidate();

		return Promise.resolve();
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
		setModalProps,
		setModalFormType,
	});

	return {
		visiable,
		formProps,
		modalProps,
		modalType,
		getTabsChildren,
		getTabsPaneChildren,
		registerModal,
		registerForm,
		handleOk,
		handleCancel,
	};
}
