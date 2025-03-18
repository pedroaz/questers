<script lang="ts">
	import { IMAGES_MODULES } from '$lib/persistence/loader-service';

	let { id } = $props();
	const fullId = $state(`/src/lib/assets/${id}`);
	const src = $state(IMAGES_MODULES[fullId].default);
	console.log(src);
	// console.log(image);
</script>

<img {src} alt="zzz" />
