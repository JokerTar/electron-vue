import { h, createVNode } from 'vue';
import type { ModalFunc, ModalFuncProps } from 'ant-design-vue/lib/modal/Modal';

import { Modal, message as Message, notification } from 'ant-design-vue';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ExclamationCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons-vue';

import { NotificationArgsProps, ConfigProps } from 'ant-design-vue/lib/notification';
// import { useI18n } from './useI18n';
import { isString } from '@/utils';

export interface NotifyApi {
	info(config: NotificationArgsProps): void;
	success(config: NotificationArgsProps): void;
	error(config: NotificationArgsProps): void;
	warn(config: NotificationArgsProps): void;
	warning(config: NotificationArgsProps): void;
	open(args: NotificationArgsProps): void;
	close(key: string): void;
	config(options: ConfigProps): void;
	destroy(): void;
}

export declare type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
export declare type IconType = 'success' | 'info' | 'error' | 'warning';
export interface ModalOptionsEx extends Omit<ModalFuncProps, 'iconType'> {
	iconType?: 'warning' | 'success' | 'error' | 'info';
}
export type ModalOptionsPartial = Partial<ModalOptionsEx> & Pick<ModalOptionsEx, 'content'>;

interface ConfirmOptions {
	info: ModalFunc;
	success: ModalFunc;
	error: ModalFunc;
	warn: ModalFunc;
	warning: ModalFunc;
}

function getIcon(iconType: string) {
	if (iconType === 'warning') {
		return createVNode(CloseCircleOutlined);
	} else if (iconType === 'success') {
		return createVNode(CheckCircleOutlined);
	} else if (iconType === 'info') {
		return createVNode(ExclamationCircleOutlined);
	} else {
		return createVNode(ExclamationCircleOutlined);
	}
}

function renderContent({ content }: Pick<ModalOptionsEx, 'content'>) {
	if (isString(content)) {
		// @ts-ignore
		return h('div', content);
	} else {
		return content;
	}
}

/**
 * @description: Create confirmation box
 */
function createConfirm(options: ModalOptionsEx): ConfirmOptions {
	const iconType = options.iconType || 'warning';
	// const { t } = useI18n();
	Reflect.deleteProperty(options, 'iconType');
	const opt: ModalFuncProps = {
		centered: true,
		icon: getIcon(iconType),
		okText: options.okText,
		cancelText: options.cancelText,
		...options,
		content: renderContent(options),
	};
	return Modal.confirm(opt) as unknown as ConfirmOptions;
}

const getBaseOptions = (options?) => {
	// const { t } = useI18n();
	return {
		okText: options.okText,
		centered: true,
	};
};

function createModalOptions(options: ModalOptionsPartial, icon: string): ModalOptionsPartial {
	return {
		...getBaseOptions(),
		...options,
		content: renderContent(options),
		icon: getIcon(icon),
	};
}

function createSuccessModal(options: ModalOptionsPartial) {
	return Modal.success(createModalOptions(options, 'success'));
}

function createErrorModal(options: ModalOptionsPartial) {
	return Modal.error(createModalOptions(options, 'close'));
}

function createInfoModal(options: ModalOptionsPartial) {
	return Modal.info(createModalOptions(options, 'info'));
}

function createWarningModal(options: ModalOptionsPartial) {
	return Modal.warning(createModalOptions(options, 'warning'));
}

notification.config({
	placement: 'topRight',
	duration: 3,
});

// 监听全屏事件，触发重新设置Message重新挂载容器节点
document.addEventListener('fullscreenchange', () => {
	Message.config({
		getContainer: () => (document.fullscreenElement || document.body) as HTMLElement,
	});
});

/**
 * @description: message
 */
export function useMessage() {
	return {
		createMessage: Message,
		notification: notification as NotifyApi,
		createConfirm: createConfirm,
		createWarningModal,
		createSuccessModal,
		createErrorModal,
		createInfoModal,
	};
}
