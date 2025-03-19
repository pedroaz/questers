<script lang="ts">
	import QuestList from '$lib/components/game/quest-list/quest-list.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
</script>

<div class="flex flex-col items-center justify-center gap-4 p-4">
	<Text>This is the workshop. Here you can craft equipments and improve your ship</Text>
	<div class="flex w-full flex-col gap-4">
		<QuestList quests={[]} title="Crafting"></QuestList>
		<QuestList quests={[]} title="Improving Ship"></QuestList>
	</div>
</div>
