<script lang="ts">
	import QuestList from '$lib/components/game/quest-list/quest-list.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
</script>

<div class="flex flex-col items-center justify-center gap-4 p-4">
	<Text>This is your room. Here you can see your character and improve your stats</Text>
	<div class="w-full">
		<QuestList quests={[]} title="Praying"></QuestList>
	</div>
</div>
