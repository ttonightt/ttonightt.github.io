<script setup>
import { onMounted, useTemplateRef } from "vue";
import Coil from "../lib/Coil";
import { Scene, vec } from "../lib/Scene";
import SyncRender from "../lib/Render";

const pi2 = Math.PI * 2;


const props = defineProps([ "color", "width", "height", "class", "x0", "y0" ]);

const dOx = parseInt( props.x0 || 0 );
const dOy = parseInt( props.y0 || 0 );

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

		points[i] = x - dOx;
		points[i + 1] = y - dOy;
	}

	return points;
};

const render = (points, i0, gap, step) => {

	ctx.clearRect(0, 0, cnv.width, cnv.height);

	ctx.fillStyle = props.color;

	const len2 = points.length / 2;

	let i = Math.floor( len2 * i0 );
	const ie = len2 + Math.floor( len2 * (i0 - gap) );

	ctx.beginPath();

	for (i; i <= ie; i += step) {

		const mi = i % len2;

		const coef = -2 * Math.abs( (mi / len2) - 0.5 ) + 1;
		const r = coef * 4 + 4;

		const mi2 = mi * 2;

		ctx.moveTo(points[mi2], points[mi2 + 1]);
		ctx.arc(points[mi2], points[mi2 + 1], r, 0, pi2);
	}

	ctx.fill();
};

onMounted(() => {

	cnv = canvasRef.value;
	ctx = canvasRef.value.getContext("2d");

	const fps = 60;

	let transition = false;

	setTimeout(() => transition = true, 3000);

	let t = 0;
	let dt = 0.01;
	let gap = 0.9;

	const points = generate( cnv.width, cnv.height, 100 );

	const animation = SyncRender( fps, () => {

		render(points, t, gap, 2);

		t += dt;
		t %= 1;

		if (transition) {

			if (gap > 0.1) gap -= 0.007;

			if (dt > 0.0006) dt -= 0.0001;
		};
	});

	animation();
});

</script>

<template>
	<canvas ref="canvas-ref" :width="props.width" :height="props.height" :class="props.class"></canvas>
</template>