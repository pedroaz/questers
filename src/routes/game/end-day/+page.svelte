<script lang="ts">
	import GameImage from '$lib/components/game/image/game-image.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import { goToScreen } from '$lib/domain/screen-changing/screen-changer-service';
	import { ScreenId } from '$lib/domain/screen-changing/screens';
	import { getPlayerParty } from '$lib/states/player-state.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { type ChestReward } from '$lib/data/chests/chests-models';
	import { onDestroy, onMount } from 'svelte';
	import {
		initRewards,
		takeArtifactReward,
		takeResourceReward,
		takeSkillReward
	} from './reward-service';
	import { SKILLS_DICT } from '$lib/data/skills/skills-storage';
	import { ARTIFACTS_DICT } from '$lib/data/artifacts/artifacts-storage';

	const playerParty = getPlayerParty();
	let openChestDialog = $state(false);
	let selectedReward = $state<ChestReward>();
	onMount(() => {
		initRewards();
	});

	onMount(async () => {
		window.addEventListener('keydown', handleKeydown);
	});

	onDestroy(() => {
		window.removeEventListener('keydown', handleKeydown);
	});

	async function handleKeydown(event: KeyboardEvent) {
		if (event.code === 'Space') {
			event.preventDefault(); // Optional: prevent scrolling
			let spaceReward: ChestReward | undefined = undefined;
			playerParty.rewards.forEach((reward) => {
				if (!reward.opened) {
					spaceReward = reward;
				}
			});
			for (let i = 0; i < playerParty.rewards.length; i++) {
				const r = playerParty.rewards[i];
				if (r.opened) {
					continue;
				}
				spaceReward = r;
				break;
			}
			if (!spaceReward) {
				nextScreen();
			} else {
				clickChest(spaceReward);
			}
		}
	}

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
					<GameImage width="15vh" height="15vh" path={reward.data?.image}></GameImage>
				{/if}
				<Text>{reward.data?.name}</Text>
			</div>
		{/each}
	</div>

	<Text type="big">Quests done by other Parties</Text>
	<Button
		disabled={playerParty.rewards.filter((reward) => !reward.opened).length != 0}
		onclick={() => {
			nextScreen();
		}}
		>{playerParty.rewards.filter((reward) => !reward.opened).length != 0
			? 'Open chests first'
			: 'Continue'}</Button
	>
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
				{#each selectedReward?.skills ?? [] as skill}
					<div class="flex items-center justify-center">
						<GameImage width="15vh" height="15vh" path={SKILLS_DICT[skill].image}></GameImage>
						<Button
							onclick={() => {
								if (!selectedReward) return;
								takeSkillReward(skill);
								selectedReward.opened = true;
								selectedReward = undefined;
								openChestDialog = false;
							}}>{SKILLS_DICT[skill].name}</Button
						>
					</div>
				{/each}
				{#each selectedReward?.artifacts ?? [] as artifact}
					<div class="flex items-center justify-center">
						<GameImage width="15vh" height="15vh" path={ARTIFACTS_DICT[artifact].image}></GameImage>
						<Button
							onclick={() => {
								if (!selectedReward) return;
								takeArtifactReward(artifact);
								selectedReward.opened = true;
								selectedReward = undefined;
								openChestDialog = false;
							}}>{ARTIFACTS_DICT[artifact].name}</Button
						>
					</div>
				{/each}
			</div>
		</Dialog.Description>
	</Dialog.Content>
</Dialog.Root>
