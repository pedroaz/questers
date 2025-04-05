<script lang="ts">
	import {
		getArchipelago,
		getPlayerShip,
		getPlayerUnit,
		getQuests,
		getUnitById,
		setQuestRoundIndex,
		setQuestToLoad,
		setStage
	} from '$lib/states/game-state.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { goToScreen } from '$lib/services/screen-changer-service';
	import UnitBody from '$lib/components/game/unit-body/unit-body.svelte';
	import type { Unit } from '$lib/schemas/unit';
	import { onMount } from 'svelte';
	import GameImage from '$lib/components/game/image/game-image.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import Icon from '$lib/components/game/icon/icon.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Map from './map.svelte';

	let isMapOpen = $state(false);

	let data = $derived.by(() => {
		const player = getPlayerUnit();
		const ship = getPlayerShip();
		const quests = getQuests();
		const archipelago = getArchipelago();
		return {
			player,
			ship,
			quests,
			archipelago
		};
	});

	let selectedUnitId: string = $state('');
	let selectedUnit: Unit = $derived.by(() => {
		return getUnitById(selectedUnitId);
	});

	onMount(() => {
		selectedUnitId = data.player?.uuid ?? '';
	});
</script>

<div class="flex h-full">
	<div class="flex flex-[0.3] flex-col items-center justify-center">
		{#if getUnitById(selectedUnitId)}
			<div class="flex items-center justify-center">
				<!-- <UnitBody unit={selectedUnit}></UnitBody> -->
			</div>
		{/if}
	</div>
	<div class="flex flex-[0.6] flex-col items-center">
		<div>
			<Text type="big">Quests</Text>
			<Tooltip.Provider>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Icon icon="question"></Icon>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<Text type="small"
							>Embark on adventures with your crew. Discover more islands to unlock more quests</Text
						>
					</Tooltip.Content>
				</Tooltip.Root>
			</Tooltip.Provider>
		</div>
		<div class="m-5 h-full p-5">
			<div class="flex flex-wrap gap-6">
				{#each data.quests as quest}
					<Button
						disabled={!quest.enabled}
						onclick={() => {
							setQuestRoundIndex(0);
							setQuestToLoad(quest.id);
							goToScreen('quest');
						}}>{quest.data.name}</Button
					>
				{/each}
			</div>
		</div>
	</div>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div class="flex flex-[0.1] flex-col items-center justify-around">
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="cursor-pointer" onclick={() => (isMapOpen = true)}>
			<GameImage id="map/map-icon.png"></GameImage>
		</div>
		<div>
			<Button variant="outline" onclick={() => goToScreen('end-day')}>End Day</Button>
		</div>
	</div>
</div>

<Dialog.Root open={isMapOpen} onOpenChange={(open) => (isMapOpen = open)}>
	<Dialog.Content class="w-[40%] max-w-none">
		<Dialog.Title>
			<div class="flex items-center justify-evenly gap-4">
				<Text type="big" underline>{data.archipelago.name}</Text>
				<Button variant="outline">Explore Archipelago!</Button>
			</div>
		</Dialog.Title>
		<Dialog.Description>
			<Map></Map>
		</Dialog.Description>
	</Dialog.Content>
</Dialog.Root>
