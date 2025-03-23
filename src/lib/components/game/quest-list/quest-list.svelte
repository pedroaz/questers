<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import type { QuestInstance } from '$lib/data/quests';
	import { goToScreen } from '$lib/services/screen-changer-service';
	import { setPhaseIndex, setQuestToLoad, setStage } from '$lib/states/game-state.svelte';

	let { quests, title }: { quests: QuestInstance[]; title: string } = $props();
</script>

<div class="quest-list flex flex-col gap-4 border border-white p-4">
	<Text underline type="medium">{title}</Text>
	<Separator></Separator>

	{#if quests.length == 0}
		<Text>No quests of this type available right now</Text>
	{/if}
	<div class="flex flex-wrap gap-1">
		{#each quests as quest}
			<Button
				size="sm"
				disabled={!quest.enabled}
				onclick={() => {
					setStage('new-stage-dialog');
					setPhaseIndex(0);
					setQuestToLoad(quest.id);
					goToScreen('quest');
				}}>{quest.data.name}</Button
			>
		{/each}
	</div>
</div>
