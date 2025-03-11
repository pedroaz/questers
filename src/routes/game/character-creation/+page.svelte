<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import Text from '$lib/components/ui/text/text.svelte';
	import { persistGameState } from '$lib/persistence/persistence-service.svelte';
	import { createGameState } from '$lib/services/factories/object-factory';
	import { goToScreen } from '$lib/services/screen-changer-service';
	import {
		getPlayerUnit,
		setCutSceneToLoad,
		setPlayerCreated,
		setPlayerName
	} from '$lib/states/game-state.svelte';

	createGameState();
	const playerUnit = getPlayerUnit()!;
	let name = $state('Bob');
</script>

<div class="central-screen">
	<div class="flex flex-col gap-4 text-center">
		<Text type="big">What is your name?</Text>
		<Input bind:value={name} />
		<Button
			onclick={() => {
				setCutSceneToLoad('intro');
				setPlayerCreated(true);
				persistGameState();
				setPlayerName(name);
				goToScreen('cut-scene');
			}}>Start Journey</Button
		>
	</div>
</div>
