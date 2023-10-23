import { ref, nextTick } from 'vue';
import type { FormProps, FormSchema } from '../../pro-form/src/form.js';
// import type { ModalProps } from '../../pro-modal/src/modal.js';
import type { ModalFormProps } from '../src/modal-form.js';
import type { ModalProps } from '../../pro-modal/src/modal.js';
import { merge, omit } from 'lodash-es';

type ProModalForm = [
	register: (key: any) => void,
	methods: {
		setModalProps: (props: ModalFormProps) => void;
		setFormProps: (registerProps: FormProps) => void;
		open: () => void;
		close: () => void;
		addField: (schema: FormSchema) => void;
		removeField: (field: string) => void;
		submit: () => void;
		reset: () => void;
		validate: () => void;
		validateField: (field: string) => void;
		clearValidate: (names?: string[]) => void;
	},
];

export function useProModalForm(props: ModalFormProps): ProModalForm {
	const modalApi = ref();
	const formApi = ref();
	const modalFormApi = ref();

	const register = (api) => {
		console.log(api);
		modalApi.value = api.modalApi;
		formApi.value = api.formApi;
		modalFormApi.value = api;
		props.formProps && setFormProps(props.formProps);
		setModalProps(omit(props, ['type', 'formProps']));
		api.setModalFormType(props.type);
	};

	const setModalProps = (props: ModalProps) => {
		modalFormApi.value.setModalProps(props);
	};

	const open = () => {
		nextTick(() => {
			modalApi.value.open();
		});
		setFormProps(props);
	};

	const close = () => {
		modalApi.value.close();
	};

	const submit = () => {
		return formApi.value.submit();
	};

	const setFormProps = (registerProps: FormProps) => {
		console.log(merge(registerProps, props));
		formApi.value.setProps(merge(props, registerProps));
	};

	const addField = (schema: FormSchema) => {
		formApi.value.addField(schema);
	};

	const removeField = (field: string) => {
		formApi.value.removeField(field);
	};

	const reset = () => {
		formApi.value.reset();
	};

	const validate = () => {
		formApi.value.validate();
	};

	const validateField = (field: string) => {
		formApi.value.validateField(field);
	};

	const clearValidate = (names?: string[]) => {
		formApi.value.clearValidate(names);
	};

	return [
		register,
		{
			setModalProps,
			setFormProps,
			open,
			close,
			addField,
			removeField,
			submit,
			reset,
			validate,
			validateField,
			clearValidate,
		},
	];
}
