<script setup>

const props = defineProps([ "options" ]);

const options = props.options.sort( (a, b) => b.weight - a.weight );
//const options = props.options;

const peaks = options.map( (v, i) => {

	const angle = Math.PI * 2 * i / options.length;

	return [ Math.cos(angle) * 100, Math.sin(angle) * 100 ];
});

const maxx = peaks.reduce(( _max, point ) => Math.max(_max, point[0]), 0);
const minx = peaks.reduce(( _min, point ) => Math.min(_min, point[0]), 0);

const dx2 = (maxx - minx) / 2;

const points = peaks.map( point => [ dx2 + point[0], 100 + point[1] ] );


const center = (points, weights) => {

	const n = weights.length;
	const sum = weights.reduce( (a, b) => a + b, 0 );

	if (sum === 0) return [dx2, 100];

	const point = [0, 0];

	for (let i = 0; i < n; i++) {

		point[0] += points[i][0] * weights[i];
		point[1] += points[i][1] * weights[i];
	}
	point[0] /= sum;
	point[1] /= sum;

	return point;
}

const averagePoint = center(points, options.map( ({ weight }) => weight ));

</script>

<template>
	<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="overflow-visible">
		<defs>
			<radialGradient id="SVG-radialGradient" :cx="averagePoint[0]" :cy="averagePoint[1]" gradientUnits="userSpaceOnUse" >
				<stop offset="0%" stop-color="#fff" />
				<stop offset="100%" stop-color="#333" />
			</radialGradient>
		</defs>
		<polygon :points="points.join(' ')" fill="none" stroke-width="4" stroke="url(#SVG-radialGradient)" />
		<circle v-for="point in points" :cx="point[0]" :cy="point[1]" r="6" fill="url(#SVG-radialGradient)" stroke="none" />
		<text v-for="i in options.length" :x="points[i - 1][0]" :y="points[i - 1][1]" fill="white">
			{{ options[i - 1].name }}
		</text>
		<circle :cx="averagePoint[0]" :cy="averagePoint[1]" r="6" fill="white" stroke="none" />
		<!--<circle :cx="dx2" :cy="100" r="6" fill="red" stroke="none" />-->
	</svg>
</template>