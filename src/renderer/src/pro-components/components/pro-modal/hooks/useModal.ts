import { ref, computed, toRaw } from 'vue';
import type { SetupContext } from 'vue';
import type { ModalProps, ModalEmits } from '../src/modal';
import { assign, omit, pick } from 'lodash-es';

export function useModal(props: ModalProps, emits: SetupContext<ModalEmits>['emit']) {
	const visible = ref(false);
	const activeKey = ref();
	const propsRef = ref(props);
	const isFull = ref(false);

	console.log(props);
	console.log(emits);

	const setProps = (props: ModalProps) => {
		propsRef.value = assign(toRaw(propsRef.value), props);
	};

	const getBind = computed(() => {
		return omit(propsRef.value, ['tabs', 'title']);
	});

	const getTabsBind = computed(() => {
		console.log('tabs', omit(pick(propsRef.value, ['tabs']), 'tabsPane'));
		return omit(propsRef.value.tabs, 'tabsPane');
	});

	const fullModal = computed(() => {
		if (isFull.value) return 'full-modal';

		return '';
	});

	const close = () => {
		visible.value = false;
	};

	const open = () => {
		visible.value = true;
		console.log('open');
	};

	const tabsChange = () => {
		visible.value = true;
	};

	const targetFullModal = () => {
		isFull.value = !isFull.value;
	};

	const api = {
		setProps,
		close,
		open,
	};

	emits('register', api);

	return {
		visible,
		activeKey,
		getBind,
		getTabsBind,
		fullModal,
		isFull,
		tabsChange,
		close,
		open,
		targetFullModal,
	};
}
