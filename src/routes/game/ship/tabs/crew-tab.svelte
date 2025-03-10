<script lang="ts">
	import UnitCard from '$lib/components/game/unit-card/unit-card.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import {
		GetGameState,
		GetUnitIdsFromShip,
		GetUnitsFromShip
	} from '$lib/states/game-state.svelte';

	const gameState = GetGameState();
	const shipUnits = GetUnitsFromShip(gameState.data.playerShipId);
</script>

<Text>There is {shipUnits.length} units in you ship</Text>

{#each shipUnits as unit}
	<UnitCard {unit}></UnitCard>
{/each}
