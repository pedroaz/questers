<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import {
		addEquipmentsToPlayer,
		addMoneyToPlayer,
		getPlayerParty,
		removeChestFromPlayer
	} from '$lib/states/game-state.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import GameImage from '$lib/components/game/image/game-image.svelte';
	import DialogFooter from '$lib/components/ui/dialog/dialog-footer.svelte';
	import { generateChestRewards } from '$lib/domain/rewards/chest-reward-factory';
	import { CHESTS_DICT, type ChestId, type ChestReward } from '$lib/data/chests/chests-models';

	let isOpen = $state(false);
	let selectedChest = $state('none' as ChestId);
	let reward = $state({
		gold: 0,
		equips: [],
		data: null
	} as ChestReward | null);
	const data = $derived.by(() => {
		const party = getPlayerParty();
		return { party };
	});

	function selectChest(chestId: ChestId) {
		isOpen = true;
		selectedChest = chestId;
		reward = generateChestRewards(chestId);
		addMoneyToPlayer(reward.gold);
		addEquipmentsToPlayer(reward.equips);
		removeChestFromPlayer(chestId);
	}

	function confirm() {
		isOpen = false;
	}
</script>

<div class="flex flex-col items-center justify-center gap-4">
	{#if data.party}
		{#each data.party.chestsToOpen as chest}
			<div class="flex items-center">
				<div class="h-[50px] w-[50px]">
					<GameImage id={CHESTS_DICT[chest as ChestId].image}></GameImage>
				</div>
				<Button
					variant="outline"
					onclick={() => {
						selectChest(chest);
					}}>Open</Button
				>
			</div>
		{/each}
	{/if}
</div>

{#if selectedChest}
	<Dialog.Root open={isOpen} onOpenChange={(open) => (isOpen = open)}>
		<Dialog.Content
			interactOutsideBehavior="ignore"
			escapeKeydownBehavior="ignore"
			class="h-[50%] w-[50%] [&>button]:hidden"
		>
			<Dialog.Title>{reward?.data?.name}</Dialog.Title>

			<Dialog.Header>
				<Dialog.Description>
					<div class="flex flex-col items-center justify-center gap-2">
						{#each reward?.equips ?? [] as equip}
							<div class="h-[100px] w-[100px]">
								<!-- <GameImage id={EQUIP_DICT[equip].image}></GameImage> -->
							</div>
						{/each}
						<Text type="medium">GOLD: {reward?.gold ?? 0}</Text>
					</div>
				</Dialog.Description>
			</Dialog.Header>
			<DialogFooter>
				<Button
					variant="outline"
					onclick={() => {
						confirm();
					}}>Confirm</Button
				>
			</DialogFooter>
		</Dialog.Content>
	</Dialog.Root>
{/if}
