<script lang="ts">
	import UnitCard from '$lib/components/game/unit-card/unit-card.svelte';
	import { getPlayerParty, getPlayerUnit } from '$lib/states/player-state.svelte';
	
let data = $derived.by(() => {
		const player = getPlayerUnit();
		const party = getPlayerParty();
		return {
			player,
			party
		};
	});
</script>

<div class="w-1/2">
	<UnitCard unit={data.player} />
</div>
<!-- <div class="flex w-1/2">
	{#each data.party.companionsIds as companionId}
		<UnitCard unit={getUnitById(companionId)} />
	{/each}
</div> -->
