<script lang="ts">
	import GameImage from '$lib/components/game/image/game-image.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import { goToScreen } from '$lib/domain/screen-changing/screen-changer-service';
	import { ScreenId } from '$lib/domain/screen-changing/screens';
	import { getPlayerParty } from '$lib/states/player-state.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { type ChestReward } from '$lib/data/chests/chests-models';
	import { onMount } from 'svelte';
	import { initRewards, takeResourceReward } from './reward-functions';

	const playerParty = getPlayerParty();
	let openChestDialog = $state(false);
	let selectedReward = $state<ChestReward>();
	onMount(() => {
		initRewards();
	});

	function clickChest(reward: ChestReward) {
		if (
			reward.data?.type === 'gold' ||
			reward.data?.type === 'exp' ||
			reward.data?.type === 'level-up'
		) {
			takeResourceReward(reward);
			return;
		} else {
			selectedReward = reward;
			openChestDialog = true;
		}
	}

	function nextScreen() {
		playerParty.rewards = [];
		goToScreen(ScreenId.Loadout);
	}
</script>

<div class="flex flex-col items-center justify-center gap-4 p-4">
	<Text type="big">Open Chests</Text>

	<div class="flex items-center justify-center gap-4">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		{#each playerParty.rewards as reward}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<div
				onclick={() => {
					if (reward.opened) return;
					clickChest(reward);
				}}
				class="gbox flex cursor-pointer flex-col items-center justify-center"
			>
				{#if reward.opened}
					{#if reward.data?.type === 'gold'}
						<Text type="medium">+{reward.gold} Gold</Text>
					{:else if reward.data?.type === 'exp'}
						<Text type="medium">+{reward.exp} Exp</Text>
					{:else if reward.data?.type === 'level-up'}
						<Text type="medium">+1 Level</Text>
					{/if}
				{:else}
					<GameImage path={reward.data?.image}></GameImage>
				{/if}
				<Text>{reward.data?.name}</Text>
			</div>
		{/each}
	</div>
</div>

<div class="fixed bottom-40 right-40">
	{#if playerParty.rewards.filter((reward) => !reward.opened).length === 0}
		<Button
			onclick={() => {
				nextScreen();
			}}>Continue</Button
		>
	{:else}
		<Button
			onclick={() => {
				nextScreen();
			}}>Skip</Button
		>
	{/if}
</div>

<Dialog.Root
	open={openChestDialog}
	onOpenChange={(open) => {
		openChestDialog = open;
	}}
>
	<Dialog.Content class="w-[40%] max-w-none">
		<Dialog.Description>
			<div class="flex flex-col items-center justify-center gap-4">
				<Text type="medium">{selectedReward?.data?.name}</Text>
			</div>
		</Dialog.Description>
	</Dialog.Content>
</Dialog.Root>
