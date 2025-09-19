<script setup>
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
import Emblem from "./templates/Emblem.vue";
import Scale from "./templates/Scale.vue";
import SupBadge from "./templates/SupBadge.vue";
import { ref } from "vue";

const tabIndex = ref(0);

const setTabIndex = index => tabIndex.value = index;

</script>

<template>
	<div class="bg-gray-900 w-screen min-h-screen flex items-center justify-center text-gray-300">
		<div class="py-10h flex gap-7">
			<div class="flex flex-col items-end sticky top-10h self-start duration-150" :class="tabIndex === 0 ? 'w-50' : 'w-30'">
				<Emblem color="#d8d8d8" width="200" height="200" x0="0" y0="16" class="w-full" />
				<h3 v-if="tabIndex === 0" class="font-extrabold text-gray-200">Mykhailo Astashenkov</h3>
				<h5 v-if="tabIndex !== 0" class="h3 text-right">Mykhailo Astashenkov</h5>
				<h6 class="text-right">Full stack</h6>
				<p class="text-right">Web development enthusiast from Slovenia</p>
			</div>
			<div class="w-0.5 max-h-80h sticky top-10h grad basis-0.5 shrink-0" :class="tabIndex === 0 ? 'hidden' : ''"></div>
			<TabGroup @change="setTabIndex">
				<TabPanels class="w-40w" :class="tabIndex === 0 ? 'hidden' : ''">
					<TabPanel></TabPanel>
					<TabPanel class="space-y-3">
						<h3>Client side</h3>
						<div class="grid grid-cols-2 gap-x-7 gap-y-3">
							<div>
								<h5>React.js</h5>
								<Scale steps="4" value="3" class="w-full text-gray-100" />
							</div>
							<div>
								<h5>Vue.js</h5>
								<Scale steps="4" value="1" class="w-full text-gray-100" />
							</div>
							<div>
								<h5>Redux</h5>
								<Scale steps="4" value="3" class="w-full text-gray-100" />
							</div>
							<div>
								<h5>Tanstack Query</h5>
								<Scale steps="4" value="2" class="w-full text-gray-100" />
							</div>
							<div>
								<h5>React Router</h5>
								<Scale steps="4" value="2" class="w-full text-gray-100" />
							</div>
							<div>
								<h5>Tailwind CSS</h5>
								<Scale steps="4" value="4" class="w-full text-gray-100" />
							</div>
							<div>
								<h5>HTML5, CSS3</h5>
								<Scale steps="4" value="4" class="w-full text-gray-100" />
							</div>
							<div>
								<h5>Vanilla JS</h5>
								<Scale steps="4" value="3" class="w-full text-gray-100" />
							</div>
							<div>
								<h5>three.js</h5>
								<Scale steps="4" value="1" class="w-full text-gray-100" />
							</div>
							<div>
								<h5>MUI, Joy UI</h5>
								<Scale steps="4" value="3" class="w-full text-gray-100" />
							</div>
							<div>
								<h5>Vitest</h5>
								<Scale steps="4" value="3" class="w-full text-gray-100" />
							</div>
						</div>
						<h3>Server side</h3>
						<div class="grid grid-cols-2 gap-x-7 gap-y-3">
							<div>
								<h5>Vanilla Node.js</h5>
								<Scale steps="4" value="2" class="w-full text-gray-100" />
							</div>
							<div>
								<h5>Express.js</h5>
								<Scale steps="4" value="3" class="w-full text-gray-100" />
							</div>
							<div>
								<h5>Mongoose</h5>
								<Scale steps="4" value="3" class="w-full text-gray-100" />
							</div>
							<div>
								<h5>Jest</h5>
								<Scale steps="4" value="3" class="w-full text-gray-100" />
							</div>
						</div>
						<h3>End-to-end</h3>
						<div class="grid grid-cols-2 gap-x-7 gap-y-3">
							<div>
								<h5>Playwright</h5>
								<Scale steps="4" value="3" class="w-full text-gray-100" />
							</div>
						</div>
					</TabPanel>
					<TabPanel class="space-y-3">
						<h2 class="text-gray-500">Pet Projects</h2>
						<div>
							<div class="flex flex-nowrap items-center gap-1">
								<h5 class="text-gray-100 grow">Catcity blog</h5>
								<a href="" class="px-2 border-2 border-gray-600 bg-gray-800 all-small-caps rounded-full">repo</a>
								<a href="" class="px-2 border-2 border-gray-600 bg-gray-800 all-small-caps rounded-full">demo</a>
							</div>
							<p>Fullstack MOOC final project</p>
						</div>
						<div>
							<div class="flex flex-nowrap items-center gap-1">
								<h5 class="text-gray-100 grow">QRumbles <SupBadge>dev</SupBadge></h5>
								<a href="" class="px-2 border-2 border-gray-600 bg-gray-800 all-small-caps rounded-full">repo</a>
							</div>
							<p>Fullstack MOOC final project</p>
						</div>
						<div class="text-gray-700 *:text-gray-700">
							<h5 class="text-gray-100">Curve Color Picker <SupBadge>dev</SupBadge></h5>
							<p>Fullstack MOOC final project</p>
						</div>
					</TabPanel>
				</TabPanels>
				<div class="w-0.5 max-h-80h sticky top-10h grad basis-0.5 shrink-0"></div>
				<TabList class="max-h-80h flex items-center">
					<div class="flex flex-col sticky top-10h gap-2 *:bg-gray-800 *:rounded-full *:py-1 *:px-3 *:w-fit *:cursor-pointer">
						<Tab class="all-small-caps hover:inset-ring-2 hover:inset-ring-gray-600 duration-150">Me myself</Tab>
						<Tab class="all-small-caps hover:inset-ring-2 hover:inset-ring-gray-600 duration-150">What do I know</Tab>
						<Tab class="all-small-caps hover:inset-ring-2 hover:inset-ring-gray-600 duration-150">What have I done</Tab>
					</div>
				</TabList>
			</TabGroup>
		</div>
	</div>
</template>

<style>

</style>