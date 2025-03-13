<script lang="ts">
	import DropdownMenuLabel from '$lib/components/ui/dropdown-menu/dropdown-menu-label.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import type { Unit } from '$lib/schemas/unit';
	import Icon from '../icon/icon.svelte';

	let { unit }: { unit: Unit } = $props();
</script>

<div class="unit-card flex flex-col">
	<div class="flex flex-[0.1] justify-between">
		<!-- <Text type="medium">[{unit.level}]</Text> -->
		<Text type="medium">{unit.name} Lvl {unit.level}</Text>
		<Text type="medium">({unit.class})</Text>
	</div>
	<div class="flex flex-[0.9] items-center justify-center gap-2 p-4">
		<div class="flex flex-col items-center">
			<Icon icon="warrior"></Icon><Text>{unit.baseAttributes.strength}</Text>
		</div>
		<div class="flex flex-col items-center">
			<Icon icon="explorer"></Icon><Text>{unit.baseAttributes.vitality}</Text>
		</div>
		<div class="flex flex-col items-center">
			<Icon icon="fisherman"></Icon><Text>{unit.baseAttributes.agility}</Text>
		</div>
		<div class="flex flex-col items-center">
			<Icon icon="crafter"></Icon><Text>{unit.baseAttributes.intellect}</Text>
		</div>
		<div class="flex flex-col items-center">
			<Icon icon="sage"></Icon><Text>{unit.baseAttributes.spirit}</Text>
		</div>
	</div>
</div>

<style>
	.unit-card {
		background: rgba(255, 206, 138, 0.8);
	}
</style>
