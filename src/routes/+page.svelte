<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	import GameImage from '$lib/components/game/image/game-image.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import { StoryId } from '$lib/data/story/story-models';
	import { log } from '$lib/domain/infra/logger';
	import { goToSavedScreen } from '$lib/domain/screen-changing/screen-changer-service';
	import { ScreenId } from '$lib/domain/screen-changing/screens';
	import { loadGame } from '$lib/persistence/loader-service';
	import { clearGameState, persistGameState } from '$lib/persistence/persistence-service.svelte';
	import {
		getGameIsLoaded,
		getGameSeed,
		setGameSeed,
		setScreenToLoad,
		setStoryToLoad
	} from '$lib/states/game-state.svelte';
	import { getJourneyInProgress, setJourneyInProgress } from '$lib/states/player-state.svelte';
	import { testMainMenuToCamp } from '$lib/tests/test-paths';
	import Particles from '@tsparticles/svelte';
	import { RNG_PARTICLES } from '$lib/data/particles/game-particles';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import ConfigPanel from '$lib/components/game/config-panel/config-panel.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { generateSeed, getSeededRandomNumber, setRngFunction } from '$lib/rng-service';

	let isConfigOpen = $state(false);
	let gameSeed = $state(generateSeed());
	let seedValid = $state(true);

	onMount(async () => {
		log('Mounting Main Page');
		await loadGame();
		window.addEventListener('keydown', handleKeydown);
	});

	onDestroy(() => {
		window.removeEventListener('keydown', handleKeydown);
	});

	async function handleKeydown(event: KeyboardEvent) {
		if (event.code === 'Space') {
			event.preventDefault(); // Optional: prevent scrolling
			clearGameState();
			await testMainMenuToCamp();
		}
	}

	function newGame() {
		setRngFunction(getGameSeed());
		setScreenToLoad(ScreenId.Story);
		setStoryToLoad(StoryId.NewGame);
		setJourneyInProgress(true);
		persistGameState();
	}

	function isValidSeed(seed: string): boolean {
		// Must be 7 to 10 characters (typical for Date.now().toString(36))
		if (seed.length < 7 || seed.length > 10) return false;

		// Must only contain lowercase letters and digits
		return /^[a-z0-9]+$/.test(seed);
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
				{:else}
					<div class="flex w-full max-w-sm flex-col gap-1.5">
						<Label for="game-seed">Game Seed</Label>
						<Input
							id="game-seed"
							type="text"
							bind:value={gameSeed}
							oninput={(e) => {
								const input = e.target as HTMLInputElement;
								gameSeed = input.value;
								seedValid = isValidSeed(gameSeed);
							}}
							class="w-full max-w-xs"
						/>
						{#if gameSeed && !seedValid}
							<Text type="small">Seed must be 7-10 lowercase letters or digits.</Text>
						{/if}
					</div>
				{/if}
				<Button
					disabled={!seedValid}
					size="lg"
					onclick={() => {
						clearGameState();
						setGameSeed(gameSeed);
						newGame();
						goToSavedScreen();
					}}>New Game</Button
				>
				<Button onclick={() => (isConfigOpen = true)} size="lg">Config</Button>
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
					}}>DEBUG - Path</Button
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

<Dialog.Root
	open={isConfigOpen}
	onOpenChange={(open) => {
		isConfigOpen = open;
	}}
>
	<Dialog.Content class="h-[80%]">
		<ConfigPanel></ConfigPanel>
	</Dialog.Content>
</Dialog.Root>
