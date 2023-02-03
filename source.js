const pixelRatio = window.devicePixelRatio;
const width = window.innerWidth;
const height = window.innerHeight;

const canvas = document.getElementById("canvas"),
      canvasBlur = document.getElementById("canvas-blur");
const ctx = canvas.getContext("2d"),
	  ctxb = canvasBlur.getContext("2d");

canvas.width = width * pixelRatio;
canvas.height = height * pixelRatio;

canvasBlur.width = width * pixelRatio;
canvasBlur.height = height * pixelRatio;

ThunderJSProperties.setContexts(ctx, ctxb);

// const tctx = document.getElementById("test-canvas").getContext("2d");
// tctx.transform(1, 0, 0, -1, 150, 150);let moveChecker = false;



function toggleGlowing () { // glows ONLY the FIRST .glowable element
	document.querySelector(".glowable").classList.toggle("glowing");
}

let newLightning = {
	isAnimationAllowed: false
};

let moveChecker = false;

if (window.innerWidth <= 500) {
	DI.con("Mobile version");
	canvas.ontouchstart = function (e) {
		if (!newLightning.isAnimationAllowed) {
			moveChecker = true;
			newLightning = new THUNDER(width * pixelRatio / 2, height * pixelRatio / 2, e.changedTouches[0].clientX * pixelRatio, e.changedTouches[0].clientY * pixelRatio);
			toggleGlowing();
			newLightning.startAnimation();
		}
	}

	canvas.addEventListener("touchmove", function (e) {
		if (moveChecker) {
			newLightning.expand(e.changedTouches[0].clientX * pixelRatio, e.changedTouches[0].clientY * pixelRatio);
		}
	});

	window.addEventListener("touchend", function () {
		if (moveChecker) {
			moveChecker = false;
			newLightning.stopAnimation();
			ctx.clearRect(0, 0, width * pixelRatio, height * pixelRatio);
			ctxb.clearRect(0, 0, width * pixelRatio, height * pixelRatio);
			toggleGlowing();
		}
	});

	// window.addEventListener("touchmove", function (e) {
	// 	DI.con("Preventing");
	// 	e.preventDefault();
	// }, {passive: false});
} else {
	function toStop () {
		if (moveChecker) {
			moveChecker = false;
			newLightning.stopAnimation();
			ctx.clearRect(0, 0, width * pixelRatio, height * pixelRatio);
			ctxb.clearRect(0, 0, width * pixelRatio, height * pixelRatio);
			toggleGlowing();
		}
	}

	DI.con("Desktop version");
	canvas.onmousedown = function (e) {
		if (!newLightning.isAnimationAllowed) {
			console.clear();
			moveChecker = true;
			newLightning = new Lightning(width * pixelRatio / 2, height * pixelRatio / 2, e.offsetX * pixelRatio, e.offsetY * pixelRatio, {recursions: 1});
			toggleGlowing();
			newLightning.startAnimation();
		}
	};
	
	canvas.onmousemove = function (e) {
		if (moveChecker) {
			newLightning.expandAll(e.offsetX * pixelRatio, e.offsetY * pixelRatio);
		}
	};
	
	window.addEventListener("mouseup", function () {
		toStop();
	});

	window.addEventListener("visibilitychange", function () { // when tab in browser switched
		toStop();
	});

	window.addEventListener("blur", function () { // when window switched
		toStop();
	});
}

DI.con("pixelRatio: " + pixelRatio);
DI.con("originalSize: " + (pixelRatio * width) + " x " + (pixelRatio * height));
DI.con("compiledSize: " + width + " x " + height);
DI.con("--------------------------");

// console.time("_ctx");
// const _gradient = ctx.createLinearGradient(0, 100, width, 100);
// _gradient.addColorStop(0, "red");
// _gradient.addColorStop(0.33, "green");
// _gradient.addColorStop(0.66, "blue");
// _gradient.addColorStop(1, "red");
// ctx.beginPath();
// ctx.moveTo(0, 100);
// ctx.lineWidth = 50;
// ctx.strokeStyle = _gradient;
// for (let i = 0; i < width; i++) {
// 	ctx.lineTo(i, 100);
// }
// ctx.stroke();
// console.timeEnd("_ctx");

// ctx.clearRect(0, 0, width, height);

// console.time("ctx");
// const gradient = ctx.createLinearGradient(0, 100, width, 100);
// gradient.addColorStop(0, "red");
// gradient.addColorStop(0.33, "green");
// gradient.addColorStop(0.66, "blue");
// gradient.addColorStop(1, "red");
// ctx.strokeStyle = gradient;
// for (let i = 0; i < width - 1; i++) {
// 	ctx.beginPath();
// 	ctx.lineWidth = 50 * i / width;
// 	ctx.moveTo(i, 100);
// 	ctx.lineTo(i + 1, 100);
// 	ctx.stroke();
// }
// console.timeEnd("ctx");

// ctx.clearRect(0, 0, width, height);

// console.time("myown");
// const grad = new ColorGradient({
// 				arr: [255, 0, 0, 1, 0],
// 				percent: 0
// 			},
// 			{
// 				arr: [255, 255, 0, 1, 0.33],
// 				percent: 0.33
// 			},
// 			{
// 				arr: [0, 255, 255, 1, 0.66],
// 				percent: 0.66
// 			},
// 			{
// 				arr: [255, 0, 255, 1, 1],
// 				percent: 1
// 			});
// for (let i = 0; i < width - 1; i++) {
// 	const j = i / width;
// 	const actgrad = grad.getColor(j);
// 	ctx.beginPath();
// 	ctx.strokeStyle = "rgba(" + actgrad[0] + "," + actgrad[1] + "," + actgrad[2] + "," + actgrad[3] + ")";
// 	ctx.lineWidth = 50 * actgrad[4];
// 	ctx.moveTo(i, 100);
// 	ctx.lineTo(i + 1, 100);
// 	ctx.stroke();
// }
// console.timeEnd("myown");