import { ref, computed, toRaw } from 'vue';
import type { SetupContext } from 'vue';
import type { ModalProps, ModalEmits } from '../src/modal';
import { assign, omit } from 'lodash-es';
import { isFunction } from '@/utils';

export function useModal(props: ModalProps, emits: SetupContext<ModalEmits>['emit']) {
	const visible = ref(false);
	const activeKey = ref(props?.tabs?.value || props?.tabs?.tabsPane?.[0].tabKey);
	const propsRef = ref(props);
	const isFull = ref(false);
	const tabsSlots = ['addIcon', 'leftExtra', 'moreIcon', 'renderTabBar', 'rightExtra'];

	const setProps = (props: ModalProps) => {
		propsRef.value = assign(toRaw(propsRef.value), props);
		activeKey.value = props?.tabs?.value || props?.tabs?.tabsPane?.[0].tabKey;
	};

	const getBind = computed(() => {
		return omit(propsRef.value, ['tabs', 'title']);
	});

	const getTabsBind = computed(() => {
		return omit(propsRef.value.tabs, 'tabsPane');
	});

	const fullModal = computed(() => {
		if (isFull.value) return 'full-modal';

		return '';
	});

	const getTabsPaneChildren = computed(() => {
		const { tabs } = propsRef.value;
		const item = tabs?.tabsPane?.find((item) => item.tabKey === activeKey.value)?.children;
		return item || {};
	});

	const getTabsChildren = computed(() => {
		const { tabs } = propsRef.value;

		return tabs?.children;
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

	const EventOk = async () => {
		if (props.okFn && isFunction(props.okFn)) {
			await props.okFn();
			close();
		} else {
			close();
		}
	};

	const EventCancel = async () => {
		if (props.cancelFn && isFunction(props.cancelFn)) {
			await props.cancelFn();
			close();
		} else {
			close();
		}
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
		getTabsChildren,
		getTabsPaneChildren,
		tabsSlots,
		tabsChange,
		close,
		open,
		targetFullModal,
		EventOk,
		EventCancel,
	};
}
