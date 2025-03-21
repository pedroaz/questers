<script lang="ts">
	import { IMAGES_MODULES } from '$lib/persistence/loader-service';

	let { id }: { id?: string } = $props();
	let src = $state('');
	// console.log(id);
	if (id) {
		const fullId = $state(`/src/lib/assets/${id}`);
		src = IMAGES_MODULES[fullId].default;
	}
</script>

{#if id}
	<img {src} alt="no alt for you!" />
{/if}
