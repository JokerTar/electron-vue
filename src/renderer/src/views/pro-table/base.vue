<template>
	<div class="page-view">
		<ProTable @register="registerTable"></ProTable>
	</div>
</template>
<script lang="ts" setup>
import { useProTable } from '@renderer/pro-components';
// import type { TableProps } from '@renderer/pro-components';

const [registerTable] = useProTable({
	dataSource: [
		{
			name: 'name Long Column Long Column Long Column',
			image: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
			link: 'https://www.baidu.com/',
			tag: 'tag',
			select: '11',
			age: 18,
		},
	],
	columns: [
		{
			title: '排序',
			type: 'index',
			width: 60,
			align: 'center',
		},
		{
			title: '姓名',
			dataIndex: 'name',

			ellipsis: true,
			copyable: true,

			edit: {
				type: 'input',
				rules: [
					{
						required: true,
						message: '这一项是必填的',
					},
				],
			},
		},
		{
			title: '年龄',
			dataIndex: 'age',

			type: 'input',
			rules: [
				{
					required: true,
					message: '地址是必填项，长度不能超过4',
					// max: 4,
				},
			],
			props: {
				async oninput(...args) {
					console.log('onChange', args);
				},
			},
		},

		{
			title: 'select',
			dataIndex: 'select',

			rules: [
				{
					required: true,
					message: '11select is required',
				},
			],

			edit: {
				type: 'select',
				rules: [
					{
						required: true,
						message: '22select is required',
					},
				],
				props: {
					allowClear: true,
					options: [
						{
							label: 'aa',
							value: '11',
						},
						{
							label: 'bb',
							value: '22',
						},
					],
					async onChange(...args) {
						console.log('onChange', args);
						const result = await args[1].getInterface('f3');
						console.log('result', result);
					},

					// onchange() {},
				},
			},
		},

		{
			title: 'image',
			dataIndex: 'image',

			type: 'image',
			props: {
				// width: '42px',
				// src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
			},
		},

		{
			title: 'link',
			dataIndex: 'link',
			width: '8%',
			type: 'link',
			ellipsis: true,
			copyable: true,

			props: {
				target: '',
			},
		},

		{
			title: 'tag',
			dataIndex: 'tag',

			type: 'tag',
			props: {
				color: '#333',
				// parse() {
				// 	return [{ label: '11', props: { color: '#333' } }, '22'];
				// },
			},
		},

		{
			title: '操作',
			type: 'option',

			actions: [
				{
					label: '编辑',
					onClick: (record) => {
						console.log('onClick', record);
					},
					props: {},
					auth: 'shop_platform_update_shop',
				},

				{
					label: '详情',
					isShow(record) {
						return record?.age == 18;
					},
					onClick: (record) => {
						console.log('onClick', record);
					},
					props: {},
					auth: 'shop_platform_update_shop',
				},

				{
					label: '删除',
					popConfirm: {
						title: '确定删除',
						onOk(...args) {
							console.log('args', args);
						},
					},
					props: {
						danger: true,
					},
					auth: 'shop_platform_update_shop',
				},

				{
					auth: 'shop_platform_update_shop',
					type: 'dropdown',
					items: [
						{
							label: '复制',
							onClick: (record) => {
								console.log('onClick', record);
							},
						},
					],
				},
			],
		},
	],
});
</script>
