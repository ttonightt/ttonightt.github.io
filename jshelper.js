function hexToRgba(hex){
	let c = hex.substring(1).split("");
	
	if (c.length == 4) {
		c = [c[0], c[0], c[1], c[1], c[2], c[2], c[3], c[3]];
	} else if (c.length == 3) {
		c = [c[0], c[0], c[1], c[1], c[2], c[2]];
	}

	c = "0x" + c.join("");

	if (c.length == 10) {
		return [(c >> 24) & 255, (c >> 16) & 255, (c >> 8) & 255, (c & 255) / 255];
	} else if (c.length == 8) {
		return [(c >> 16) & 255, (c >> 8) & 255, c & 255, 1];
	}
}

// function getGradient (grad, percent, actinterval = -1) {
// 	let n = 0;

// 	if (actinterval < 0) {
// 		for (let i = 1; i < grad.length - 1; i++) {
// 			if (percent > grad[i].percent) {
// 				n++;
// 			}
// 		}
// 	} else {
// 		n = actinterval;
// 	}

// 	return `rgba(${
// 		grad[n].color[0] + ((grad[n + 1].color[0] - grad[n].color[0]) * (percent - grad[n].percent) / (grad[n + 1].percent - grad[n].percent))
// 	}, ${
// 		grad[n].color[1] + ((grad[n + 1].color[1] - grad[n].color[1]) * (percent - grad[n].percent) / (grad[n + 1].percent - grad[n].percent))
// 	}, ${
// 		grad[n].color[2] + ((grad[n + 1].color[2] - grad[n].color[2]) * (percent - grad[n].percent) / (grad[n + 1].percent - grad[n].percent))
// 	}, ${
// 		grad[n].color[3] + ((grad[n + 1].color[3] - grad[n].color[3]) * (percent - grad[n].percent) / (grad[n + 1].percent - grad[n].percent))
// 	})`;
// }

class ColorGradient {
	constructor () {
		this.cstops = [];
		for (let i = 0; i < arguments.length; i++) {
			this.cstops.push({
				percent: arguments[i].percent,
				arr: arguments[i].arr
			});
		}
	}

	getColor (i = 0) {
		if (i <= this.cstops[0].percent) {
			return this.cstops[0].arr;
		} else if (i >= this.cstops[this.cstops.length - 1].percent) {
			return this.cstops[this.cstops.length - 1].arr;
		} else {
			let n = 0;
	
			for (let j = 1; j < this.cstops.length - 1; j++) {
				if (i > this.cstops[j].percent) {
					n++;
				}
			}
	
			let res = [];
	
			for (let j = 0; j < this.cstops[0].arr.length; j++) {
				res.push(this.cstops[n].arr[j] + ((this.cstops[n + 1].arr[j] - this.cstops[n].arr[j]) * (i - this.cstops[n].percent) / (this.cstops[n + 1].percent - this.cstops[n].percent)));
			}

			return res;
		}
	}
}

Math.AtoR = function (angle) {
	return (angle / 180) * Math.PI;
}

Math.RtoA = function (radians) {
	return (radians / Math.PI) * 180;
}

Math.srandom = function (a, b, cut) {
	if (cut != undefined && cut != NaN && cut != null) {
		return a + Math.round((b - a) * Math.random() * Math.pow(10, cut)) / Math.pow(10, cut);
	} else {
		return a + (b - a)*Math.random();
	}
}

Math.rsign = function () { // може вийде прискорити завдяки 1 - Math.round(Math.random() * 2)
	if (Math.random() > 0.5) {
		return 1;
	} else {
		return -1;
	}
}

Math.sina = function (angle) {
	return Math.sin(Math.AtoR(angle));
}

Math.cosa = function (angle) {
	return Math.cos(Math.AtoR(angle));
}

Math.sround = function (a, p, type) {
	let q;
	if (p < 0) {
		q = 1;
	} else {
		q = Math.pow(10, p);
	}

	if (type == 0) {
		return Math.floor(a * q) / q;
	} else if (type == 2) {
		return Math.ceil(a * q) / q;
	} else {
		return Math.round(a * q) / q;
	}
}

