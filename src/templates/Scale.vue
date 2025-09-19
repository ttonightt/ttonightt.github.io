<script setup>
import { useTemplateRef } from 'vue';


const props = defineProps([ "steps", "value", "class" ]);
</script>

<template>
	<div class="p-1 box-border" :class="props.class">
		<div class="relative flex items-center justify-between w-full h-0.5 rounded-full bg-gray-800 *:rounded-full">
			<div
				v-for="i in parseInt(steps)"
				class="size-2 -mx-1"
				:class="i <= parseInt(value) ? 'bg-current' : 'bg-gray-800'"
			></div>
			<div class="absolute h-full bg-current" :style="{ width: 100 * (value - 1) / (steps - 1) + '%' }"></div>
		</div>
	</div>
</template>