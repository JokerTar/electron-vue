import { ref, toRaw } from 'vue';
import type { FormProps, FormSchema } from '../src/form.js';
import { merge } from 'lodash-es';

export function useProForm(props?: FormProps): [
	register: (key: any) => void,
	methods: {
		setProps: (props: FormProps) => void;
		addField: (schema: FormSchema) => void;
		removeField: (field: string) => void;
		submit: () => void;
		reset: () => void;
		validate: () => void;
		validateField: (field: string) => void;
		clearValidate: () => void;
	},
] {
	const formApi = ref();

	const register = (api) => {
		formApi.value = api;
		props && setProps(toRaw(api.props));
	};

	const setProps = (registerProps: FormProps) => {
		formApi.value?.setProps(merge(registerProps, props));
	};

	const submit = () => {
		return formApi.value.submit();
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
			setProps,
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
