<template>
	type: {{ modalType }}
	<component :is="modalType" @register="registerModal" v-bind="modalProps" :okFn="handleOk" :cancelFn="handleCancel">
		<!-- 优先渲染插槽 -->
		<template v-if="$slots.default">
			<slot></slot>
		</template>

		<template v-else-if="getTabsPaneChildren">
			<Content :activeKey="activeKey" :tabsPaneChildren="getTabsPaneChildren" />
		</template>

		<template v-if="formProps.schemas">
			<ProForm @register="registerForm" v-bind="formProps"></ProForm>
		</template>
	</component>
</template>
<script lang="ts" setup>
import { modalFormEmits, modalFormProps } from './modal-form';
import { useModalForm } from '../hooks';

const props = defineProps(modalFormProps);
const emits = defineEmits(modalFormEmits);

const {
	activeKey,
	modalType,
	modalProps,
	formProps,
	getTabsPaneChildren,
	registerModal,
	registerForm,
	handleOk,
	handleCancel,
} = useModalForm(props, emits);
</script>
