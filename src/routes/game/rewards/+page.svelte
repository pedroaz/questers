<script lang="ts">
	import { goto } from '$app/navigation';
	import GameImage from '$lib/components/game/image/game-image.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import { CHESTS_DICT } from '$lib/data/chests/chests-storage';
	import { getCurrentQuest, getPlayerParty } from '$lib/states/player-state.svelte';

	const data = $derived.by(() => {
		const quest = getCurrentQuest();
		return {
			quest
		};
	});
	function takeRewards() {
		const playerParty = getPlayerParty();
		const quest = getCurrentQuest();
		quest.chestRewards.forEach((chest) => {
			playerParty.chestsToOpen.push(chest);
		});
		goto('/game/camp');
	}
</script>

<div class="flex flex-col items-center justify-center gap-4">
	<Text type="big">Quest Completed</Text>
	{#if data.quest}
		<Text type="medium">Rewards</Text>
		<div class="flex items-center justify-center gap-4">
			{#each data.quest.chestRewards as chest}
				<div class="flex cursor-default flex-col items-center justify-center gap-2">
					<GameImage path={CHESTS_DICT[chest].image}></GameImage>
					<Text>{chest}</Text>
				</div>
			{/each}
		</div>
	{/if}
	<Button onclick={takeRewards}>Take all</Button>
</div>
