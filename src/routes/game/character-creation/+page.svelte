<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import Text from '$lib/components/ui/text/text.svelte';
	import { CutScene } from '$lib/data/cut-scenes';
	import { persistGameState } from '$lib/persistence/persistence-service';
	import { goToScreen, ScreenType } from '$lib/services/screen-changer-service';
	import { GetGameState, GetPlayerUnit } from '$lib/states/game-state.svelte';

	const playerUnit = GetPlayerUnit();
</script>

<div class="central-screen">
	<div class="flex flex-col gap-4 text-center">
		<Text type="big">What is your name?</Text>
		<Input bind:value={playerUnit.name} />
		<Button
			onclick={() => {
				GetGameState().data.cutSceneToLoad = CutScene.Intro;
				GetGameState().data.playerCreated = true;
				persistGameState();
				goToScreen(ScreenType.CutScene);
			}}>Start Journey</Button
		>
	</div>
</div>
