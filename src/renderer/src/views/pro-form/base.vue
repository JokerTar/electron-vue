<!--
 * @Author: TRF
 * @Date: 2023-09-18 16:40:17
 * @LastEditors: TRF
 * @LastEditTime: 2023-10-04 17:42:33
 * @FilePath: \electron-vue\src\renderer\src\views\pro-form\base.vue
 * @Description:
 *
-->
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
import type { FormProps } from '@renderer/pro-components';
const modelRef = ref({});
const [register, { submit }] = useProForm({
	name: 'f1',
	model: modelRef,
	layout: 'inline',
	schemas: [
		{
			type: 'input',
			field: 'a',
			formItemProps: {
				label: 'a11',
				required: true,
				// rules: [],
			},
			props: {
				onClick(...args) {
					console.log(args);
				},
			},
		},
		{
			type: 'form',
			field: 'form2',
			formItemProps: {
				label: 'form2',
			},
			props: {
				name: 'f2',
				schemas: [
					{
						type: 'input',
						field: 'a22',
					},

					{
						type: 'form',
						field: 'form3',
						formItemProps: {
							label: 'form3',
						},
						props: {
							name: 'f3',
							schemas: [
								{
									type: 'input',
									field: 'a33',
									formItemProps: {
										label: 'a33',
										required: true,
									},
									props: {
										async onClick(...args) {
											console.log('a33', args);
											const f1 = await args[1].getInterface('f1');
											console.log('f1', f1);
										},
									},
								},
							],
						} as FormProps,
					},
				],
			} as FormProps,
		},
	],
	onSubmit(params) {
		console.log('params', params);
	},
});
</script>
