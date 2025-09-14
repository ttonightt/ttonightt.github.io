<script setup>
import Emblem from "./templates/Emblem.vue";
import Scale from "./templates/Scale.vue";



</script>

<template>
	<div class="bg-gray-900 w-screen h-screen flex items-center justify-center text-gray-300">
		<div class="flex align-start">
			<Emblem color="#fff" />
			<div>
				<h3>React.js</h3>
				<Scale steps="3" value="2" />
				<h3>Vue</h3>
				<Scale steps="3" value="2" />
				<h3>Tailwind CSS v3</h3>
				<Scale steps="3" value="2" />
				<h3>Tailwind CSS v4</h3>
				<Scale steps="3" value="1" />
			</div>
			<div class="flex flex-row-reverse gap">
				<div class="flex align-start flex-col gap-2 *:bg-gray-800 *:rounded-full *:py-1 *:px-3 *:w-fit *:cursor-pointer">
					<div>About</div>
					<div>Skills</div>
					<div>Projects</div>
				</div>
				<div class="w-0.5 bg-gray-700"></div>
				<div class="">
					<div>Hello</div>
					<div>World</div>
					<div>2</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>

</style>