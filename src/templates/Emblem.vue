<script setup>
import { onMounted, useTemplateRef } from "vue";
import Coil from "../lib/Coil";
import { Scene, vec } from "../lib/Scene";
import SyncRender from "../lib/Render";

const pi2 = Math.PI * 2;


const props = defineProps([ "color" ]);

let cnv, ctx;

const canvasRef = useTemplateRef("canvas-ref");

const coil = new Coil(100, 20, 13);

const generate = ( width, height, plen ) => {

	const length = coil.n * plen;

	const points = new Float32Array( length * 2 );

	const scene = new Scene( vec(0, 0, 0), vec(-90, -90, 130), 100, width, height );

	const dt = pi2 / length;

	for (let t = 0, i = 0; i < points.length; t += dt, i += 2) {

		const [x, y] = scene.proj( coil.fx(t), coil.fy(t), coil.fz(t) );

		points[i] = x;
		points[i + 1] = y;
	}

	return points;
};

const render = (points, i0) => {

	ctx.clearRect(0, 0, cnv.width, cnv.height);

	ctx.fillStyle = props.color;

	const len2 = points.length / 2;

	const gap = 0.1;

	let i = Math.floor( len2 * (gap + i0) );
	const ie = len2 + Math.floor( len2 * i0 );

	for (i; i < ie; i++) {

		const mi = i % len2;

		const coef = -2 * Math.abs( (mi / len2) - 0.5 ) + 1;
		const r = coef * 4 + 4;

		const mi2 = mi * 2;

		ctx.beginPath();

		ctx.arc(points[mi2], points[mi2 + 1], r, 0, pi2);
		ctx.fill();
	}
};

onMounted(() => {

	cnv = canvasRef.value;
	ctx = canvasRef.value.getContext("2d");

	const fps = 60;

	let t = 0;
	const dt = 0.025 / fps;

	const points = generate( cnv.width, cnv.height, 100 );

	const animation = SyncRender( fps, () => {

		render(points, t);

		t += dt;
		t %= 1;
	});

	animation();
});

</script>

<template>
	<canvas ref="canvas-ref" width="200" height="200"></canvas>
</template>

<style scoped>
canvas {
	/*background-color: black;*/
	display: block;
	width: fit-content;
	height: fit-content;
}
</style>