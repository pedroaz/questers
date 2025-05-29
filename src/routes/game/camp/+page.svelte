<script lang="ts">
	import UnitCard from '$lib/components/game/unit-card/unit-card.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import type { Unit } from '$lib/domain/unit/unit';
	import { getPlayerParty, getPlayerUnit } from '$lib/states/player-state.svelte';
	import { getUnit } from '$lib/states/units-state.svelte';
	import CampParty from './camp-party.svelte';
	import CampNavigation from './camp-navigation.svelte';

	let isMapOpen = $state(false);
	let isRegionIconOpen = $state(false);
	let selectedUnit = $state<Unit>(getPlayerUnit());

	// let data = $derived.by(() => {
	// 	const player = getPlayerUnit();
	// 	const party = getPlayerParty();
	// 	// const quests = getQuests();
	// 	// const region = getRegion();
	// 	return {
	// 		player,
	// 		party
	// 	};
	// });
</script>

<div class="flex h-full justify-center">
	<div class="flex w-full">
		<div class="flex flex-[0.3] flex-col items-center justify-evenly">
			<CampParty></CampParty>
		</div>
		<div class="flex flex-[0.4] justify-center">
			<CampNavigation></CampNavigation>
		</div>
		<div class="flex flex-[0.3] justify-center"></div>
	</div>
</div>

<!-- <div class="flex h-full">
	<div class="flex flex-[0.3] flex-col items-center justify-center">
		<div class="flex items-center justify-center">
			<Party></Party>
		</div>
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
							>Embark on adventures with your crew. Discover more areas to unlock more quests</Text
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
	<div class="flex flex-[0.1] flex-col items-center justify-around">
		<div class="cursor-pointer" onclick={() => (isMapOpen = true)}>
			<GameImage id="map/map.png"></GameImage>
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
				<Text type="big" underline>{data.region.name}</Text>
				<Button variant="outline">Explore Region!</Button>
			</div>
		</Dialog.Title>
		<Dialog.Description>
			<Map></Map>
		</Dialog.Description>
	</Dialog.Content>
</Dialog.Root> -->
