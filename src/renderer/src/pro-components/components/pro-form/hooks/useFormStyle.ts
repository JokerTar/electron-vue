import { useNamespace } from '../../../hooks';

export function useFormStyle() {
	const ns = useNamespace('form');

	return {
		ns,
	};
}
