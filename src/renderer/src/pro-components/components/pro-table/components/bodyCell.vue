<template>
	<a-form-item :name="['dataSource', index, column?.dataIndex]" :rules="columnRulesRef" v-bind="column?.formItemProps">
		<template v-if="columnTypeRef === 'index'">
			<div class="pro-table-cell">
				{{ index || 0 + 1 }}
			</div>
		</template>

		<template v-if="columnTypeRef === 'option'">
			<div class="pro-table-cell">
				<a-space size="small">
					<template v-for="item in column?.actions.filter((o) => (o?.isShow ? o?.isShow(toRaw(record)) : true)) || []" :key="item">
						<a-button v-if="item?.type === 'button' || !item.type" size="small" type="link" v-bind="item.props" @click="OptionEvent(item)">
							{{ item?.label }}
						</a-button>

						<a-dropdown v-if="item?.type === 'dropdown'" size="small">
							<a-button size="small" @click.prevent type="link">
								<ellipsis-outlined />
							</a-button>
							<template #overlay>
								<a-menu>
									<a-menu-item v-for="dropdown in item?.items || []" :key="dropdown" @click="OptionEvent(dropdown)">
										{{ dropdown?.label }}
									</a-menu-item>
								</a-menu>
							</template>
						</a-dropdown>
					</template>
				</a-space>
			</div>
		</template>

		<template v-if="columnTypeRef === 'image'">
			<div class="pro-table-cell">
				<div class="pro-table-cell-ellipsis-wrap">
					<a-image :src="getValue" width="42px" v-bind="getBind" />
					<div v-if="column?.copyable">
						<a-button type="link" size="small" @click="CopyEvent(getOptionsLabel(cacheOptions, getValue) || getValue)">
							<copy-outlined v-if="!copyFlag" />
							<check-outlined v-else />
						</a-button>
					</div>
				</div>
			</div>
		</template>

		<template v-else-if="columnTypeRef === 'link'">
			<div class="pro-table-cell">
				<div class="pro-table-cell-ellipsis-wrap">
					<div ref="containerWrapRef" :class="['ant-table-cell', hasEllipsis ? 'ant-table-cell-ellipsis' : '', column?.edit ? 'has-edit' : '']">
						<router-link v-if="getValue" :to="getValue">{{ getValue }}</router-link>
						<a-button v-else type="link">
							{{ getValue }}
						</a-button>
					</div>
					<div v-if="column?.copyable">
						<a-button type="link" size="small" @click="CopyEvent(getOptionsLabel(cacheOptions, getValue) || getValue)">
							<copy-outlined v-if="!copyFlag" />
							<check-outlined v-else />
						</a-button>
					</div>
				</div>
			</div>
		</template>

		<template v-else-if="columnTypeRef === 'tag'">
			<div class="pro-table-cell">
				<div :class="['ant-table-cell', hasEllipsis ? 'ant-table-cell-ellipsis' : '', column?.edit ? 'has-edit' : '']">
					<template v-if="Array.isArray(parse)">
						<a-tag v-for="(item, index) in parse" :key="index" v-bind="item?.props ? item?.props : {}">
							{{ isObject(item) ? item.label : item }}
						</a-tag>
					</template>

					<template v-else>
						<div v-if="isEmpty(getValue)" v-bind="getBind">{{ getValue }}</div>
						<a-tag v-else v-bind="getBind">{{ getValue }}</a-tag>
					</template>
				</div>
			</div>
		</template>

		<!-- 表单类 -->
		<template v-else-if="getFormItemType(columnTypeRef)">
			<component
				:is="getFormItemType(columnTypeRef)"
				ref="formComRef"
				v-bind="getBind"
				v-model:[getModalBind(getFormItemType(columnTypeRef))]="modalValue"
				@change="EventChange"
				@blur="EventBlur"
			/>
		</template>

		<template v-else>
			<div class="pro-table-cell">
				<div class="pro-table-cell-ellipsis-wrap">
					<div
						ref="containerWrapRef"
						:class="['ant-table-cell', hasEllipsis ? 'ant-table-cell-ellipsis' : '', column?.edit ? 'has-edit' : '']"
						@click="EventClick"
					>
						<a-tooltip placement="top">
							<template #title v-if="overFlowing">
								<span>{{ getOptionsLabel(cacheOptions, getValue) || getValue }}</span>
							</template>
							<span ref="containerRef">{{ getOptionsLabel(cacheOptions, getValue) || getValue }}</span>
						</a-tooltip>
					</div>
					<div v-if="column?.copyable">
						<a-button type="link" size="small" @click="CopyEvent(getOptionsLabel(cacheOptions, getValue) || getValue)">
							<copy-outlined v-if="!copyFlag" />
							<check-outlined v-else />
						</a-button>
					</div>
				</div>
			</div>
		</template>
	</a-form-item>
