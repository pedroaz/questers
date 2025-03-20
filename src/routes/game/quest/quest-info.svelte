<script lang="ts">
	import Text from '$lib/components/ui/text/text.svelte';
	import {
		getCurrentPhase,
		getPhaseIndex,
		getQuestById,
		getQuestToLoad
	} from '$lib/states/game-state.svelte';

	const data = $derived.by(() => {
		const quest = getQuestById(getQuestToLoad());
		const phaseIndex = getPhaseIndex();
		const currentPhase = getCurrentPhase();
		return {
			quest,
			phaseIndex,
			currentPhase
		};
	});
</script>

<div class="flex">
	<div class="flex h-full flex-col items-center justify-center gap-2">
		<Text type="small">[{data.quest?.type}] {data.quest?.name}</Text>
		<Text type="small">Win Condition: {data.currentPhase.winCondition}</Text>
	</div>

	<div class="flex flex-col items-center justify-center p-2 text-center">
		<Text type="small">Phases:</Text>
		<div class="flex gap-1">
			{#each data.quest?.phases! as phase, index}
				<Text type="small" underline={index === data.phaseIndex}>{phase.type}</Text>
			{/each}
		</div>
	</div>
</div>
