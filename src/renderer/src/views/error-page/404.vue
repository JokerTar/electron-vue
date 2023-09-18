<template>
	<a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
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
