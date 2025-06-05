<script lang="ts">
	import Icon from '../icon/icon.svelte';
	import GameImage from '../image/game-image.svelte';

	import Text from '$lib/components/ui/text/text.svelte';
	import { POWER_MAP_DESC } from '$lib/domain/combat/power-map';
	import type { Unit } from '$lib/domain/unit/unit';
	import { getCurrentQuest, getNavigationData } from '$lib/states/player-state.svelte';
	let { unit }: { unit: Unit } = $props();
	const quest = getCurrentQuest();
</script>

<div class="flex flex-col items-center justify-center">
	<Text type="medium">{unit.name}</Text>
	<GameImage path={unit.bodyImage}></GameImage>
	<div class="flex items-center justify-center gap-2">
		<div class="flex flex-col items-center">
			<Icon icon="warrior"></Icon><Text>{unit.attributes.strength}</Text>
		</div>
		<div class="flex flex-col items-center">
			<Icon icon="explorer"></Icon><Text>{unit.attributes.leadership}</Text>
		</div>
		<div class="flex flex-col items-center">
			<Icon icon="hunter"></Icon><Text>{unit.attributes.agility}</Text>
		</div>
		<div class="flex flex-col items-center">
			<Icon icon="crafter"></Icon><Text>{unit.attributes.intellect}</Text>
		</div>
		<div class="flex flex-col items-center">
			<Icon icon="sage"></Icon><Text>{unit.attributes.spirit}</Text>
		</div>
	</div>
	<Text type="medium">{`${POWER_MAP_DESC[quest.data.type]} = ${unit.power}`}</Text>
</div>
