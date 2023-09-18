<template>
	<a-form :modal="modelRef" v-bind="getFormBind" :class="[ns.b()]">
		<template v-for="schema in schemasRef" :key="schema">
			<FormItem v-bind="getFormItemBind(schema.formItemProps || {}, schema.field)">
				<component
					:is="getFormItemType(schema.type)"
					v-model:[getModalBind(getFormItemType(schema.type))]="modelRef[schema.field]"
					v-bind="schema.props"
				>
					<template v-for="slot in Object.keys($slots)" #[getSlotName(slot)]="record" :key="`${getSlotName(slot)}_${schema.slot}`">
						<slot v-bind="record" :key="`${getSlotName(slot)}_${schema.slot}_slot`" :name="[`${getSlotName(slot)}_${schema.slot}`]" />
					</template>
				</component>
			</FormItem>
		</template>
	</a-form>
	<!-- <ProUpload /> -->
</template>

<script lang="ts" setup>
import { provide, toRefs, reactive } from 'vue';
import { formProps } from './form';
import { useForm, useFormStyle } from '../hooks';
// import { formContextKey } from '../../../tokens';
import FormItem from './form-item.vue';

const props = defineProps(formProps);
const emits = defineEmits(['register']);

const { ns } = useFormStyle();

const {
	modelRef,
	schemasRef,
	getFormBind,
	getModalBind,
	getFormItemType,
	getFormItemBind,
	getSlotName,
	setProps,
	addField,
	removeField,
	submit,
	reset,
	validate,
	validateField,
	clearValidate,
} = useForm(props);

emits('register', {
	modelRef,
	props,
	setProps,
	addField,
	removeField,
	submit,
	reset,
	validate,
	validateField,
	clearValidate,
});

provide(
	Symbol('formContextKey'),
	reactive({
		...toRefs(props),
		// emits

		setProps,
		addField,
		removeField,
		submit,
		reset,
		validate,
		validateField,
		clearValidate,
	})
);
</script>
