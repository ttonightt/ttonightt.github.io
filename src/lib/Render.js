
const SyncRender = ( fps, frameRender ) => {

	const dms = 1000 / fps;
	let _ms = new Date();

	const animation = () => {

		const ms = new Date();

		if ( ms - _ms > dms ) {

			frameRender();

			_ms = ms;
		}

		requestAnimationFrame(animation);
	};

	return () => requestAnimationFrame(animation);
};

export default SyncRender;