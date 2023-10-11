import { ref, nextTick } from 'vue';
import type { FormProps, FormSchema } from '../../pro-form/src/form.js';
import type { ModalProps } from '../../pro-modal/src/modal.js';
import { merge } from 'lodash-es';

export function useProModalForm(props: FormProps) {
	const modalApi = ref();
	const formApi = ref();

	const register = (api) => {
		console.log(api);
		modalApi.value = api.modalApi;
		formApi.value = api.formApi;
		setFormProps(props);
	};

	const setModalProps = (props: ModalProps) => {
		modalApi.value.setProps(props);
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

	return [register, { setModalProps, setFormProps, open, close, addField, removeField, submit, reset, validate, validateField, clearValidate }];
}
