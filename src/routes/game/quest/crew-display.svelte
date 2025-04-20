<script lang="ts">
	import Icon from '$lib/components/game/icon/icon.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import {
		getEnemyHp,
		getEnemyMaxHp,
		getPlayerShip,
		getTotalCrewDefense,
		getTotalCrewPower
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

<div class="flex flex-col items-center justify-center gap-2">
	<Text type="medium">Crew</Text>
	<div class="flex items-center justify-center">
		<Icon icon="heart"></Icon>
		<Text>{data.ship?.hp} / {data.ship?.maxHp}</Text>
	</div>
	<div class="flex items-center justify-center gap-1">
		<div class="flex items-center justify-center">
			<Icon icon="power"></Icon>
			<Text>{getTotalCrewPower()}</Text>
		</div>
		<div class="flex items-center justify-center">
			<Icon icon="defense"></Icon>
			<Text>{getTotalCrewDefense()}</Text>
		</div>
	</div>
</div>
