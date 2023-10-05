import { useNamespace } from '../../../hooks';

export function useTableStyle() {
	const ns = useNamespace('form');

	return {
		ns,
	};
}
