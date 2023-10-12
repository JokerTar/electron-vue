<template>
	<a-form :modal="modelRef" v-bind="getFormBind" :class="[ns.b()]">
		<template v-for="schema in schemasRef" :key="schema">
			<FormItem v-bind="getFormItemBind(schema.formItemProps || {}, schema.field)" :type="schema.type">
				<component
					:is="getFormItemType(schema.type)"
					v-model:[getModalBind(getFormItemType(schema.type))]="modelRef[schema.field]"
					v-bind="schema.props"
					:rootName="rootName"
				>
					<template
						v-for="slot in Object.keys($slots)"
						#[getSlotName(slot)]="record"
						:key="`${getSlotName(slot)}_${schema.slot}`"
					>
						<slot
							v-bind="record"
							:key="`${getSlotName(slot)}_${schema.slot}_slot`"
							:name="[`${getSlotName(slot)}_${schema.slot}`]"
						/>
					</template>
				</component>
			</FormItem>
		</template>
	</a-form>
</template>

<script lang="ts" setup>
import { provide, inject } from 'vue';
import { formProps, formEmits } from './form';
import { useForm, useFormStyle } from '../hooks';
// import { formContextKey } from '../../../tokens';
import FormItem from './form-item.vue';

const props = defineProps(formProps);
const emits = defineEmits(formEmits);

const { ns } = useFormStyle();

const {
	modelRef,
	injectQueue,
	rootName,
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
	getInterface,
	saveInjectInRoot,
} = useForm(props, emits);

const formApi = {
	injectQueue,
	setProps,
	addField,
	removeField,
	submit,
	reset,
	validate,
	validateField,
	clearValidate,
	getInterface,
};

let injectQueueMap;
if (props.name && props.name === rootName.value) {
	saveInjectInRoot(props.name, formApi.injectQueue);
	provide(rootName.value, formApi.injectQueue);
	injectQueueMap = formApi.injectQueue;
} else if (rootName.value) {
	injectQueueMap = inject(rootName.value);
}

if (props.name && injectQueueMap) {
	saveInjectInRoot(props.name, injectQueueMap);
}
</script>
