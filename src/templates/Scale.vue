<script setup>

const props = defineProps({
	steps: Number,
	value: Number
});
</script>

<template>
	<div class="relative flex items-center justify-between w-36 h-1 rounded-full bg-gray-800 *:rounded-full">
		<div
			v-for="i in parseInt(steps)"
			class="size-3 -mx-1.5"
			:class="i <= parseInt(value) ? 'bg-gray-50' : 'bg-gray-800'"
		></div>
		<div class="absolute h-full bg-gray-50" :style="{ width: 100 * (value - 1) / (steps - 1) + '%' }"></div>
	</div>
</template>