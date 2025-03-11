<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import TopMenu from '$lib/components/game/top-menu/top-menu.svelte';
	import { loadGame } from '$lib/persistence/loader-service';
	import { getGameIsLoaded } from '$lib/states/game-state.svelte';
	import { onMount } from 'svelte';

	let { children } = $props();
	loadGame();
</script>

{#if !getGameIsLoaded()}
	<div class="flex flex-col items-center justify-center gap-4 p-4">Loading Screen</div>
{/if}
{#if getGameIsLoaded()}
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