Math.llength = function (x0, y0, x, y) {
	if (typeof x0 == "object") {
		if (x0.x != NaN && typeof x0.x == "number" && x0.y != NaN && typeof x0.y == "number") {
			if (x0.x0 != NaN && typeof x0.x0 == "number" && x0.y0 != NaN && typeof x0.y0 == "number") {
				return Math.sqrt(((x0.x - x0.x0)**2) + ((x0.y - x0.y0)**2));
			} else {
				return Math.sqrt((x0.x**2) + (x0.y**2));
			}
		} else if (x0.x2 != NaN && typeof x0.x2 == "number" && x0.y2 != NaN && typeof x0.y2 == "number") {
			return Math.sqrt(((x0.x2 - x0.x1)**2) + ((x0.y2 - x0.y1)**2));
		} else {
			return NaN;
		}
	} else if (typeof y0 == "number") {
		if (x == null || x == NaN || x == undefined || y == null || y == NaN || y == undefined) {
			return Math.sqrt((x0**2) + (y0**2));
		} else {
			return Math.sqrt(((x - x0)**2) + ((y - y0)**2));
		}
	}
}

Math.cosByVectorMult = function (ax, ay, bx, by, ax0, ay0, bx0, by0) {
	return (((ax - ax0) * (bx - bx0)) + ((ay - ay0) * (by - by0))) / (Math.llength(ax - ax0, ay - ay0) * Math.llength(bx - bx0, by - by0));
}

Math.getLineConstants = function (x0, y0, x, y) {
	if (typeof x0 == "object") {
		return {
			x0: x0.x0,
			x: x0.x,
			y0: x0.y0,
			y: x0.y,
			A: x0.y - x0.y0,
			B: x0.x0 - x0.x,
			C: (x0.y0 * x0.x) - (x0.x0 * x0.y),
			tan: (x0.y - x0.y0) / (x0.x - x0.x0),
			rad: Math.atan((x0.y - x0.y0) / (x0.x - x0.x0)),
			b: ((x0.y0 * x0.x) - (x0.x0 * x0.y)) / (x0.x - x0.x0),
			len: Math.sqrt(((x0.x - x0.x0)**2) + ((x0.y - x0.y0)**2)),
			vecx: x0.x - x0.x0,
			vecy: x0.y - x0.y0
		};
	} else if (typeof x0 == "number") {
		return {
			x0: x0,
			x: x,
			y0: y0,
			y: y,
			A: y - y0,
			B: x0 - x,
			C: (y0 * x) - (x0 * y),
			tan: (y - y0) / (x - x0),
			rad: Math.atan((y - y0) / (x - x0)),
			b: ((y0 * x) - (x0 * y)) / (x - x0),
			len: Math.sqrt(((x - x0)**2) + ((y - y0)**2)),
			vecx: x - x0,
			vecy: y - y0
		};
	}
}

Math.Line = {
	tan: (x0, y0, x, y) => {
		return (y - y0) / (x - x0);
	},

	b: (x0, y0, x, y) => {
		return ((y0 * x) - (x0 * y)) / (x - x0);
	},

	vec: (a0, a) => {
		return a - a0;
	}
};

// Math.BCPoints = {};

Math.BC = {
	points: {},
	keyMap: {
		x0: "x0",
		y0: "y0",
		x1: "x1",
		y1: "y1",
		x2: "x2",
		y2: "y2",
		x: "x",
		y: "y"
	},
	keysOfKeyMap: ["x0","y0","x1","y1","x2","y2","x","y"],
	setKeyMap: function (obj, valuesInsteadOfParams) {
		const keys = Object.keys(obj);
		if (valuesInsteadOfParams) {
			for (let i = 0; i < 8; i++) {
				this.keyMap[this.keysOfKeyMap[i]] = obj[keys[i]];
			}
		} else {
			for (let i = 0; i < 8; i++) {
				this.keyMap[this.keysOfKeyMap[i]] = keys[i];
			}
		}
	},
	setKeyMapA: function (arr) {
		for (let i = 0; i < Math.min(arr.length, 8); i++) {
			this.keyMap[this.keysOfKeyMap[i]] = arr[i];
		}
	},
	resetKeyMap: function () {
		this.keyMap = {
			x0: "x0",
			y0: "y0",
			x1: "x1",
			y1: "y1",
			x2: "x2",
			y2: "y2",
			x: "x",
			y: "y"
		}
	},
	set: function (x0, y0, x1, y1, x2, y2, x, y) {
		if (typeof y == "number") {
			this.points.x0 = x0;
			this.points.y0 = y0;
			this.points.x1 = x1;
			this.points.y1 = y1;
			this.points.x2 = x2;
			this.points.y2 = y2;
			this.points.x = x;
			this.points.y = y;
		} else {
			this.points.x1 = x0;
			this.points.y1 = y0;
			this.points.x2 = x1;
			this.points.y2 = y1;
		}
	},
	setO: function (obj) {
		for (let i = 0; i < Math.min(8, Object.keys(obj).length); i++) {
			if (typeof obj[this.keyMap[this.keysOfKeyMap[i]]] == "number") {
				this.points[this.keysOfKeyMap[i]] = obj[this.keyMap[this.keysOfKeyMap[i]]];
			}
		}
	},
	setA: function (arr) {
		if (arr.length >= 8) {
			this.points.x0 = arr[0];
			this.points.y0 = arr[1];
			this.points.x1 = arr[2];
			this.points.y1 = arr[3];
			this.points.x2 = arr[4];
			this.points.y2 = arr[5];
			this.points.x = arr[6];
			this.points.y = arr[7];
		} else {
			this.points.x1 = arr[0];
			this.points.y1 = arr[1];
			this.points.x2 = arr[2];
			this.points.y2 = arr[3];
		}
	},
	getByT: function (t) {
		return {
			x:  (((1 - t)**3) * this.points.x0) +
				(((1 - t)**2) * 3 * t * this.points.x1) + 
				((t**2) * 3 * (1 - t) * this.points.x2) +
				((t**3) * this.points.x),
			y:  (((1 - t)**3) * this.points.y0) +
				(((1 - t)**2) * 3 * t * this.points.y1) + 
				((t**2) * 3 * (1 - t) * this.points.y2) +
				((t**3) * this.points.y)
		};
	},
	getByX: function (x) {
		return  (((1 - x)**3) * this.points.y0) +
				(((1 - x)**2) * 3 * x * this.points.y1) + 
				((x**2) * 3 * (1 - x) * this.points.y2) +
				((x**3) * this.points.y);
	},
	getByY: function (y) {
		return  (((1 - y)**3) * this.points.x0) +
				(((1 - y)**2) * 3 * y * this.points.x1) + 
				((y**2) * 3 * (1 - y) * this.points.x2) +
				((y**3) * this.points.x);
	}
};

