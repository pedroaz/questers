<script lang="ts">
	import UnitCard from '$lib/components/game/unit-card/unit-card.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import { getPlayerShip, getUnitById } from '$lib/states/game-state.svelte';

	const playerShip = getPlayerShip();
	const unitIds = playerShip.units;
	const units = unitIds.map((unitId) => getUnitById(unitId));
</script>

<Text>There is {unitIds.length} units in you ship</Text>

{#each units as unit}
	<UnitCard {unit}></UnitCard>
{/each}
