<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import { loadGame } from '$lib/persistence/loader-service';
	import { log } from '$lib/domain/infra/logger';
	import { getGameIsLoaded, setScreenToLoad, setStoryToLoad } from '$lib/states/game-state.svelte';
	import { onMount } from 'svelte';
	import { clearGameState, persistGameState } from '$lib/persistence/persistence-service.svelte';
	import { ScreenId } from '$lib/domain/screen-changing/screens';
	import { goToSavedScreen } from '$lib/domain/screen-changing/screen-changer-service';
	import GameImage from '$lib/components/game/image/game-image.svelte';
	import { getJourneyInProgress, setJourneyInProgress } from '$lib/states/player-state.svelte';
	import { StoryId } from '$lib/data/story/story-models';
	import { testMainMenuToCamp } from '$lib/tests/test-paths';
	onMount(async () => {
		log('Mounting Main Page');
		await loadGame();
	});

	function newGame() {
		setScreenToLoad(ScreenId.Story);
		setStoryToLoad(StoryId.NewGame);
		setJourneyInProgress(true);
		persistGameState();
	}
</script>

{#if !getGameIsLoaded()}
	<div class="flex flex-col items-center justify-center gap-4 p-4">Loading Screen</div>
{/if}
{#if getGameIsLoaded()}
	<div class="m-10 flex flex-col items-center justify-center gap-20">
		<Text type="game-title">Dungeons and Quests</Text>

		<div class="flex flex-col items-center justify-center gap-4 p-4">
			{#if getJourneyInProgress()}
				<Button
					size="lg"
					onclick={() => {
						goToSavedScreen();
					}}>Continue</Button
				>
			{/if}

			<Button
				size="lg"
				onclick={() => {
					clearGameState();
					newGame();
					goToSavedScreen();
				}}>New Game</Button
			>
			<Button size="lg" href="/config">Config</Button>
			<Button
				size="lg"
				onclick={() => {
					clearGameState();
					window.location.reload();
				}}>Clear Game State</Button
			>
			<Button
				size="lg"
				onclick={async () => {
					clearGameState();
					await testMainMenuToCamp();
				}}>Test - CAMP</Button
			>
		</div>
		<GameImage width="100" height="400" path="ui/fire.png"></GameImage>
	</div>
{/if}
