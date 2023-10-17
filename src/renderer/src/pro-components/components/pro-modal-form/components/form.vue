<template>
	<ProForm @register="register" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useProForm } from '../../../index';
import { isFunction } from '@/utils';
import { formProps } from '../../pro-form/src/form.js';

export default defineComponent({
	emits: ['register', 'ok', 'cancel'],

	props: formProps,

	setup(props, { emit }) {
		const [register, formApi] = useProForm();

		const handleOk = async () => {
			const params = await formApi.value.submit();
			if (formApi.value?.onSubmit && isFunction(formApi.value.onSubmit)) {
				emit('ok', formApi.value.onSubmit(params));
			} else {
				emit('ok', params);
			}
		};

		const handleCancel = async () => {
			formApi.value.clearValidate();
			emit('cancel');
		};

		emit('register', formApi);

		return {
			register,
			handleOk,
			handleCancel,
		};
	},
});
</script>
