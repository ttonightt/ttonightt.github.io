<script setup>
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
import Emblem from "./templates/Emblem.vue";
import Scale from "./templates/Scale.vue";
import { ref } from "vue";

const tabIndex = ref(0);

const setTabIndex = index => tabIndex.value = index;

</script>

<template>
	<div class="bg-gray-900 w-screen h-screen max-h-screen overflow-hidden flex items-center justify-center text-gray-300">
		<div class="flex align-start gap-7 py-10h max-h-full">
			<div class="flex flex-col w-15w items-end">
				<Emblem color="#fff" />
				<h1 v-if="tabIndex === 0">Mykhailo Astashenkov</h1>
				<h3 v-if="tabIndex !== 0" class="h3 text-right">Mykhailo Astashenkov</h3>
				<h5 class="text-right">Full stack</h5>
				<h5 class="text-right">Web development enthusiast from Slovenia</h5>
			</div>
			<div class="w-0.5 bg-gray-700 basis-0.5 shrink-0" :class="tabIndex === 0 ? 'hidden' : ''"></div>
			<TabGroup @change="setTabIndex">
				<TabPanels class="w-40w overflow-y-scroll overflow-x-visible" :class="tabIndex === 0 ? 'hidden' : ''">
					<TabPanel></TabPanel>
					<TabPanel>
						<h3>React.js</h3>
						<Scale steps="3" value="2" />
						<h3>Vue</h3>
						<Scale steps="3" value="2" />
						<h3>Tailwind CSS v3</h3>
						<Scale steps="3" value="2" />
						<h3>Tailwind CSS v4</h3>
						<Scale steps="3" value="1" />
						<h3>Express.js</h3>
						<Scale steps="3" value="1" />
						<h3>bcrypt</h3>
						<Scale steps="3" value="1" />
						<h3>jwt</h3>
						<Scale steps="3" value="1" />
						<h3>Redux</h3>
						<Scale steps="3" value="1" />
						<h3>Tanstack (React) Query</h3>
						<Scale steps="3" value="1" />
						<h3>Joy UI</h3>
						<Scale steps="3" value="1" />
						<h3>Headless UI</h3>
						<Scale steps="3" value="1" />
						<h3>Vitest</h3>
						<Scale steps="3" value="1" />
						<h3>Playwright</h3>
						<Scale steps="3" value="1" />
						<h3>Mongo DB</h3>
						<Scale steps="3" value="1" />
						<h3>Mongoose</h3>
						<Scale steps="3" value="1" />
						<h3>WebGL</h3>
						<Scale steps="3" value="1" />
						<h3>three.js</h3>
						<Scale steps="3" value="1" />
					</TabPanel>
					<TabPanel>Projects</TabPanel>
				</TabPanels>
				<div class="w-0.5 bg-gray-700 basis-0.5 shrink-0"></div>
				<TabList class="flex align-start justify-center flex-col gap-2 *:bg-gray-800 *:rounded-full *:py-1 *:px-3 *:w-fit *:cursor-pointer">
					<Tab>About</Tab>
					<Tab>Skills</Tab>
					<Tab>Projects</Tab>
				</TabList>
			</TabGroup>
		</div>
	</div>
</template>

<style>

</style>