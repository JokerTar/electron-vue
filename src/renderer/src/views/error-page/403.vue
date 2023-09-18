<template>
	<a-result status="403" title="403" sub-title="Sorry, you don't have access to this page.">
		<template #extra>
			<a-button type="primary" @click="toHome"> Back Home </a-button>
		</template>
	</a-result>
</template>

<script setup lang="ts">
// @ts-ignore
import router from '@renderer/router';
// @ts-ignore
import { homePath } from '@renderer/settings';
function toHome() {
	router.push({ path: homePath });
}
</script>
