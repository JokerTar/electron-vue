<template>
	<div>
		<ProForm @register="register" />
		<a-button @click="submit">submit</a-button>
		<a-button @click="reset">reset</a-button>

		<ProTable @register="registerTable"></ProTable>

		<a-button @click="open">open modal</a-button>

		<ProModal @register="registerModal" :closable="true" title="aaa" height="200px">
			ssss
			<!-- <template #title>xxx</template> -->
			<template #extra>extra</template>

			<template #cancelText>abc</template>
		</ProModal>
	</div>
</template>
<script lang="ts" setup>
// import { ref } from 'vue';
import { useProForm, useProTable, useProModal } from '@renderer/pro-components';
import type { FormProps, TableProps } from '@renderer/pro-components';
const [register, { submit, reset }] = useProForm({
	name: 'f1',
	// layout: 'inline',
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
				labelCol: { style: { width: '100px' } },
				schemas: [
					{
						type: 'input',
						field: 'a22',
						formItemProps: {
							label: 'a22',
						},
					},

					{
						type: 'form',
						field: 'form3',
						formItemProps: {
							label: 'form3',
						},
						props: {
							name: 'f3',
							labelCol: { style: { width: '100px' } },
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

		{
			type: 'table',
			field: 'table',
			formItemProps: {
				label: 'table',
			},
			props: {
				name: 'table',
				dataSource: [
					{
						name: '123',
					},
				],
				columns: [
					{
						title: '姓名',
						dataIndex: 'name',
					},
					{
						title: '年龄',
						dataIndex: 'age',
						type: 'input',
						rules: [
							{
								required: true,
								message: '地址是必填项，长度不能超过4',
								max: 4,
							},
						],
						props: {
							async oninput(...args) {
								console.log('onChange', args);
								const result = await args[1].getInterface('f3');
								console.log('result', result);
							},

							// onchange() {},
						},
					},
				],
			} as TableProps,
		},
	],
	onSubmit(params) {
		console.log('params', params);
	},
});

const [registerTable] = useProTable({
	dataSource: [
		{
			name: '123',
		},
	],
	columns: [
		{
			title: '姓名',
			dataIndex: 'name',
		},
		{
			title: '地址',
			dataIndex: 'address',
			type: 'input',
			rules: [
				{
					required: true,
					message: '地址是必填项，长度不能超过4',
					max: 4,
				},
			],
		},
	],
});

const [registerModal, { open }] = useProModal({
	title: 'modal title',
	tabs: {
		// type: 'card',
		tabPosition: 'left',
		tabsPane: [
			{
				tab: 'a',
				tabKey: '1',
			},
			{
				tab: 'b',
				tabKey: '2',
			},
			{
				tab: 'c',
				tabKey: '3',
			},
			{
				tab: 'd',
				tabKey: '4',
			},
			{
				tab: 'e',
				tabKey: '5',
			},
			{
				tab: 'f',
				tabKey: '6',
			},
			{
				tab: 'g',
				tabKey: '7',
			},
			{
				tab: 'h',
				tabKey: '8',
			},
			{
				tab: 'p',
				tabKey: '9',
			},
		],
	},
});
</script>
