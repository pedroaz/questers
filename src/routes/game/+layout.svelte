<script lang="ts">
	import { onMount } from 'svelte';

	import TopMenu from '$lib/components/game/top-menu/top-menu.svelte';
	import { loadGame } from '$lib/persistence/loader-service';

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
	<div class="flex h-screen flex-col">
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
