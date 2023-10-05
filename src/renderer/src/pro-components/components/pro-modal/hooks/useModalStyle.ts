import { useNamespace } from '../../../hooks';

export function useModalStyle() {
	const ns = useNamespace('modal');

	return {
		ns,
	};
}