// Math.bezierCurveS = function (t, x0, y0, x1, y1, x2, y2, x, y) { // get x, y by entering control points coordinates and t param.
// 	let rx, ry;
// 	if ((x == null || x == NaN || x == undefined) && (y == null || y == NaN || y == undefined)) {
// 		if ((x2 == null || x2 == NaN || x2 == undefined) && (y2 == null || y2 == NaN || y2 == undefined)) {
// 			rx = ((1 - t) * x0) + (t * x1);
// 			ry = ((1 - t) * y0) + (t * y1);
// 		} else {
// 			rx = (((1 - t)**2) * x0) + (2*(1 - t) * t * x1) + ((t**2) * x2);
// 			ry = (((1 - t)**2) * y0) + (2*(1 - t) * t * y1) + ((t**2) * y2);
// 		}
// 	} else {
// 		rx = (((1 - t)**3) * x0) + (3*((1 - t)**2) * t * x1) + (3*(1 - t) * (t**2) * x2) + ((t**3) * x);
// 		ry = (((1 - t)**3) * y0) + (3*((1 - t)**2) * t * y1) + (3*(1 - t) * (t**2) * y2) + ((t**3) * y);
// 	}

// 	return {x: rx, y: ry};
// }

// Math.bezierCurve = function (t) { // get x, y by entering ONLY t param. *control points coords. set by "setBCPoints" method
// 	let rx, ry;
// 	if ((Math.BCPoints.x == null || Math.BCPoints.x == NaN || Math.BCPoints.x == undefined) && (Math.BCPoints.y == null || Math.BCPoints.y == NaN || Math.BCPoints.y == undefined)) {
// 		if ((Math.BCPoints.x2 == null || Math.BCPoints.x2 == NaN || Math.BCPoints.x2 == undefined) && (Math.BCPoints.y2 == null || Math.BCPoints.y2 == NaN || Math.BCPoints.y2 == undefined)) {
// 			rx = ((1 - t) * Math.BCPoints.x0) + (t * Math.BCPoints.x1);
// 			ry = ((1 - t) * Math.BCPoints.y0) + (t * Math.BCPoints.y1);
// 		} else {
// 			rx = (((1 - t)**2) * Math.BCPoints.x0) + (2*(1 - t) * t * Math.BCPoints.x1) + ((t**2) * Math.BCPoints.x2);
// 			ry = (((1 - t)**2) * Math.BCPoints.y0) + (2*(1 - t) * t * Math.BCPoints.y1) + ((t**2) * Math.BCPoints.y2);
// 		}
// 	} else {
// 		rx = (((1 - t)**3) * Math.BCPoints.x0) + (3*((1 - t)**2) * t * Math.BCPoints.x1) + (3*(1 - t) * (t**2) * Math.BCPoints.x2) + ((t**3) * Math.BCPoints.x);
// 		ry = (((1 - t)**3) * Math.BCPoints.y0) + (3*((1 - t)**2) * t * Math.BCPoints.y1) + (3*(1 - t) * (t**2) * Math.BCPoints.y2) + ((t**3) * Math.BCPoints.y);
// 	}

