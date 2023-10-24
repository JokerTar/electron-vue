import { isObject } from 'lodash-es';
<template>
	<a-form-item :name="['dataSource', index, column?.dataIndex]" :rules="columnRulesRef" v-bind="column?.formItemProps">
		<!-- <BodyCell :column="column" :index="index" :record="tableRecord" v-model:value="tableRecord[column?.dataIndex]" /> -->

		<template v-if="columnTypeRef === 'image'">
			<a-image :src="getValue" width="42px" v-bind="getBind" />
		</template>

		<template v-else-if="columnTypeRef === 'link'">
			<router-link v-if="getValue" :to="getValue">{{ getValue }}</router-link>
			<a-button v-else type="link">
				{{ getValue }}
			</a-button>
		</template>

		<template v-else-if="columnTypeRef === 'tag'">
			<template v-if="Array.isArray(parse)">
				<a-tag v-for="(item, index) in parse" :key="index" v-bind="item?.props ? item?.props : {}">{{ isObject(item) ? item.label : item }}</a-tag>
			</template>
			<template v-else>
				<div v-if="isEmpty(getValue)" v-bind="getBind">{{ getValue }}</div>
				<a-tag v-else v-bind="getBind">{{ getValue }}</a-tag>
			</template>
		</template>

		<!-- 表单类 -->
		<template v-else-if="getFormItemType(columnTypeRef)">
			<component
				:is="getFormItemType(columnTypeRef)"
				ref="formComRef"
				v-model:[getModalBind(getFormItemType(columnTypeRef))]="modalValue"
				@change="EventChange"
				@blur="EventBlur"
				v-bind="getBind"
			/>
		</template>

		<template v-else>
			<div :class="['ant-table-cell', hasEllipsis ? 'ant-table-cell-ellipsis' : '', column.edit ? 'has-edit' : '']" @click="EventClick">
				{{ getValue }}
			</div>
		</template>
	</a-form-item>
</template>
<script lang="ts">
import { ref, defineComponent, computed, nextTick } from 'vue';
import type { PropType } from 'vue';
import type { IExtarColumns } from '../src/table';
import { isFunction, isObject, isEmpty } from '@/utils';
import { omit, get } from 'lodash-es';
import { componentsAlias } from './componentAlias';

export default defineComponent({
	props: {
		type: String as PropType<IExtarColumns['type']>,

		column: {
			type: Object,
		},

		index: {
			type: Number,
		},

		record: {
			type: Object,
		},

		props: {
			type: Object,
		},

		value: {
			type: [String, Number],
		},
	},

	emits: ['change', 'update:value'],

	setup(props, { emit }) {
		const modalValue = ref(get(props.record, props.column?.dataIndex));
		const formComRef = ref();
		const isEditRef = ref(false);
		const columnTypeRef = ref(props.column?.type);
		const columnRulesRef = ref(props.column?.rules);

		const EventChange = (e) => {
			if (isObject(e) && isObject(e.target)) {
				emit('change', e.target.value);
				emit('update:value', e.target.value);
			} else {
				emit('change', e);
				emit('update:value', e);
			}
		};

		// 获取表单绑定属性
		const getModalBind = computed(() => {
			return (type) => {
				if (type === 'a-switch' || type === 'a-radio') return 'checked';
				if (type === 'upload') return 'file-list';
				return 'value';
			};
		});

		// 获取表单类型
		const getFormItemType: any = (type) => {
			if (componentsAlias[type]) return componentsAlias[type];
			return type;
		};

		const getBind = computed(() => {
			if (!isEditRef.value) {
				return omit(props.column?.props, ['onChange', 'change', 'change']);
			} else {
				return omit(props.column?.edit.props, ['onChange', 'change', 'change']);
			}
		});

		const getValue = computed(() => {
			return get(props.record, props.column?.dataIndex);
		});

		const parse = computed(() => {
			if (props?.column?.props?.parse && isFunction(props.column.props.parse)) {
				return props.column.props.parse(props.record);
			} else {
				return props?.record[props?.column?.dataIndex];
			}
		});

		const hasEllipsis = computed(() => {
			return props?.column?.ellipsis === true;
		});

		const targetEditType = () => {
			if (!props.column?.edit) return;

			if (!isEditRef.value) {
				columnTypeRef.value = props.column.edit.type;
				columnRulesRef.value = props.column.edit.rules;
			} else {
				columnTypeRef.value = props.column.type;
				columnRulesRef.value = props.column.rules;
			}

			isEditRef.value = !isEditRef.value;
		};

		const EventClick = () => {
			targetEditType();
			nextTick(() => {
				formComRef.value?.focus();
			});
		};

		const EventBlur = () => {
			targetEditType();
		};

		return {
			modalValue,
			getBind,
			getValue,
			EventChange,
			parse,
			isObject,
			isEmpty,
			getModalBind,
			getFormItemType,
			hasEllipsis,
			formComRef,
			isEditRef,
			EventClick,
			EventBlur,
			columnTypeRef,
			columnRulesRef,
		};
	},
});
</script>
<style lang="less">
.pro-table .has-edit {
	cursor: pointer;
	width: 100%;
	min-height: 24px;
}
</style>
