<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import { goToScreen } from '$lib/domain/screen-changer-service';
	import { completePlayerQuest, getPlayerQuest } from '$lib/states/game-state.svelte';

	const data = $derived.by(() => {
		const quest = getPlayerQuest();
		return {
			quest
		};
	});
	function takeRewards() {
		completePlayerQuest();
		goToScreen('camp');
	}
</script>

<div class="central-screen flex flex-col gap-4">
	<Text type="big">Quest Completed</Text>
	<p>You have completed the quest "{data.quest?.data.name}"</p>
	{#if data.quest}
		<ul>
			<li>Gold: {data.quest?.goldReward}</li>
			<li>Experience: {data.quest?.experienceReward}</li>
			{#each data.quest.chestRewards as chest}
				<li>{chest}</li>
			{/each}
		</ul>
	{/if}
	<Button variant="outline" onclick={takeRewards}>Continue</Button>
</div>
