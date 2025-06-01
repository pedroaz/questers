<script lang="ts">
	import UnitCard from '$lib/components/game/unit-card/unit-card.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import type { Unit } from '$lib/domain/unit/unit';
	import { getPlayerParty, getPlayerUnit } from '$lib/states/player-state.svelte';
	import { getUnitById } from '$lib/states/units-state.svelte';
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
