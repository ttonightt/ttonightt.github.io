const pi = Math.PI;
const pi2 = pi * 2;


export const vec = (x, y, z) => ({ x, y, z });

const cross = (v1, v2) => ({
	x: (v1.y * v2.z) - (v1.z * v2.y),
	y: (v1.z * v2.x) - (v1.x * v2.z),
	z: (v1.x * v2.y) - (v1.y * v2.x)
});

const dot = (v1, v2) => (v1.x * v2.x) + (v1.y * v2.y) + (v1.z * v2.z);

const norm = v => {

	const mag = Math.sqrt( (v.x ** 2) + (v.y ** 2) + (v.z ** 2) );

	return {
		x: v.x / mag,
		y: v.y / mag,
		z: v.z / mag
	};
};

const diff = (v, v0) => ({
	x: v.x - v0.x,
	y: v.y - v0.y,
	z: v.z - v0.z
});

const lookAtM = (targetV, cameraV) => {

	const UP = vec(0, 1, 0);

	const L = norm(diff(targetV, cameraV));
	const s = norm(cross(L, UP));
	const u = cross(s, L);

	return [
		s.x, s.y, s.z, -dot(s, cameraV),
		u.x, u.y, u.z, -dot(u, cameraV),
		-L.x, -L.y, -L.z, dot(L, cameraV),
		0, 0, 0, 1
	];
};

const intrinsicM = (f, plainW, plainH) => [

	f, 0, plainW / 2,
	0, f, plainH / 2,
	0, 0, 1
];

export class Scene {

	constructor (target, camera, f, width, height) {

		this.extrinsic = lookAtM(target, camera);
		this.intrinsic = intrinsicM(f, width, height);
	}

	proj (x0, y0, z0) {

		const E = this.extrinsic;
		const I = this.intrinsic;

		const V = [
			(E[0] * x0) + (E[1] * y0) +  (E[2] * z0) + E[3],
			(E[4] * x0) + (E[5] * y0) +  (E[6] * z0) + E[7],
			(E[8] * x0) + (E[9] * y0) + (E[10] * z0) + E[11]
		];

		const P = [
			(I[0] * V[0]) + (I[1] * V[1]) + (I[2] * V[2]),
			(I[3] * V[0]) + (I[4] * V[1]) + (I[5] * V[2]),
			(I[6] * V[0]) + (I[7] * V[1]) + (I[8] * V[2]),
		];

		return [ P[0] / P[2], P[1] / P[2] ];
	}
}