</template>
<script lang="ts">
import { ref, defineComponent, computed, nextTick, onMounted, toRaw } from 'vue';
import type { PropType } from 'vue';
import type { IExtarColumns } from '../src/table';
import { isFunction, isObject, isEmpty, getOptionsLabel, copy } from '@/utils';
import { omit, get } from 'lodash-es';
import { componentsAlias } from './componentAlias';
import { CopyOutlined, CheckOutlined, EllipsisOutlined } from '@ant-design/icons-vue';
import { useMessage } from '../../../hooks';

export default defineComponent({
	components: {
		CopyOutlined,
		CheckOutlined,
		EllipsisOutlined,
	},

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
		const containerWrapRef = ref();
		const containerRef = ref();
		const isEditRef = ref(false);
		const columnTypeRef = ref(props.column?.type);
		const columnRulesRef = ref(props.column?.rules);
		const copyFlag = ref(false);
		const overFlowingFlag = ref();

		let cacheOptions = ref(props?.column?.edit?.props?.options);

		const { createConfirm } = useMessage();

		onMounted(() => {
			overFlowingFlag.value = containerRef.value?.offsetWidth > containerWrapRef.value?.offsetWidth;
		});

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
			return getLabel.value || get(props.record, props.column?.dataIndex);
		});

		const getLabel = computed(() => {
			if (!cacheOptions.value || !Array.isArray(cacheOptions.value) || !cacheOptions.value.length) return;

			return getOptionsLabel(cacheOptions.value, getBind.value);
		});

		const parse = computed(() => {
			if (props?.column?.props?.parse && isFunction(props.column.props.parse)) {
				return props.column.props.parse(props.record);
			} else {
				return props?.record?.[props?.column?.dataIndex];
			}
		});

		const hasEllipsis = computed(() => {
			return props?.column?.ellipsis === true;
		});

		const overFlowing = computed(() => {
			if (!containerRef.value || !containerWrapRef.value) return overFlowingFlag;
			return containerRef.value?.offsetWidth > containerWrapRef.value?.offsetWidth;
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

		const CopyEvent = (val) => {
			if (!props?.column?.copyable || copyFlag.value) return;
			copy(val);
			copyFlag.value = true;

			setTimeout(() => {
				copyFlag.value = false;
			}, 3000);
		};

		const OptionEvent = (item) => {
			if (item.popConfirm) {
				const params = {};

				for (const key in item.popConfirm) {
					if (Object.prototype.hasOwnProperty.call(item.popConfirm, key)) {
						if (isFunction(item.popConfirm[key])) {
							params[key] = item.popConfirm[key](toRaw(props.record), props.index);
						} else {
							params[key] = item.popConfirm[key];
						}
					}
				}

				createConfirm({
					...params,
				});
			} else if (item.onClick && isFunction(item.onClick)) {
				item.onClick(toRaw(props.record), props.index);
			}
		};

		return {
			modalValue,
			getBind,
			getValue,
			cacheOptions,
			parse,
			getModalBind,
			getFormItemType,
			hasEllipsis,
			overFlowing,
			formComRef,
			containerWrapRef,
			containerRef,
			isEditRef,
			columnTypeRef,
			columnRulesRef,
			copyFlag,
			toRaw,
			isObject,
			isEmpty,
			EventChange,
			EventClick,
			EventBlur,
			getOptionsLabel,
			CopyEvent,
			OptionEvent,
		};
	},
});
</script>
<style lang="less">
.pro-table {
	.has-edit {
		cursor: pointer;
		width: 100%;
		min-height: 24px;
	}

	.pro-table-cell {
		.pro-table-cell-ellipsis-wrap {
			display: flex;
			justify-content: space-between;
		}
	}
}
</style>
