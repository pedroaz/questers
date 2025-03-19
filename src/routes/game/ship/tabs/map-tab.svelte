<script lang="ts">
	import QuestList from '$lib/components/game/quest-list/quest-list.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import { AREAS_DICT } from '$lib/data/areas';
	import { getArchipelago, getDiscoveredAreas } from '$lib/states/game-state.svelte';

	const state = $derived.by(() => {
		const archipelago = getArchipelago();
		const discoveredAreas = getDiscoveredAreas();
		return { archipelago, discoveredAreas };
	});
</script>

<div class="flex flex-col items-center justify-center gap-4 p-4">
	<Text>You are currently in the {state.archipelago.name} Archipelago.</Text>
	<Text>You have discovered the following areas:</Text>
	{#each state.discoveredAreas as area}
		<Text>{AREAS_DICT[area].name}</Text>
	{/each}

	<div class="flex w-full flex-col gap-4">
		<QuestList quests={[]} title="Explore"></QuestList>
	</div>
</div>
