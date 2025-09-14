<script setup>
import { onMounted, useTemplateRef } from "vue";
import Coil from "../lib/Coil";
import { Scene, vec } from "../lib/Scene";
import SyncRender from "../lib/Render";

const pi2 = Math.PI * 2;


let cnv, ctx;

const canvasRef = useTemplateRef("canvas-ref");

const coil = new Coil(100, 20, 13);

const generate = ( width, height ) => {

	const points = [];

	const scene = new Scene( vec(0, 0, 0), vec(-90, -90, 130), 100, width, height );

	const dt = 0.1 / coil.n;

	for (let t = 0; t < pi2; t += dt) {

		points.push( scene.proj( coil.fx(t), coil.fy(t), coil.fz(t) ) );
	}

	return points;
};

const render = (points, i0) => {

	ctx.clearRect(0, 0, cnv.width, cnv.height);

	ctx.fillStyle = "#000";

	const gap = 0.1;

	let i = Math.floor( points.length * (gap + i0) );
	const ie = points.length + Math.floor( points.length * i0 );

	for (i; i < ie; i++) {

		const mi = i % points.length;

		const coef = -2 * Math.abs( (mi / points.length) - 0.5 ) + 1;
		const r = coef * 4 + 4;

		ctx.beginPath();

		ctx.arc(points[mi][0], points[mi][1], r, 0, pi2);
		ctx.fill();
	}
};

onMounted(() => {

	cnv = canvasRef.value;
	ctx = canvasRef.value.getContext("2d");

	const points = generate( cnv.width, cnv.height );

	const fps = 60;

	let t = 0;
	const dt = 0.01 / fps;

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
}
</style>