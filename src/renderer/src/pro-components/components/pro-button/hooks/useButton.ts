import { ref, computed } from 'vue';
import type { ButtonProps } from '../src/button';
import { isFunction } from '@/utils';
import { omit } from 'lodash-es';

export function useButton(props: ButtonProps) {
	const loadingRef = ref(false);
	const disabledRef = ref(false);

	const getBind = computed(() => {
		return omit(props, ['loading', 'disabled']);
	});

	const ClickEvent = async (...args) => {
		if (props.submit && isFunction(props.submit)) {
			loadingRef.value = true;
			disabledRef.value = true;
			try {
				await props.submit(...args);
				loadingRef.value = false;
				disabledRef.value = false;
			} catch (error) {
				loadingRef.value = false;
				disabledRef.value = false;
			}
		}
	};

	return { getBind, loadingRef, disabledRef, ClickEvent };
}
