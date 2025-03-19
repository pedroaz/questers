<script lang="ts">
	import QuestList from '$lib/components/game/quest-list/quest-list.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import { getArchipelago, getQuests } from '$lib/states/game-state.svelte';

	const state = $derived.by(() => {
		const archipelago = getArchipelago();
		const quests = getQuests();
		const huntingQuests = quests.filter((quest) => quest.type == 'hunt');
		return { archipelago, huntingQuests };
	});
</script>

<div class="flex flex-col items-center justify-center gap-4 p-4">
	<Text>This is the ship's deck. Here you can start quests that will go beyond your ship</Text>
	<div class="flex w-full flex-col gap-4">
		<QuestList quests={[]} title="Boarding Ships"></QuestList>
		<QuestList quests={state.huntingQuests} title="Hunting"></QuestList>
		<QuestList quests={[]} title="Exploring Islands"></QuestList>
	</div>
</div>
