import { ref, toRaw } from 'vue';
import type { TableProps } from '../src/table';
import { merge } from 'lodash-es';

export function useProTable(props: TableProps): [
	register: (key: any) => void,
	methods: {
		setProps: (props: TableProps) => void;
		reload: (searchInfo?: Record<string, any>) => Promise<any>;
		getTableData: () => any[] | undefined;
		setColumns: (columns: TableProps['columns']) => void;
	},
] {
	const tableApi = ref();

	const register = (api) => {
		tableApi.value = api;
		setProps(toRaw(api.props));
	};

	const setProps = (registerProps: TableProps) => {
		tableApi.value.setProps(merge(registerProps, props));
	};

	const reload = async (searchInfo?: Record<string, any>) => {
		await tableApi.value.reload(searchInfo);
	};

	const getTableData = () => {
		return tableApi.value.getTableData();
	};

	const setColumns = (columns: TableProps['columns']) => {
		return tableApi.value.setColumns(columns);
	};

	return [register, { setProps, reload, getTableData, setColumns }];
}
