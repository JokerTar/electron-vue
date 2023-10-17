<template>
	type: {{ modalType }}
	<component :is="modalType" @register="registerModal" v-bind="modalProps" :okFn="handleOk" :cancelFn="handleCancel" @tabsChange="tabsChange">
		<!-- 优先渲染插槽 -->
		<template v-if="$slots.default">
			<slot></slot>
		</template>

		<template v-else-if="hasTabsPaneChildren">
			<template v-for="(item, index) in formProps.modalProps.tabs.tabsPane" :key="index">
				<ProForm v-show="activeKey === item.tabKey" @register="(api) => registerForm(api, item.children?.name)" v-bind="item.children"></ProForm>
			</template>
		</template>

		<template v-else>
			<ProForm @register="(api) => registerForm(api, formProps.name)" v-bind="formProps"></ProForm>
		</template>
	</component>
</template>
<script lang="ts" setup>
import { modalFormEmits, modalFormProps } from './modal-form';
import { useModalForm } from '../hooks';
// import PaneForm from '../components/form.vue';

const props = defineProps(modalFormProps);
const emits = defineEmits(modalFormEmits);

const { activeKey, modalType, modalProps, formProps, hasTabsPaneChildren, registerModal, registerForm, handleOk, handleCancel, tabsChange } =
	useModalForm(props, emits);
</script>
