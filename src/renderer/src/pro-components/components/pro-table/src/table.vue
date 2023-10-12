<template>
	<a-form ref="formRef" :model="formDataRef" name="custom-validation">
		<a-table :class="[ns.b()]" :columns="columnsRef" :data-source="formDataRef.dataSource">
			<template #bodyCell="{ column, index, record: tableRecord }">
				<template v-if="column?.type === 'input'">
					<a-form-item
						:name="['dataSource', index, column?.dataIndex]"
						:rules="column?.rules"
						v-bind="column?.formItemProps"
					>
						<a-input v-model:value="tableRecord[column?.dataIndex]" v-bind="column?.props" @change="EventChange" />
					</a-form-item>
				</template>
			</template>
		</a-table>
	</a-form>
</template>

<script lang="ts" setup>
import { inject } from 'vue';
import { tableProps, tableEmits } from './table';
import { useTable, useTableStyle } from '../hooks';

const props = defineProps(tableProps);
const emits = defineEmits(tableEmits);

const { formRef, formDataRef, columnsRef, EventChange, saveInjectInRoot } = useTable(props, emits);
const { ns } = useTableStyle();

if (props.rootName && props.name) {
	const rootInjectQueueMap = inject(props.rootName) as Map<string, any>;
	saveInjectInRoot(props.name, rootInjectQueueMap);
}
</script>
