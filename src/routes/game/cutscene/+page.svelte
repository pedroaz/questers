<script lang="ts">
	import { CUT_SCENES_DICT } from '$lib/data/cut-scenes';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import Button from '$lib/components/ui/button/button.svelte';
	import { persistGameState } from '$lib/persistence/persistence-service';
	import { reload } from '$lib/persistence/loader-service';
	import { GetGameState } from '$lib/states/game-state.svelte';

	const cutScene = CUT_SCENES_DICT[GetGameState().data.cutSceneToLoad];
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
	{#if index + 1 == max}
		<Button
			onclick={() => {
				cutScene.onFinish();
				persistGameState();
				reload();
			}}>Finish Cut Scene</Button
		>
	{/if}
</div>
