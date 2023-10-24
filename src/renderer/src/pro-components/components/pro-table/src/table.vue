<template>
	<a-form ref="formRef" :model="formDataRef" name="custom-validation">
		<a-table v-bind="getTableBind" :class="[ns.b()]" :columns="columnsRef" :data-source="formDataRef.dataSource">
			<template #bodyCell="{ column, index, record: tableRecord }">
				<!-- <a-form-item :name="['dataSource', index, column?.dataIndex]" :rules="column?.rules" v-bind="column?.formItemProps"> -->
				<BodyCell :column="column" :index="index" :record="tableRecord" v-model:value="tableRecord[column?.dataIndex]" />
				<!-- </a-form-item> -->
			</template>
		</a-table>
	</a-form>
</template>

<script lang="ts" setup>
import { inject } from 'vue';
import { tableProps, tableEmits } from './table';
import { useTable, useTableStyle } from '../hooks';
import BodyCell from '../components/bodyCell.vue';

const props = defineProps(tableProps);
const emits = defineEmits(tableEmits);

const { formRef, getTableBind, formDataRef, columnsRef, saveInjectInRoot } = useTable(props, emits);
const { ns } = useTableStyle();

if (props.rootName && props.name) {
	const rootInjectQueueMap = inject(props.rootName) as Map<string, any>;
	saveInjectInRoot(props.name, rootInjectQueueMap);
}
</script>
