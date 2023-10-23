<template>
	<div>
		<ProForm @register="register" />
		<a-button @click="submit">submit</a-button>
		<a-button @click="reset">reset</a-button>

		<ProTable @register="registerTable"></ProTable>

		<a-button @click="open">open modal</a-button>
		<a-button @click="openDrawer">open drawer</a-button>
		<a-button @click="openModalForm">open modal form</a-button>

		<ProModal @register="registerModal" :closable="true" title="aaa" height="200px">
			ssss
			<!-- <template #title>xxx</template> -->
			<template #extra>extra</template>

			<template #cancelText>abc</template>

			<template #leftExtra>
				<a-button class="tabs-extra-demo-button">Left Extra Action</a-button>
			</template>
			<template #rightExtra>
				<a-button>Right Extra Action</a-button>
			</template>
		</ProModal>

		<ProDrawer @register="registerDrawer" width="800px"></ProDrawer>

		<ProModalForm @register="registerModalForm" destroyOnClose width="980px"></ProModalForm>

		<br />
		<ProButton type="primary" :submit="handleButtonClick">pro button</ProButton>
	</div>
</template>
<script lang="ts" setup>
// import { ref } from 'vue';
import { useProForm, useProTable, useProModal, useProModalForm } from '@renderer/pro-components';
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
		type: 'card',
		tabPosition: 'top',
		value: '5',
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

const [registerDrawer, { open: openDrawer }] = useProModal({
	title: 'modal title',
	tabs: {
		// type: 'card',
		tabPosition: 'top',
		value: '5',
		tabsPane: [
			{
				tab: 'a',
				tabKey: '1',
				children: {
					type: 'pro-table',
					props: {
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
					},
				},
			},
			{
				tab: 'b',
				tabKey: '2',
				children: {
					type: 'pro-table',
					props: {
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
					},
				},
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
			{
				tab: 'q',
				tabKey: '10',
			},
			{
				tab: 'r',
				tabKey: '11',
			},
			{
				tab: 's',
				tabKey: '12',
			},
		],
		onChange(val) {
			console.log('change', val);
		},
		onTabClick(val) {
			console.log('tabsChange', val);
		},
	},
});

const [registerModalForm, { open: openModalForm }] = useProModalForm({
	title: 'modal form title 2',
	tabs: {
		type: 'card',
		tabsPane: [
			{
				tab: 'form-1',
				tabKey: '1',
				children: {
					name: 'form-1',
					// layout: 'inline',
					schemas: [
						{
							type: 'input',
							field: 'fa',
							formItemProps: {
								label: 'form-1',
								required: true,
								// rules: [],
							},
							props: {
								async onClick(...args) {
									console.log(args);
									const result = await args[1].getInterface('table');
									console.log('result', result);
								},
							},
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
										title: 'a-姓名',
										dataIndex: 'name',
									},
									{
										title: 'a-年龄',
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
												const result = await args[1].getInterface('form-1');
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
				},
			},

			{
				tab: 'form-2',
				tabKey: '2',
				children: {
					name: 'form-2',
					// layout: 'inline',
					schemas: [
						{
							type: 'input',
							field: 'fb',
							formItemProps: {
								label: 'form-2',
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
										title: 'b-姓名',
										dataIndex: 'name',
									},
									{
										title: 'b-年龄',
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
												const result = await args[1].getInterface('form-2');
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
				},
			},
		],
	},
	type: 'drawer',

	// formProps: {
	// 	name: 'f1',

	// 	// layout: 'inline',
	// 	formData: {},
	// 	schemas: [
	// 		{
	// 			type: 'input',
	// 			field: 'a',
	// 			formItemProps: {
	// 				label: 'a11',
	// 				required: true,
	// 				// rules: [],
	// 			},
	// 			props: {
	// 				async onClick(...args) {
	// 					console.log('a11', args);
	// 					const f1 = await args[1].getInterface('f1');
	// 					const f2 = await args[1].getInterface('f2');
	// 					const f3 = await args[1].getInterface('f3');
	// 					console.log('f1', f1);
	// 					console.log('f2', f2);
	// 					console.log('f3', f3);
	// 				},
	// 			},
	// 		},
	// 		{
	// 			type: 'form',
	// 			field: 'form2',
	// 			formItemProps: {
	// 				label: 'form2',
	// 			},
	// 			props: {
	// 				name: 'f2',
	// 				labelCol: { style: { width: '100px' } },
	// 				schemas: [
	// 					{
	// 						type: 'input',
	// 						field: 'a22',
	// 						formItemProps: {
	// 							label: 'a22',
	// 						},
	// 					},

	// 					{
	// 						type: 'form',
	// 						field: 'form3',
	// 						formItemProps: {
	// 							label: 'form3',
	// 						},
	// 						props: {
	// 							name: 'f3',
	// 							labelCol: { style: { width: '100px' } },
	// 							schemas: [
	// 								{
	// 									type: 'input',
	// 									field: 'a33',
	// 									formItemProps: {
	// 										label: 'a33',
	// 										required: true,
	// 									},
	// 									props: {
	// 										async onClick(...args) {
	// 											console.log('a33', args);
	// 											const f1 = await args[1].getInterface('f1');
	// 											const f2 = await args[1].getInterface('f2');
	// 											const f3 = await args[1].getInterface('f3');
	// 											console.log('f1', f1);
	// 											console.log('f2', f2);
	// 											console.log('f3', f3);
	// 										},
	// 									},
	// 								},
	// 							],
	// 						} as FormProps,
	// 					},
	// 				],
	// 			} as FormProps,
	// 		},

	// 		{
	// 			type: 'table',
	// 			field: 'table',
	// 			formItemProps: {
	// 				label: 'table',
	// 			},
	// 			props: {
	// 				name: 'table',
	// 				dataSource: [
	// 					{
	// 						name: '123',
	// 					},
	// 				],
	// 				columns: [
	// 					{
	// 						title: '姓名',
	// 						dataIndex: 'name',
	// 					},
	// 					{
	// 						title: '年龄',
	// 						dataIndex: 'age',
	// 						type: 'input',
	// 						rules: [
	// 							{
	// 								required: true,
	// 								message: '地址是必填项，长度不能超过4',
	// 								max: 4,
	// 							},
	// 						],
	// 						props: {
	// 							async oninput(...args) {
	// 								console.log('onChange', args);
	// 								const result = await args[1].getInterface('f3');
	// 								console.log('result', result);
	// 							},

	// 							// onchange() {},
	// 						},
	// 					},
	// 				],
	// 			} as TableProps,
	// 		},
	// 	],
	// 	onSubmit(params) {
	// 		console.log('params', params);
	// 		return Promise.reject();
	// 	},
	// },
});

const handleButtonClick = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log('handleButtonClick');
			resolve({});
		}, 1000);
	});
};
</script>
