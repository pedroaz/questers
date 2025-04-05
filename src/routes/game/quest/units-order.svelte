<script lang="ts">
	import Text from '$lib/components/ui/text/text.svelte';
	import {
		getAllOrder,
		getUnitActions,
		getCrewOrder,
		getEnemies,
		getEnemiesOrder,
		getWorldUnits
	} from '$lib/states/game-state.svelte';

	let data = $derived.by(() => {
		const crewOrder = getCrewOrder();
		const unitActions = getUnitActions();

		const enemyOrder = getEnemiesOrder();
		const units = getWorldUnits();

		const allOrder = getAllOrder();
		const enemies = getEnemies();

		return {
			crewOrder,
			unitActions,
			enemyOrder,
			units,
			allOrder,
			enemies
		};
	});

	function getUnitText(unitId: string) {
		const crewUnit = data.units.find((unit) => unit.uuid == unitId);
		const unitActions = data.unitActions.find((action) => action.unitId == unitId);
		console.log(unitActions);

		if (crewUnit) {
			return `${crewUnit?.name}${unitActions?.skillInstance?.data.name != undefined ? ' - ' + unitActions.skillInstance.data.name : ''}`;
		} else {
			const enemy = data.enemies.find((enemy) => enemy.uuid == unitId);
			return `${enemy?.name}${unitActions?.skillInstance?.data.name != undefined ? ' - ' + '?' : ''}`;
		}
	}
</script>

<div class="flex items-center justify-center gap-1">
	{#each data.allOrder as unitId}
		<div class="box cursor-default rounded-md px-2">
			<Text type="small">{getUnitText(unitId)}</Text>
		</div>
	{/each}
</div>
