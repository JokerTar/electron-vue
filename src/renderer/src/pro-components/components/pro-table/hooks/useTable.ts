import { ref, reactive, toRaw, nextTick } from 'vue';
import type { SetupContext } from 'vue';
import type { TableProps, TableEmits } from '../src/table';
import { Form } from 'ant-design-vue';
import { isObject, isFunction } from '@/utils';

export function useTable(props: TableProps, emits: SetupContext<TableEmits>['emit']) {
	const propsRef = ref<TableProps>(props);
	const formRef = ref();
	const formDataRef = reactive<Record<string, any>>({
		dataSource: [],
	});
	const rulesRef = ref<Record<string, any>>({});
	const columnsRef = ref<Record<string, any>[]>();
	const hasSetProps = ref(false);
	let injectQueue: Map<string, Record<string, any>> = new Map();

	const formItemContext = Form.useInjectFormItemContext();

	nextTick(() => {
		!hasSetProps.value && setProps(props);
	});

	const setProps = (props: TableProps) => {
		hasSetProps.value = true;
		propsRef.value = props;
		setColumns(propsRef.value.columns);
		setTableData(propsRef.value.dataSource || []);
	};

	const updateValue = () => {
		emits('update:value', toRaw(formDataRef.dataSource));
		formItemContext.onFieldChange();
	};

	const setTableData = (tableData: Record<string, any>[]) => {
		formDataRef.dataSource = tableData;
		updateValue();
	};

	const getTableData = () => {
		return toRaw(formDataRef.dataSource);
	};

	const setColumns = (columns: TableProps['columns']) => {
		columnsRef.value = columns;
	};

	// 保存formApi在根form的injectQueue
	const saveInjectInRoot = (name: string, injectQueueMap: Map<string, Record<string, any>>) => {
		injectQueueMap && name && injectQueueMap.set(name, tableApi);
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

				if (!props.rootName) {
					reject(`获取实例必须传 rootName`);
					return;
				}

				resolve(injectQueue.get(name));
			});
		});
	};

	// 校验
	const validate = () => {
		return new Promise((resolve, reject) => {
			formRef.value
				.validate()
				.then((res) => {
					resolve(res?.dataSource);
				})
				.catch((err) => {
					reject(err);
				});
		});
	};

	// 重置
	const reset = async () => {
		// initFormData();
		formRef.value.resetFields();
	};

	// 监听列表表单输入变化
	const EventChange = () => {
		updateValue();
	};

	// 混合方法
	const coverEvent = (object: Record<string, any>, coverObj = { getInterface: tableApi.getInterface }) => {
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

	const tableApi = {
		tableRef: formRef,
		injectQueue,
		props: toRaw(props),
		setProps,
		setTableData,
		getTableData,
		setColumns,
		getInterface,
		validate,
		reset,
	};

	emits('register', tableApi);

	return {
		formRef,
		formDataRef,
		rulesRef,
		columnsRef,
		injectQueue,
		EventChange,
		saveInjectInRoot,
		coverEvent,
	};
}
