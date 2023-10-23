import { ref, toRaw, nextTick } from 'vue';
import type { SetupContext } from 'vue';
import type { ModalFormProps, ModalFormEmits } from '../src/modal-form';
import type { FormProps } from '../../pro-form/src/form.js';
import type { ModalProps } from '../../pro-modal/src/modal.js';
import { useProModal } from '../../../index';
import { isFunction } from '@/utils';
import { omit, assign } from 'lodash-es';

export function useModalForm(props: ModalFormProps & FormProps, emits: SetupContext<ModalFormEmits>['emit']) {
	const visiable = ref(false);
	const formProps = ref<FormProps | undefined>(props?.formProps);
	const modalProps = ref(omit(props, ['type', 'formProps']));
	const modalType = ref(props.type === 'drawer' ? 'pro-drawer' : 'pro-modal');
	const activeKey = ref(props.tabs?.value || props.tabs?.tabsPane?.[0].tabKey);
	const formApiMap = new Map();
	// const currentFormApi = ref();
	const hasTabsPaneChildren = ref(false);

	const [registerModal, modalApi] = useProModal();
	// const [registerForm, formApi] = useProForm();

	const open = () => {
		visiable.value = true;
		activeKey.value = modalProps.value?.tabs?.value || modalProps.value?.tabs?.tabsPane?.[0].tabKey;
		modalApi.setTabs(activeKey.value);

		console.log('activeKey', activeKey.value);

		nextTick(() => {
			const currentFormApi = getCurrentFormApi();
			currentFormApi?.reset();
		});
		return modalApi.open();
	};

	const registerForm = (api: Record<string, any>, name?: string) => {
		if (name) formApiMap.set(name, api);
	};

	const setModalProps = (props: ModalProps) => {
		modalProps.value = assign(toRaw(modalProps.value), props);
		modalApi.setProps(omit(props, 'type'));
		activeKey.value = modalProps.value?.tabs?.value || modalProps.value?.tabs?.tabsPane?.[0].tabKey;
		computeHasTabsPaneChildren();
	};

	const setModalFormType = (type?: ModalFormProps['type']) => {
		if (type) {
			modalType.value = `pro-${type}`;
		}
	};

	const setFormProps = (props: FormProps) => {
		if (!visiable.value) {
			// @ts-ignore
			formProps.value = omit(props, 'type');
		} else {
			getCurrentFormApi().setProps(omit(props, 'type'));
		}
	};

	const getCurrentFormApi = () => {
		if (hasTabsPaneChildren.value) {
			let name;
			modalProps.value?.tabs?.tabsPane?.forEach((tabsPane) => {
				if (tabsPane.tabKey === activeKey.value) name = tabsPane?.children?.name;
			});
			if (!name) return;

			return formApiMap.get(name);
		} else {
			return formApiMap.get(formProps.value?.name);
		}
	};

	const computeHasTabsPaneChildren = () => {
		let flag = false;

		modalProps.value?.tabs?.tabsPane &&
			modalProps.value?.tabs?.tabsPane.forEach((tabsPane) => {
				if (tabsPane.children) flag = true;
			});

		hasTabsPaneChildren.value = flag;
	};

	const handleOk = async () => {
		const currentFormApi = getCurrentFormApi();
		console.log(currentFormApi);
		const params = await currentFormApi.submit();
		if (formProps.value?.onSubmit && isFunction(formProps.value.onSubmit)) {
			return formProps.value.onSubmit(params);
		} else {
			return params;
		}
	};

	const handleCancel = async () => {
		getCurrentFormApi().clearValidate();
		getCurrentFormApi().reset();
		return Promise.resolve();
	};

	const tabsChange = (val: string | number) => {
		console.log('activeKey', val);
		activeKey.value = val;
	};

	emits('register', {
		modalApi: {
			...modalApi,
			open,
		},
		formApi: {
			...getCurrentFormApi(),
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
		hasTabsPaneChildren,
		activeKey,
		registerModal,
		registerForm,
		handleOk,
		handleCancel,
		tabsChange,
	};
}
