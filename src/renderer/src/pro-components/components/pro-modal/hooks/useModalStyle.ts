import { ref, watch, watchEffect, computed } from 'vue';
import type { CSSProperties } from 'vue';
import { useNamespace } from '../../../hooks';
import { useDraggable } from '@vueuse/core';
import { isNumber, isString } from '@/utils';

export function useModalStyle() {
	const ns = useNamespace('modal');
	const startX = ref<number>(0);
	const startY = ref<number>(0);
	const startedDrag = ref(false);
	const transformX = ref(0);
	const transformY = ref(0);
	const preTransformX = ref(0);
	const preTransformY = ref(0);
	const dragRect = ref({ left: 0, right: 0, top: 0, bottom: 0 });
	const modalTitleRef = ref<HTMLElement>();

	const { x, y, isDragging } = useDraggable(modalTitleRef);

	watch([x, y], () => {
		if (!startedDrag.value) {
			startX.value = x.value;
			startY.value = y.value;
			const bodyRect = document.body.getBoundingClientRect();
			const titleRect = modalTitleRef.value?.getBoundingClientRect();
			dragRect.value.right = titleRect?.width ? bodyRect.width - titleRect?.width : bodyRect.width;
			dragRect.value.bottom = titleRect?.height ? bodyRect.height - titleRect?.height : bodyRect.height;
			preTransformX.value = transformX.value;
			preTransformY.value = transformY.value;
		}
		startedDrag.value = true;
	});
	watch(isDragging, () => {
		if (!isDragging) {
			startedDrag.value = false;
		}
	});

	watchEffect(() => {
		if (startedDrag.value) {
			transformX.value = preTransformX.value + Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right) - startX.value;
			transformY.value = preTransformY.value + Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom) - startY.value;
		}
	});

	const transformStyle = computed<CSSProperties>(() => {
		return {
			transform: `translate(${transformX.value}px, ${transformY.value}px)`,
		};
	});

	const calculatedValue = computed(() => {
		return (val: string | number) => {
			if (isString(val)) return val;
			if (isNumber(val)) return `${val}px`;
			return '';
		};
	});

	return {
		ns,
		modalTitleRef,
		transformStyle,
		calculatedValue,
	};
}
