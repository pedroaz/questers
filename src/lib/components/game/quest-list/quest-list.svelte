<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import type { QuestInstance } from '$lib/data/quests';
	import { goToScreen } from '$lib/services/screen-changer-service';
	import { setQuestToLoad } from '$lib/states/game-state.svelte';
	import Icon from '../icon/icon.svelte';

	let { quests, title }: { quests: QuestInstance[]; title: string } = $props();
</script>

<div class="quest-list flex flex-col gap-4 border border-white p-4">
	<Text underline type="medium">{title}</Text>
	{#if quests.length == 0}
		<Text>No quests of this type available right now</Text>
	{/if}
	<Separator></Separator>
	{#each quests as quest}
		<div class="quest-item flex items-center justify-between gap-2 px-8">
			<Text type="medium">{quest.name}</Text>
			<Button
				size="sm"
				onclick={() => {
					setQuestToLoad(quest.id);
					goToScreen('quest');
				}}>Start Quest</Button
			>
		</div>
		<Separator></Separator>
	{/each}
</div>
