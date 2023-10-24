import { useNamespace } from '../../../hooks';

export function useTableStyle() {
	const ns = useNamespace('table');

	return {
		ns,
	};
}
