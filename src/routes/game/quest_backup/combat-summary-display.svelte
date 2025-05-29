<script lang="ts">
	import Icon from '$lib/components/game/icon/icon.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import {
		getEnemyHp,
		getEnemyMaxHp,
		getPlayerParty,
		getTotalCrewDefense,
		getTotalCrewPower,
		getTotalEnemyDefense,
		getTotalEnemyPower
	} from '$lib/states/game-state.svelte';

	const data = $derived.by(() => {
		const enemyHp = getEnemyHp();
		const enemyMaxHp = getEnemyMaxHp();
		const totalCrewDefense = getTotalCrewDefense();
		const totalCrewPower = getTotalCrewPower();
		const totalEnemyDefense = getTotalEnemyDefense();
		const totalEnemyPower = getTotalEnemyPower();
		return {
			enemyHp,
			enemyMaxHp,
			totalCrewDefense,
			totalCrewPower,
			totalEnemyDefense,
			totalEnemyPower
		};
	});
</script>

<div class="flex flex-col items-center justify-evenly">
	<div>
		<Text
			>{`${data.totalCrewPower} - ${data.totalEnemyDefense} = ${data.totalCrewPower - data.totalEnemyDefense}`}</Text
		>
	</div>
	<div>
		<Text
			>{`${data.totalEnemyPower} - ${data.totalCrewDefense} = ${data.totalEnemyPower - data.totalCrewDefense}`}</Text
		>
	</div>
</div>
