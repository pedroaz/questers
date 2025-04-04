<script lang="ts">
	import { CUT_SCENES_DICT } from '$lib/data/cut-scenes';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import Button from '$lib/components/ui/button/button.svelte';
	import { persistGameState } from '$lib/persistence/persistence-service.svelte';
	import { getCutSceneToLoad } from '$lib/states/game-state.svelte';
	import { log } from '$lib/services/infra/logger';
	import { goToSavedScreen } from '$lib/services/screen-changer-service';
	import GameImage from '$lib/components/game/image/game-image.svelte';
	const cutScene = CUT_SCENES_DICT[getCutSceneToLoad()];
	log(`Showing cutscene ${getCutSceneToLoad()}`);
	let index = $state(0);
	let max = $state(cutScene.screens.length);

	function next() {
		if (index + 1 >= max) {
			return;
		}
		index = index + 1;
	}

	function prev() {
		if (index == 0) {
			return;
		}

		index = index - 1;
	}
</script>

<div class="flex flex-col items-center justify-center gap-4 p-4">
	<h1 class="text-5xl">{cutScene.title}</h1>
	{cutScene.screens[index]?.text}
	<div class="flex">
		<ChevronLeft class="cursor-pointer" onclick={prev}></ChevronLeft>

		{index + 1}/{max}
		<ChevronRight class="cursor-pointer" onclick={next}></ChevronRight>
	</div>
	{#if index + 1 == max && cutScene}
		<Button
			variant="outline"
			onclick={() => {
				if (cutScene?.onFinish) {
					cutScene.onFinish();
				}
				persistGameState();
				goToSavedScreen();
			}}>Finish</Button
		>
	{/if}
	<Button
		variant="outline"
		onclick={() => {
			if (cutScene?.onFinish) {
				cutScene.onFinish();
			}
			persistGameState();
			goToSavedScreen();
		}}>Skip</Button
	>
	<GameImage id={cutScene.screens[index]?.image}></GameImage>
</div>
