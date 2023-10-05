import { ref, toRaw } from 'vue';
import type { TableProps } from '../src/table';
import { merge } from 'lodash-es';

export function useProTable(props: TableProps) {
	const tableApi = ref();

	const register = (api) => {
		tableApi.value = api;
		setProps(toRaw(api.props));
	};

	const setProps = (registerProps: TableProps) => {
		tableApi.value.setProps(merge(registerProps, props));
	};

	return [register];
}
