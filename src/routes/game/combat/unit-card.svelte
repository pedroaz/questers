<script lang="ts">
	import type { Unit } from '$lib/schemas/unit';
	import { CombatUnitType } from '$lib/services/combat-serice';
	import { gameState } from '$lib/states/game-state.svelte';

	export let unit: Unit;
	export let combatType: CombatUnitType = CombatUnitType.Friendly;

	function clickUnit() {
		if (combatType == CombatUnitType.Enemy) {
			gameState.data.selectedEnemyId = unit.uuid;
			console.log(gameState.data.selectedEnemyId);
		}
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onclick={clickUnit} class="box-border cursor-pointer border border-black">
	<div>
		[{unit.level}]{unit.name}
	</div>
</div>
