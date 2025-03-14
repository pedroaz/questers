<script lang="ts">
	import UnitCard from '$lib/components/game/unit-card/unit-card.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import { goToScreen } from '$lib/services/screen-changer-service';
	import { getQuests, setQuestToLoad } from '$lib/states/game-state.svelte';

	const quests = getQuests().filter((quest) => quest.enabled);
</script>

<div class="flex flex-col gap-4">
	{#each quests as quest}
		<Text>Quest Type: {quest.type}</Text>
		<div class="flex gap-4">
			{#each quest.enemies as enemy}
				<UnitCard unit={enemy}></UnitCard>
			{/each}
		</div>
		<Button
			onclick={() => {
				setQuestToLoad(quest.id);
				goToScreen('quest');
			}}>Start Quest</Button
		>
	{/each}
</div>
