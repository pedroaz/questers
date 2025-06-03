<script lang="ts">
	import UnitBody from '$lib/components/game/unit-body/unit-body.svelte';
	import { getCombatState } from '$lib/states/combat-state.svelte';
	import {
		getEnemiesIds,
		getNavigationData,
		getSelectedQuest
	} from '$lib/states/player-state.svelte';
	import { getUnitById } from '$lib/states/units-state.svelte';

	let data = $derived.by(() => {
		const quest = getSelectedQuest();

		let enemyIds = getEnemiesIds();

		return {
			quest,
			enemyIds
		};
	});
</script>

<div class="flex gap-2">
	{#each data.enemyIds as id, i}
		<div {id} class="flex items-center justify-center">
			<UnitBody unit={getUnitById(id)}></UnitBody>
		</div>
	{/each}
</div>
