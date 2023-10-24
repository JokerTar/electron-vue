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
		setTabs(props?.tabs?.value || props?.tabs?.tabsPane?.[0].tabKey);
	};

	const getBind = computed(() => {
		return omit(propsRef.value, ['tabs', 'title']);
	});

	const getTabsBind = computed(() => {
		return {
			...omit(propsRef.value.tabs, ['tabsPane', 'change', 'onChange', 'onchange']),
		};
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

	const tabsChange = (val: string | number) => {
		setTabs(val);
		emits('tabsChange', val);
	};

	const setTabs = (val?: string | number) => {
		activeKey.value = val;
	};

	const close = async () => {
		visible.value = false;
	};

	const open = () => {
		visible.value = true;
	};

	const targetFullModal = () => {
		isFull.value = !isFull.value;
	};

	const EventOk = async () => {
		try {
			if (props.okFn && isFunction(props.okFn)) {
				await props.okFn();
				close();
			} else {
				close();
			}
		} catch (error) {
			// .
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
		setTabs,
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
