<script setup>
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
import Emblem from "./templates/Emblem.vue";
import Scale from "./templates/Scale.vue";
import { ref } from "vue";

const tabIndex = ref(0);

const setTabIndex = index => tabIndex.value = index;

</script>

<template>
	<div class="bg-gray-900 w-screen min-h-screen flex items-center justify-center text-gray-300">
		<div class="flex gap-7">
			<div class="py-10h flex flex-col w-15w items-end sticky top-0 self-start">
				<Emblem color="#fff" />
				<h1 v-if="tabIndex === 0">Mykhailo Astashenkov</h1>
				<h3 v-if="tabIndex !== 0" class="h3 text-right">Mykhailo Astashenkov</h3>
				<h5 class="text-right">Full stack</h5>
				<h5 class="text-right">Web development enthusiast from Slovenia</h5>
			</div>
			<div class="w-0.5 max-h-screen sticky top-0 grad basis-0.5 shrink-0" :class="tabIndex === 0 ? 'hidden' : ''"></div>
			<TabGroup @change="setTabIndex">
				<TabPanels class="py-10h w-40w" :class="tabIndex === 0 ? 'hidden' : ''">
					<TabPanel></TabPanel>
					<TabPanel>
						<h3>React.js</h3>
						<Scale steps="3" value="2" class="w-36" />
						<h3>Vue</h3>
						<Scale steps="3" value="2" class="w-36" />
						<h3>Tailwind CSS v3</h3>
						<Scale steps="3" value="2" class="w-36" />
						<h3>Tailwind CSS v4</h3>
						<Scale steps="3" value="1" class="w-36" />
						<h3>Express.js</h3>
						<Scale steps="3" value="1" class="w-36" />
						<h3>bcrypt</h3>
						<Scale steps="3" value="1" class="w-36" />
						<h3>jwt</h3>
						<Scale steps="3" value="1" class="w-36" />
						<h3>Redux</h3>
						<Scale steps="3" value="1" class="w-36" />
						<h3>Tanstack (React) Query</h3>
						<Scale steps="3" value="1" class="w-36" />
						<h3>Joy UI</h3>
						<Scale steps="3" value="1" class="w-36" />
						<h3>Headless UI</h3>
						<Scale steps="3" value="1" class="w-36" />
						<h3>Vitest</h3>
						<Scale steps="3" value="1" class="w-36" />
						<h3>Playwright</h3>
						<Scale steps="3" value="1" class="w-36" />
						<h3>Mongo DB</h3>
						<Scale steps="3" value="1" class="w-36" />
						<h3>Mongoose</h3>
						<Scale steps="3" value="1" class="w-36" />
						<h3>WebGL</h3>
						<Scale steps="3" value="1" class="w-36" />
						<h3>three.js</h3>
						<Scale steps="3" value="1" class="w-36" />

						<h3>Joy UI</h3>
						<Scale steps="3" value="1" class="w-36" />
						<h3>Headless UI</h3>
						<Scale steps="3" value="1" class="w-36" />
						<h3>Vitest</h3>
						<Scale steps="3" value="1" class="w-36" />
						<h3>Playwright</h3>
						<Scale steps="3" value="1" class="w-36" />
						<h3>Mongo DB</h3>
						<Scale steps="3" value="1" class="w-36" />
						<h3>Mongoose</h3>
						<Scale steps="3" value="1" class="w-36" />
						<h3>WebGL</h3>
						<Scale steps="3" value="1" class="w-36" />
						<h3>three.js</h3>
						<Scale steps="3" value="1" class="w-36" />
					</TabPanel>
					<TabPanel>Projects</TabPanel>
				</TabPanels>
				<div class="w-0.5 grad max-h-screen sticky top-0 grad basis-0.5 shrink-0"></div>
				<TabList class="max-h-screen flex items-center">
					<div class="flex flex-col sticky top-10h gap-2 *:bg-gray-800 *:rounded-full *:py-1 *:px-3 *:w-fit *:cursor-pointer">
						<Tab>Me myself</Tab>
						<Tab>What do I know</Tab>
						<Tab>What have I done</Tab>
					</div>
				</TabList>
			</TabGroup>
		</div>
	</div>
</template>

<style>

</style>