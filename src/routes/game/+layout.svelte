<script lang="ts">
	import TopMenu from '$lib/components/game/top-menu/top-menu.svelte';
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
	<div class="flex h-screen flex-col">
		<div class="flex flex-[0.1]">
			<TopMenu />
		</div>
		<div class="flex flex-[0.9] justify-center">
			<div class="w-full">
				{@render children()}
			</div>
		</div>
	</div>
{/if}
