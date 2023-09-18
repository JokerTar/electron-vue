import { ref, toRaw, computed, nextTick } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import type { FormProps, FormSchema } from '../src/form';
import { Form } from 'ant-design-vue';
import { FormItemProps } from '../src/form-item';
import { isFunction, omit } from 'lodash-es';
// import { ProUpload } from '../../upload/index';

export function useForm(props: FormProps): {
	propsRef: Ref;
	modelRef: Ref<{ [key: string]: any }>;
	schemasRef: Ref<FormSchema[]>;
	getFormBind: ComputedRef<Omit<FormProps, 'schemas' | 'modal' | 'onSubmit'>>;
	getFormItemBind: ComputedRef<(formItemProps: FormItemProps, field: string) => FormSchema & { [key: string]: any }>;
	getModalBind: ComputedRef;
	getFormItemType: ComputedRef;
	getSlotName: (str: string) => string;
	setProps: (props: FormProps) => void;
	addField: (schema: FormSchema) => void;
	removeField: (field: string) => void;
	submit: () => void;
	reset: () => void;
	validate: () => void;
	validateField: (field: string) => void;
	clearValidate: () => void;
} {
	const modelRef = ref({});
	const rulesRef = ref({});
	const propsRef = ref<FormProps>();
	const formRef = ref();
	const schemasRef = ref<FormSchema[]>([]);

	formRef.value = Form.useForm(modelRef, rulesRef);

	nextTick(() => {
		setProps(props);
	});

	const setProps = (props: FormProps) => {
		// console.log('setProps', props)
		propsRef.value = props;
		initSchemas();
		initFormData();
		getRules();
	};

	const initFormData = () => {
		if (!Array.isArray(schemasRef.value)) return;

		schemasRef.value.forEach((schema) => {
			if (!schema || !schema.field) return;
			modelRef.value[schema?.field] = propsRef.value?.formData?.[schema?.field];
		});
	};

	const initSchemas = () => {
		if (!propsRef.value?.schemas) return;
		if (isFunction(propsRef.value?.schemas)) {
			schemasRef.value = propsRef.value?.schemas();
		} else {
			schemasRef.value = propsRef.value?.schemas;
		}
	};

	const getFormBind = computed(() => {
		if (!propsRef.value) return {};
		return omit(propsRef.value, ['schemas', 'modal', 'onSubmit']);
	}) as ComputedRef<Omit<FormProps, 'schemas' | 'modal' | 'onSubmit'>>;

	const getFormItemBind = computed(() => {
		return (formItemProps: FormItemProps, field: string) => {
			const validateInfo = formRef.value.validateInfos[field] || {};
			return {
				...formItemProps,
				...validateInfo,
			};
		};
	});

	// 获取表单绑定属性
	const getModalBind = computed(() => {
		return (type) => {
			if (type === 'a-switch' || type === 'a-radio') return 'checked';
			if (type === 'upload') return 'file-list';
			return 'value';
		};
	});

	// 获取表单类型
	const getFormItemType: any = (type: FormSchema['type']) => {
		if (!propsRef.value) return;
		// if (propsRef.value.readonly) return 'FormText'
		if (!type) return;

		// if (type === 'upload') return ProUpload;
		return `a-${type}`;
	};

	// 获取表单校验规则
	const getRules = () => {
		if (!schemasRef.value) return;
		schemasRef.value.forEach((schema: FormSchema) => {
			if (!schema.formItemProps) return;

			if (schema.formItemProps.required) {
				rulesRef.value[schema.field] = [
					{
						required: true,
					},
				];
			}
			if (schema.formItemProps.rules) {
				if (!rulesRef.value[schema.field]) rulesRef.value[schema.field] = [];
				if (Array.isArray(schema.formItemProps.rules)) {
					rulesRef.value[schema.field] = schema.formItemProps.rules;
				} else {
					rulesRef.value[schema.field].push(schema.formItemProps.rules);
				}
			}
		});
	};

	// 获取插槽名称
	const getSlotName = (str: string) => {
		return str.replace(/_[\w\d]+/, '');
	};

	// 动态加表单项
	const addField = (schema: FormSchema) => {
		if (!schemasRef.value && propsRef.value) propsRef.value.schemas = [];

		schemasRef.value.push(schema);
		getRules();
		initFormData();
	};

	// 动态减表单项
	const removeField = (field: string) => {
		if (!schemasRef.value) return;

		const index = schemasRef.value.findIndex((schema) => schema.field === field);
		if (index !== -1) {
			schemasRef.value.splice(index, 1);
		}
		delete modelRef.value?.[field];
	};

	// 提交
	const submit = () => {
		console.log('formRef', formRef.value);
		console.log('rulesRef', rulesRef.value);
		return new Promise((resolve, reject) => {
			formRef.value
				.validate()
				.then(() => {
					resolve(toRaw(formRef.value.modelRef));
					if (isFunction(propsRef.value?.onSubmit)) {
						propsRef?.value?.onSubmit(toRaw(formRef.value.modelRef));
					}
				})
				.catch((err) => {
					reject(err);
				});
		});
	};

	// 重置
	const reset = () => {
		initFormData();
		formRef.value.resetFields();
	};

	// 校验
	const validate = () => {
		formRef.value.validate();
	};

	// 单个校验
	const validateField = (field: string) => {
		formRef.value.validateField(field);
	};

	// 清空校验
	const clearValidate = (names?: string[]) => {
		formRef.value.clearValidate(names);
	};

	// @ts-ignore
	return {
		propsRef,
		modelRef,
		schemasRef,
		getFormBind,
		getFormItemBind,
		getModalBind,
		getFormItemType,
		getSlotName,
		setProps,
		addField,
		removeField,
		submit,
		reset,
		validate,
		validateField,
		clearValidate,
	};
}
