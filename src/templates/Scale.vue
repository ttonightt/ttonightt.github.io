<script setup>

const props = defineProps([ "steps", "value", "class" ]);
</script>

<template>
	<div class="mx-1.5 my-1" :class="props.class">
		<div class="relative flex items-center justify-between w-full h-1 rounded-full bg-gray-800 *:rounded-full">
			<div
				v-for="i in parseInt(steps)"
				class="size-3 -mx-1.5"
				:class="i <= parseInt(value) ? 'bg-gray-50' : 'bg-gray-800'"
			></div>
			<div class="absolute h-full bg-gray-50" :style="{ width: 100 * (value - 1) / (steps - 1) + '%' }"></div>
		</div>
	</div>
</template>