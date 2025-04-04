<script lang="ts">
	import Icon from '$lib/components/game/icon/icon.svelte';
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
	import QuestInfo from './quest-info.svelte';

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

<div class="flex justify-around gap-4">
	<div class="flex flex-[0.2] flex-col items-center justify-center gap-2">
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

	<QuestInfo></QuestInfo>

	<div class="flex flex-[0.2] flex-col items-center justify-center gap-2">
		<div class="flex items-center justify-center">
			<Icon icon="heart"></Icon>
			<Text>{data.enemyHp} / {data?.enemyMaxHp}</Text>
		</div>
		<div class="flex items-center justify-center gap-1">
			<div class="flex items-center justify-center">
				<Icon icon="power"></Icon>
				<Text>{getTotalEnemyPower()}</Text>
			</div>
			<div class="flex items-center justify-center">
				<Icon icon="defense"></Icon>
				<Text>{getTotalEnemyDefense()}</Text>
			</div>
		</div>
	</div>
</div>
