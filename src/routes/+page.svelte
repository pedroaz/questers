<script lang="ts">
	import { onMount } from 'svelte';

	import GameImage from '$lib/components/game/image/game-image.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import { StoryId } from '$lib/data/story/story-models';
	import { log } from '$lib/domain/infra/logger';
	import { goToSavedScreen } from '$lib/domain/screen-changing/screen-changer-service';
	import { ScreenId } from '$lib/domain/screen-changing/screens';
	import { loadGame } from '$lib/persistence/loader-service';
	import { clearGameState, persistGameState } from '$lib/persistence/persistence-service.svelte';
	import { getGameIsLoaded, setScreenToLoad, setStoryToLoad } from '$lib/states/game-state.svelte';
	import { getJourneyInProgress, setJourneyInProgress } from '$lib/states/player-state.svelte';
	import { testMainMenuToCamp } from '$lib/tests/test-paths';
	import Particles from '@tsparticles/svelte';
	import { RNG_PARTICLES } from '$lib/data/particles/game-particles';

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
	<div class="flex flex-col items-center justify-center gap-20">
		<Text type="game-title">Dungeons and Quests</Text>
		<div class="flex h-full w-full items-center justify-around">
			<div class="gbox flex flex-col items-center justify-center gap-4">
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
					}}>Test - Path</Button
				>
			</div>

			<div style="position: relative; width: 500px; height: 400px;">
				<!-- Game Image with lower z-index -->
				<GameImage
					className="absolute"
					width="500"
					height="400"
					path="ui/main-menu.png"
					zIndex="1"
				/>

				<!-- Particles with higher z-index -->
				<Particles
					id="tsparticles"
					options={RNG_PARTICLES}
					style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
				/>
			</div>
		</div>
	</div>
{/if}
