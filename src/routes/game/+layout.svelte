<script lang="ts">
	import TopMenu from '$lib/components/game/top-menu/top-menu.svelte';
	import { loadGame } from '$lib/persistence/loader-service';
	import { getBackground, setBackground } from '$lib/states/game-state.svelte';
	import { onMount } from 'svelte';

	let bgClass = $derived.by(() => {
		const bg = getBackground();
		if (!bg) return 'flex h-screen flex-col';
		if (bg === 'chevrons') {
			return 'chevrons flex h-screen flex-col';
		}
		return 'flex h-screen flex-col';
	});

	let { children } = $props();
	onMount(async () => {});

	async function init() {
		await loadGame();
	}
	let promise = init();
</script>

{#await promise}
	<div class="flex flex-col items-center justify-center gap-4 p-4">Loading Screen</div>
{:then}
	<div class={bgClass}>
		<div class="flex flex-[0.1]">
			<TopMenu />
		</div>
		<div class="flex flex-[0.9] justify-center">
			<div class=" w-full">
				{@render children()}
			</div>
		</div>
	</div>
{/await}

<style>
	.chevrons {
		background-color: #596745;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cpolygon fill='%23395033' points='120 120 60 120 90 90 120 60 120 0 120 0 60 60 0 0 0 60 30 90 60 120 120 120 '/%3E%3C/svg%3E");
	}
</style>
