<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import { goToScreen } from '$lib/services/screen-changer-service';
	import {
		addExperienceToPlayer,
		addMoneyToPlayer,
		completePlayerQuest,
		getPlayerQuest,
		setBackground
	} from '$lib/states/game-state.svelte';

	setBackground('none');

	const data = $derived.by(() => {
		const quest = getPlayerQuest();
		return {
			quest
		};
	});
	function takeRewards() {
		completePlayerQuest();
		goToScreen('ship');
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
	<Button onclick={takeRewards}>Continue</Button>
</div>
