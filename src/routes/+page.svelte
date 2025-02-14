<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { loadAll } from '$lib/persistence/persistence-service';
	import { loadingState } from '$lib/states/game-state.svelte';
	import { onMount } from 'svelte';
	onMount(() => {
		if (loadingState.loaded) return;
		loadAll();
	});
</script>

{#if !loadingState.loaded}
	<div class="flex flex-col items-center justify-center gap-4 p-4">Loading Screen</div>
{/if}
{#if loadingState.loaded}
	<div class="flex flex-col items-center justify-center gap-4 p-4">
		<h1>Questers</h1>
		<Button href="/config">Config</Button>
		<Button href="/game/town">Town</Button>
	</div>
{/if}
