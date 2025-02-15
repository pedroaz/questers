<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { ScreenType } from '$lib/schemas/screen-type';
	import type { QuestInstance } from '$lib/services/quest-generator';
	import { goToScreen } from '$lib/services/screen-changer-service';
	import { gameState } from '$lib/states/game-state.svelte';
	let selectedQuest: QuestInstance | null = null;
</script>

<div class="flex flex-col items-center justify-center gap-4 p-4">
	<h1 class="text-5xl">Quests</h1>
	{#each gameState.data.quests as quest}
		<Button
			onclick={() => {
				selectedQuest = quest;
			}}>{quest.name}</Button
		>
	{/each}

	{#if selectedQuest}
		<h1>Quest:</h1>
		<h1>{selectedQuest.name}</h1>
		<Button
			onclick={() => {
				gameState.data.currentQuest = selectedQuest;
				goToScreen(ScreenType.Quest);
			}}>Start Quest</Button
		>
	{/if}
</div>
