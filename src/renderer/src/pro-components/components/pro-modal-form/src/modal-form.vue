<template>
	<ProModal @register="registerModal">
		<ProForm @register="registerForm" v-bind="formProps"></ProForm>
	</ProModal>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useProForm, useProModal } from '../../index.ts';
import { modalFormEmits } from './modal-form';

const visiable = ref(false);
const emits = defineEmits(modalFormEmits);

const formProps = ref();

const [registerModal, modalApi] = useProModal();

const [registerForm, formApi] = useProForm();

const open = () => {
	visiable.value = true;
	return modalApi.open();
};

const setFormProps = (props) => {
	if (!visiable.value) {
		formProps.value = props;
	} else {
		formProps.value = {};
		formApi.setProps(props);
	}
};

emits('register', {
	modalApi: {
		...modalApi,
		open,
	},
	formApi: {
		...formApi,
		setProps: setFormProps,
	},
});
</script>
