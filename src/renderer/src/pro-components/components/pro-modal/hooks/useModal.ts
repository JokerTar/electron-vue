import { ref, computed } from 'vue';
import type { SetupContext } from 'vue';
import type { ModalProps, ModalEmits } from '../src/modal';

export function useModal(props: ModalProps, emits: SetupContext<ModalEmits>['emit']) {
	const visible = ref(false);
	const activeKey = ref();

	console.log(props);
	console.log(emits);

	const getBind = computed(() => {
		return {};
	});

	const getTabsBind = computed(() => {
		return {};
	});

	const close = () => {
		visible.value = false;
	};

	const open = () => {
		visible.value = true;
	};

	const tabsChange = () => {
		visible.value = true;
	};

	return {
		visible,
		activeKey,
		getBind,
		getTabsBind,
		tabsChange,
		close,
		open,
	};
}
