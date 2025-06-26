<script lang="ts">
	import UnitCard from '$lib/components/game/unit-card/unit-card.svelte';
	import { Button } from '$lib/components/ui/button';
	import Text from '$lib/components/ui/text/text.svelte';
	import {
		getNavigationData
	} from '$lib/states/player-state.svelte';
	import { getUnitById, getUnits } from '$lib/states/units-state.svelte';

	let show = $state('units');
	const units = getUnits();
	const navigationData = getNavigationData();
</script>

<div class="flex h-full flex-col items-center text-center">
	<div class="flex">
		<Button onclick={() => (show = 'general')}>General</Button>
		<Button onclick={() => (show = 'units')}>Units</Button>
		<Button onclick={() => (show = 'navigation')}>Navigation</Button>
	</div>

	<div class="flex h-full items-center justify-center">
		{#if show === 'general'}General{/if}
		{#if show === 'units'}
			{#each units as unit}
				<UnitCard {unit}></UnitCard>
			{/each}
		{/if}
		{#if show === 'navigation'}
			<div class="flex flex-col items-center gap-4">
				<Text type="big">{navigationData.currentRegion}</Text>
				<Text type="medium">Quests</Text>
				<div class="flex flex-col gap-2">
					{#each navigationData.quests as quest}
						<div>
							{quest.data.name}
							(
							{#each quest.rounds as round}
								{#each round.enemiesIds as enemyId}
									{getUnitById(enemyId).name}
								{/each}
							{/each}
							)
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>

	<!-- <div>Player Unit: {JSON.stringify(getPlayerUnit())}</div>
	<div>Player Party: {JSON.stringify(getPlayerParty())}</div> -->
	<!-- <div>Navigation: {JSON.stringify(getNavigationData())}</div> -->
</div>