// 	return {x: rx, y: ry};
// }

// Math.setBCPoints = function (x0, y0, x1, y1, x2, y2, x, y) { // set global control points values
// 	if (typeof x0 == "object") {
// 		Math.BCPoints.x0 = x0.x0;
// 		Math.BCPoints.y0 = x0.y0;
// 		Math.BCPoints.x1 = x0.x1;
// 		Math.BCPoints.y1 = x0.y1;
// 		Math.BCPoints.x2 = x0.x2;
// 		Math.BCPoints.y2 = x0.y2;
// 		Math.BCPoints.x = x0.x;
// 		Math.BCPoints.y = x0.y;
// 	} else if (typeof x0 != "string" && x0.length >= 2) {
// 		Math.BCPoints.x0 = x0[0];
// 		Math.BCPoints.y0 = x0[1];
// 		Math.BCPoints.x1 = x0[2];
// 		Math.BCPoints.y1 = x0[3];
// 		Math.BCPoints.x2 = x0[4];
// 		Math.BCPoints.y2 = x0[5];
// 		Math.BCPoints.x = x0[6];
// 		Math.BCPoints.y = x0[7];
// 	} else if (typeof x0 == "number") {
// 		Math.BCPoints.x0 = x0;
// 		Math.BCPoints.y0 = y0;
// 		Math.BCPoints.x1 = x1;
// 		Math.BCPoints.y1 = y1;
// 		Math.BCPoints.x2 = x2;
// 		Math.BCPoints.y2 = y2;
// 		Math.BCPoints.x = x;
// 		Math.BCPoints.y = y;
// 	}
// }

Math.rotatep = function (r, x, y, x0, y0) {
	if ((x0 == null || x0 == NaN || x0 == undefined) && (y0 == null || y0 == NaN || y0 == undefined)) {
		return {
			x: (Math.cos(r) * x) - (Math.sin(r) * y),
			y: (Math.cos(r) * y) + (Math.sin(r) * x)
		};
	} else {
		return {
			x: (Math.cos(r) * (x - x0)) - (Math.sin(r) * (y - y0)) + x0,
			y: (Math.cos(r) * (y - y0)) + (Math.sin(r) * (x - x0)) + y0
		};
	}
}

Math.rotatepI = (r, x, y, x0 = 0, y0 = 0) => {
	x = x - x0;
	y = y - y0;

	return {
		x: (Math.cos(r) * x) - (Math.sin(r) * y) + x0,
		y: (Math.cos(r) * y) + (Math.sin(r) * x) + y0
	};
}

Math.rotatepC = (vx, vy, x, y, x0 = 0, y0 = 0) => {
	x = x - x0;
	y = y - y0;

	const nx = ((vy * x) + (vx * y)),
		ny = -((vx * x) - (vy * y)),
		coef = Math.sqrt(((x**2) + (y**2)) / ((nx**2) + (ny**2)));

	return {
		x: (nx * coef) + x0,
		y: (ny * coef) + y0	
	};
}

Object.prototype.compVector = function () {
	if (this.x0 != NaN && typeof this.x0 == "number" && this.y0 != NaN && typeof this.y0 == "number" && this.x != NaN && typeof this.x == "number" && this.y != NaN && typeof this.y == "number") {
		return {x: this.x - this.x0, y: this.y - this.y0};
	} else if (this.x1 != NaN && typeof this.x1 == "number" && this.y1 != NaN && typeof this.y1 == "number" && this.x2 != NaN && typeof this.x2 == "number" && this.y2 != NaN && typeof this.y2 == "number") {
		return {x: this.x2 - this.x1, y: this.y2 - this.y1};
	}
}

HTMLElement.prototype.outerSize = function (isMargin) {
	let style = getComputedStyle(this);
	let w = this.clientWidth;
	let h = this.clientHeight;

	h += parseInt(style.borderTopWidth, 10) || 0;
	w += parseInt(style.borderRightWidth, 10) || 0;
	h += parseInt(style.borderBottomWidth, 10) || 0;
	w += parseInt(style.borderLeftWidth, 10) || 0;
	h += parseInt(style.outlineWidth, 10) || 0;
	w += parseInt(style.outlineWidth, 10) || 0;

	if (isMargin) {
		h += parseInt(style.marginTopWidth, 10) || 0;
		w += parseInt(style.marginRightWidth, 10) || 0;
		h += parseInt(style.marginBottomWidth, 10) || 0;
		w += parseInt(style.marginLeftWidth, 10) || 0;
	}

	return {width: w, height: h};
}