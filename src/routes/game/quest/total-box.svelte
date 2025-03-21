<script lang="ts">
	import Text from '$lib/components/ui/text/text.svelte';
	import {
		getEnemyHp,
		getEnemyMaxHp,
		getPlayerShip,
		getTotalCrewDefense,
		getTotalCrewPower,
		getTotalEnemyDefense,
		getTotalEnemyPower
	} from '$lib/states/game-state.svelte';

	const data = $derived.by(() => {
		const ship = getPlayerShip();
		const enemyHp = getEnemyHp();
		const enemyMaxHp = getEnemyMaxHp();
		return {
			ship,
			enemyHp,
			enemyMaxHp
		};
	});
</script>

<div class="flex justify-center gap-4">
	<div class="box total-box flex flex-[0.2] flex-col items-center justify-center">
		<Text>Hp {data.ship?.hp} / {data.ship?.maxHp}</Text>
		<Text>Power {getTotalCrewPower()}</Text>
		<Text>Defense {getTotalCrewDefense()}</Text>
	</div>

	<div class="box flex flex-[0.2] flex-col items-center justify-center">
		<!-- Other Pirates Ships also do Quests -->
		<Text>Hp {data.enemyHp} / {data?.enemyMaxHp}</Text>
		<Text>Power {getTotalEnemyPower()}</Text>
		<Text>Defense {getTotalEnemyDefense()}</Text>
	</div>
</div>
