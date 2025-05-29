<script lang="ts">
	import Text from '$lib/components/ui/text/text.svelte';
	import type { Unit } from '$lib/domain/unit/unit';
	import Icon from '../icon/icon.svelte';
	import GameImage from '../image/game-image.svelte';

	let { unit }: { unit: Unit } = $props();
</script>

<div class="unit-card flex flex-col items-center justify-center">
	<div class="flex items-center justify-center">
		<Text type="medium">{unit.name} Lvl {unit.level}</Text>
	</div>
	<GameImage path={unit.bodyImage}></GameImage>
	<div class="flex scale-75 items-center justify-center gap-2">
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
</div>

<style>
	.unit-card {
		border: 2px solid hsl(var(--color4));
		background: hsl(var(--color10));
		border-radius: 1em;
	}
</style>
