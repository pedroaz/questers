<script lang="ts">
	import GameImage from '$lib/components/game/image/game-image.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import { CHESTS_DICT } from '$lib/data/chests/chests-storage';
	import { goToScreen } from '$lib/domain/screen-changing/screen-changer-service';
	import { ScreenId } from '$lib/domain/screen-changing/screens';
	import { getPlayerParty } from '$lib/states/player-state.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import type { ChestId } from '$lib/data/chests/chests-models';

	const playerParty = getPlayerParty();
	let openChestDialog = $state(false);
	let chestId = $state<ChestId>();
	function selectChest(chest: ChestId) {
		chestId = chest;
		openChestDialog = true;
	}
</script>

<div class="flex flex-col items-center justify-center gap-4 p-4">
	<Text type="big">Reward Screen</Text>

	<div class="flex items-center justify-center">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		{#each playerParty.chestsToOpen as chest}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<div
				onclick={() => {
					selectChest(chest);
				}}
				class="flex flex-col items-center justify-center"
			>
				<GameImage path={CHESTS_DICT[chest].image}></GameImage>
				<Text>{CHESTS_DICT[chest].name}</Text>
			</div>
		{/each}
	</div>
</div>

<div class="fixed bottom-40 right-40">
	<Button
		onclick={() => {
			goToScreen(ScreenId.Loadout);
		}}>Skip</Button
	>
</div>

<Dialog.Root
	open={openChestDialog}
	onOpenChange={(open) => {
		openChestDialog = open;
	}}
>
	<Dialog.Content class="w-[40%] max-w-none">
		<Dialog.Description></Dialog.Description>
	</Dialog.Content>
</Dialog.Root>
