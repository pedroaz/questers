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

			const action = actions.find((action) => action.unitId == unitId);
			const crewUnit = crewUnits.find((unit) => unit.uuid == unitId);
			const enemyUnit = enemyUnits.find((unit) => unit.uuid == unitId);

			if (crewUnit) {
				if (!action) {
					res.push(crewUnit.name);
				} else {
					res.push(`${crewUnit.name}  ${action?.skillInstance?.data?.name}`);
				}
			}
			if (enemyUnit) {
				if (!action) {
					res.push(enemyUnit.name);
				} else {
					res.push(`${enemyUnit.name}  ${action?.skillInstance?.data.name}`);
				}
			}
		}

		return res;
	});
</script>

<div class="flex items-center justify-center gap-1">
	{#each unitTexts as text}
		<div class="box cursor-default rounded-md px-2">
			<Text type="small">{text}</Text>
		</div>
	{/each}
</div>
