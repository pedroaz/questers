<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import { loadGame } from '$lib/persistence/loader-service';
	import { log } from '$lib/services/infra/logger';
	import { goToSavedScreen, goToScreen } from '$lib/services/screen-changer-service';
	import {
		getGameIsLoaded,
		getPlayerCreated,
		getScreenToLoad
	} from '$lib/states/game-state.svelte';
	import { onMount } from 'svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import { clearGameState } from '$lib/persistence/persistence-service.svelte';
	import Rain from '$lib/components/effects/rain.svelte';
	onMount(async () => {
		log('Mounting Main Page');
		await loadGame();
	});

	const saveStates = [{ value: '0', label: 'Zero' }];
	let value = $state('0');
	const triggerContent = $derived(
		saveStates.find((f) => f.value === value)?.label ?? 'Select a fruit'
	);
</script>

<Rain></Rain>

{#if !getGameIsLoaded()}
	<div class="flex flex-col items-center justify-center gap-4 p-4">Loading Screen</div>
{/if}
{#if getGameIsLoaded()}
	<div class="m-10 flex flex-col items-center justify-center gap-20">
		<Text type="game-title">Tales of Dunkle Sea</Text>
		<div>
			<Text>Select Save State</Text>
			<Select.Root type="single" name="favoriteFruit" bind:value>
				<Select.Trigger class="w-[180px]">
					{triggerContent}
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						{#each saveStates as save}
							<Select.Item value={save.value} label={save.label}>{save.label}</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
			</Select.Root>
		</div>

		<div class="flex flex-col items-center justify-center gap-4 p-4">
			<Button
				size="lg"
				onclick={() => {
					if (!getPlayerCreated()) {
						goToScreen('character-creation');
					} else {
						goToSavedScreen();
					}
				}}>Play</Button
			>
			<Button size="lg" href="/config">Config</Button>
			<Button
				size="lg"
				onclick={() => {
					clearGameState();
					// reload screen
					window.location.reload();
				}}>Clear Saves</Button
			>
		</div>
	</div>
{/if}
