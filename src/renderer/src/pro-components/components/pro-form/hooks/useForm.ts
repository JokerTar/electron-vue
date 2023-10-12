import { ref, toRaw, computed, nextTick, watch } from 'vue';
import type { ComputedRef, Ref, SetupContext } from 'vue';
import type { FormProps, FormSchema, FormEmits } from '../src/form';
import { Form } from 'ant-design-vue';
import { FormItemProps } from '../src/form-item';
import { isFunction, omit } from 'lodash-es';
// import { ProUpload } from '../../upload/index';
import { componentsAlias } from '../src/componentAlias';
import { isObject } from '@/utils';

export function useForm(
	props: FormProps,
	emits: SetupContext<FormEmits>['emit']
): {
	propsRef: Ref;
	modelRef: Ref<Record<string, any>>;
	injectQueue: Map<string, Record<string, any>>;
	rootName: Ref;
	schemasRef: Ref<FormSchema[]>;
	getFormBind: ComputedRef<Omit<FormProps, 'schemas' | 'modal' | 'onSubmit'>>;
	getFormItemBind: ComputedRef<(formItemProps: FormItemProps, field: string) => FormSchema & Record<string, any>>;
	getModalBind: ComputedRef;
	getFormItemType: ComputedRef;
	getSlotName: (str: string) => string;
	setProps: (props: FormProps) => void;
	addField: (schema: FormSchema) => void;
	removeField: (field: string) => void;
	submit: () => void;
	reset: (flag: boolean) => void;
	validate: () => void;
	validateField: (field: string) => void;
	clearValidate: (flag: boolean) => void;
	getInterface: (name: string) => Promise<Record<string, any> | undefined>;
	saveInjectInRoot: (name: string, injectQueueMap: Map<string, Record<string, any>>) => void;
	registerCom: (type: string, api: Record<string, any>) => void;
} {
	const modelRef = ref({});
	const rulesRef = ref({});
	const propsRef = ref<FormProps>(props);
	const formRef = ref();
	const schemasRef = ref<FormSchema[]>([]);
	let injectQueue: Map<string, Record<string, any>> = new Map();
	const rootName = ref(props.rootName || props.name);
	const hasSetProps = ref(false);

	formRef.value = Form.useForm(modelRef, rulesRef);
	const formItemContext = Form.useInjectFormItemContext();

	nextTick(() => {
		!hasSetProps.value && setProps(props);
	});

	watch(
		() => modelRef.value,
		(n) => {
			if (props.name !== rootName.value) {
				emits('update:value', toRaw(n));
				formItemContext.onFieldChange();
			}
		},
		{ deep: true }
	);

	const setProps = (props: FormProps) => {
		hasSetProps.value = true;
		propsRef.value = props;
		rootName.value = propsRef.value?.rootName || propsRef.value?.name;
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
			// @ts-ignore
			schemasRef.value = propsRef.value?.schemas.map((schema) => {
				return coverEvent(schema);
			});
		}
	};

	// 混合方法
	const coverEvent = (object: Record<string, any>, coverObj = { getInterface: formApi.getInterface }) => {
		if (!object) return;

		const stack = [object];
		while (stack.length > 0) {
			const obj = stack.pop();
			if (isObject(obj)) {
				for (const key in obj) {
					if (Object.prototype.hasOwnProperty.call(obj, key)) {
						const val = obj[key];
						if (isObject(val)) {
							stack.push(val);
						} else if (Array.isArray(val)) {
							val.forEach((item) => {
								if (isObject(item)) {
									stack.push(item);
								}
							});
						} else if (isFunction(val)) {
							obj[key] = (...args) => {
								return val(...args.filter((item) => !item.getInterface), coverObj);
							};
						}
					}
				}
			}
		}

		return object;
	};

	const getFormBind = computed(() => {
		if (!toRaw(propsRef.value)) return {};
		return omit(toRaw(propsRef.value), ['schemas', 'modal', 'onSubmit']);
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
		if (componentsAlias[type]) return componentsAlias[type];
		return type;
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
	const submit = async () => {
		return new Promise((resolve, reject) => {
			const promises: Promise<any>[] = [];
			injectQueue.forEach((item) => {
				if (item && !item.validate) {
					console.error(`${item?.props?.name} 表单组件统一检验必须实现 validate 方法`);
				}
				if (item?.validate) promises.push(item?.validate());
			});

			Promise.all(promises)
				.then(() => {
					resolve(toRaw(formRef.value.modelRef));
					if (isFunction(propsRef.value.onSubmit)) {
						propsRef.value.onSubmit(toRaw(formRef.value.modelRef));
					}
				})
				.catch((err) => {
					reject(err);
				});
		});
	};

	// 重置
	const reset = async (flag: boolean) => {
		initFormData();
		formRef.value.resetFields();
		if (flag) return;

		injectQueue.forEach((item) => {
			if (item.reset && isFunction(item.reset)) {
				item.reset(true);
			} else {
				console.error(`${item?.props?.name} 表单组件统一重置必须实现 reset 方法`);
			}
		});
	};

	// 校验
	const validate = () => {
		return new Promise((resolve, reject) => {
			formRef.value
				.validate()
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				});
		});
	};

	// 单个校验
	const validateField = (field: string) => {
		formRef.value.validateField(field);
	};

	// 清空校验
	const clearValidate = (flag: boolean) => {
		formRef.value.clearValidate();
		if (flag) return;

		injectQueue.forEach((item) => {
			if (item.clearValidate && isFunction(item.clearValidate)) {
				item.clearValidate(true);
			} else {
				console.error(`${item?.props?.name} 表单组件统一重置必须实现 clearValidate 方法`);
			}
		});
	};

	// 保存formApi在根form的injectQueue
	const saveInjectInRoot = (name: string, injectQueueMap: Map<string, Record<string, any>>) => {
		injectQueueMap && name && injectQueueMap.set(name, formApi);
		injectQueue = injectQueueMap;
	};

	// 获取form实列formApi
	const getInterface = (name: string): Promise<Record<string, any> | undefined> => {
		return new Promise((resolve, reject) => {
			nextTick(() => {
				if (!name) {
					console.error(`获取实例必须传 name`);
					reject();
					return;
				}

				if (props.name === name) {
					resolve(formApi);
					return;
				}

				if (!rootName.value) {
					reject(`获取实例必须传 rootName`);
					return;
				}

				resolve(injectQueue.get(name));
			});
		});
	};

	const registerCom = (type, api: Record<string, any>) => {
		console.log('register - api', type, api);
	};

	const formApi = {
		modelRef,
		formRef,
		rulesRef,
		props: toRaw(props),
		setProps,
		addField,
		removeField,
		submit,
		reset,
		validate,
		validateField,
		clearValidate,
		getInterface,
		initFormData,
	};

	emits('register', formApi);

	// @ts-ignore
	return {
		propsRef,
		modelRef,
		rootName,
		injectQueue,
		// injectQueueKey,
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
		getInterface,
		saveInjectInRoot,
		registerCom,
	};
}
