<template>
	<div>
		{{ modelRef }}
		<ProForm @register="register" />
		<a-button @click="submit">submit</a-button>
	</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useProForm } from '@renderer/pro-components';
const modelRef = ref({});
const [register, { submit }] = useProForm({
	name: 'xx',
	model: modelRef,
	schemas: [
		{
			type: 'input',
			field: 'a',
			formItemProps: {
				label: 'a',
				required: true,
				// rules: [],
			},
		},
	],
	onSubmit(params) {
		console.log('params', params);
	},
});
</script>
