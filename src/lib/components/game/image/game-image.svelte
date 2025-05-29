<script>
	export let path;
	export let alt = '';
	export let width = '100';
	width += 'vw';
	export let height = '100';
	height += 'vh';
	export let className = '';
	let currentSrc = `/assets/${path}`;

	function handleError() {
		currentSrc = '/assets/fallback.png'; // fallback image in static/assets
	}
</script>

<img
	style="image-rendering: pixelated;"
	src={currentSrc}
	{alt}
	{width}
	{height}
	class={className}
	on:error={handleError}
/>
