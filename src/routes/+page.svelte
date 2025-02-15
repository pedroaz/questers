<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { loadGame } from '$lib/persistence/loader-service';
	import { ScreenType } from '$lib/schemas/screen-type';
	import { goToSavedScreen, goToScreen } from '$lib/services/screen-changer-service';
	import { gameState, loadingState } from '$lib/states/game-state.svelte';
	import { onMount } from 'svelte';
	onMount(() => {
		loadGame();
	});
</script>

{#if !loadingState.loaded}
	<div class="flex flex-col items-center justify-center gap-4 p-4">Loading Screen</div>
{/if}
{#if loadingState.loaded}
	<div class="flex flex-col items-center justify-center gap-4 p-4">
		<h1 class="text-9xl">Questers</h1>
		<Button href="/config">Config</Button>
		<Button
			onclick={() => {
				if (!gameState.data.playerCreated) {
					goToScreen(ScreenType.CharacterCreation);
				} else {
					goToSavedScreen();
				}
			}}>Play</Button
		>
	</div>
{/if}
