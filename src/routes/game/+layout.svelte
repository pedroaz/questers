<script lang="ts">
	import { onMount } from 'svelte';

	import TopMenu from '$lib/components/game/top-menu/top-menu.svelte';
	import { loadGame } from '$lib/persistence/loader-service';
	import GameImage from '$lib/components/game/image/game-image.svelte';
	import Text from '$lib/components/ui/text/text.svelte';

	let { children } = $props();
	onMount(async () => {});

	async function init() {
		await loadGame();
	}
	let promise = init();
</script>

{#await promise}
	<div class="box flex h-screen flex-col items-center justify-center">
		<GameImage width="40vw" height="60vh" path="ui/game-logo.png"></GameImage>
		<Text type="big">Loading...</Text>
	</div>
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
