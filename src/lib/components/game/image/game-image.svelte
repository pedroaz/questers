<script>
	export let path;
	export let alt = '';
	export let width = '10vw';
	export let height = '10vh';
	export let className = '';
	export let zIndex = 'auto';

	// let currentSrc = `/assets/${path}`;
	let currentSrc = `https://zdcdjzcvlbqeqhuomlkg.supabase.co/storage/v1/object/public/game/${path}`;

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
