
class Coil {

	constructor (R, r, n) {

		this.R = R;
		this.r = r;
		this.n = n;
		this.o = [0, 0, 0];
	}

	moveTo (v) {
		this.o = [...v];
	}

	fx (t) {
		return (this.R + this.r * Math.cos(this.n * t)) * Math.cos(t);
	}

	fy (t) {
		return (this.R + this.r * Math.cos(this.n * t)) * Math.sin(t);
	}

	fz (t) {
		return this.r * Math.sin(this.n * t);
	}
}

export default Coil;