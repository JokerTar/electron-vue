import { useNamespace } from '../../../hooks';

export function useFormItemStyle() {
	const ns = useNamespace('form-item');

	return {
		ns,
	};
}
