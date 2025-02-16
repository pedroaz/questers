<script lang="ts">
	import { reload } from '$lib/persistence/loader-service';
	import { loadingState } from '$lib/states/game-state.svelte';
	import { onMount } from 'svelte';

	let { children } = $props();
	onMount(() => {
		reload();
	});
</script>

{#if !loadingState?.loaded}
	<div class="flex flex-col items-center justify-center gap-4 p-4">Loading Screen</div>
{/if}
{#if loadingState?.loaded}
	{@render children()}
{/if}
