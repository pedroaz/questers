<script>
	import { PUBLIC_STORAGE_URL } from '$env/static/public';

	export let path;
	if (path && (path.includes('../') || path.includes('..\\') || path.startsWith('/'))) {
		console.warn('Invalid path detected:', path);
		path = 'fallback.png';
	}
	export let alt = '';
	export let width = '10vw';
	export let height = '10vh';
	export let className = '';
	export let zIndex = 'auto';

	// let currentSrc = `/assets/${path}`;
	let currentSrc = `${PUBLIC_STORAGE_URL}/game/${path}`;

	function handleError() {
		currentSrc = '/assets/fallback.png';
	}
</script>

<img
	src={currentSrc}
	{alt}
	style="width: {width}; height: {height}; z-index: {zIndex}; object-fit: cover;"
	class={className}
	draggable="false"
	on:error={handleError}
/>
