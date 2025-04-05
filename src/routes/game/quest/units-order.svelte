<script lang="ts">
	import Text from '$lib/components/ui/text/text.svelte';
	import { getAllOrder, getEnemies, getCrew, getUnitActions } from '$lib/states/game-state.svelte';

	let unitTexts = $derived.by(() => {
		const res: string[] = [];
		const allOrder = getAllOrder();
		const crewUnits = getCrew();
		const enemyUnits = getEnemies();
		const actions = getUnitActions();

		for (let i = 0; i < allOrder.length; i++) {
			const unitId = allOrder[i];

			const crewUnit = crewUnits.find((unit) => unit.uuid == unitId);
			const enemyUnit = enemyUnits.find((unit) => unit.uuid == unitId);
			const action = actions.find((action) => action.unitId == unitId);

			if (crewUnit) {
				const text = `${crewUnit.name} - ${action?.skillInstance?.data.name ?? ''}`;
				res.push(text);
			}
			if (enemyUnit) {
				res.push(`${enemyUnit.name} - ?`);
			}
		}

		return res;
	});

	// function getUnitText(unitId: string) {
	// 	const crewUnit = data.units.find((unit) => unit.uuid == unitId);
	// 	const unitActions = data.unitActions.find((action) => action.unitId == unitId);

	// 	if (crewUnit) {
	// 		return `${crewUnit?.name}${unitActions?.skillInstance?.data.name != undefined ? ' - ' + unitActions.skillInstance.data.name : ''}`;
	// 	} else {
	// 		const enemy = data.enemies.find((enemy) => enemy.uuid == unitId);
	// 		return `${enemy?.name}${unitActions?.skillInstance?.data?.name != undefined ? ' - ' + '?' : ''}`;
	// 	}
	// }
</script>

<div class="flex items-center justify-center gap-1">
	{#each unitTexts as text}
		<div class="box cursor-default rounded-md px-2">
			<Text type="small">{text}</Text>
		</div>
	{/each}
</div>
