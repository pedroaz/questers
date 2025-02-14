<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label';
	import { CutScene } from '$lib/data/cut-scenes';
	import { persistGameState } from '$lib/persistence/persistence-service';
	import { ScreenType } from '$lib/schemas/screen-type';
	import { goToScreen } from '$lib/services/screen-changer-service';
	import { gameState, loadingState } from '$lib/states/game-state.svelte';
</script>

<div class="flex flex-col items-center justify-center gap-4 p-4">
	<div>
		<Label>Name</Label>
		<Input bind:value={gameState.data.playerUnit.name} />
	</div>
	<Button
		onclick={() => {
			gameState.data.cutSceneId = CutScene.Intro;
			persistGameState();
			goToScreen(ScreenType.CutScene);
		}}>Start Journey</Button
	>
</div>
