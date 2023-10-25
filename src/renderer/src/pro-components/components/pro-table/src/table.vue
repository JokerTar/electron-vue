<template>
	<div :class="[ns.b()]">
		<div :class="[ns.b('search')]">
			<ProForm @register="registerForm"></ProForm>
		</div>
		<div :class="[ns.b('mian')]">
			<div :class="[ns.b('toolbar')]"></div>
			<div :class="[ns.b('wrapper')]">
				<a-form ref="formRef" :model="formDataRef">
					<a-table v-bind="getTableBind" :pagination="false" :columns="columnsRef" :data-source="formDataRef.dataSource">
						<template #bodyCell="{ column, index, record }">
							<BodyCell :column="column" :index="index" :record="record" v-model:value="record[column?.dataIndex]" />
						</template>
					</a-table>
				</a-form>
			</div>
		</div>

		<div :class="[ns.b('pagination')]">
			<Pagination />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { inject } from 'vue';
import { tableProps, tableEmits } from './table';
import { useTable, useTableStyle } from '../hooks';
import BodyCell from '../components/bodyCell.vue';
import Pagination from '../components/pagination.vue';

const props = defineProps(tableProps);
const emits = defineEmits(tableEmits);

const { formRef, getTableBind, formDataRef, columnsRef, registerForm, saveInjectInRoot } = useTable(props, emits);
const { ns } = useTableStyle();

if (props.rootName && props.name) {
	const rootInjectQueueMap = inject(props.rootName) as Map<string, any>;
	saveInjectInRoot(props.name, rootInjectQueueMap);
}
</script>

<style lang="less">
.pro-table {
	&-pagination {
		display: flex;
		justify-content: flex-end;
		padding: 24px 0;
	}
}
</style>
