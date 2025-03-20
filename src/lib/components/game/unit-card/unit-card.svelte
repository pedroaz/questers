<script lang="ts">
	import DropdownMenuLabel from '$lib/components/ui/dropdown-menu/dropdown-menu-label.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import type { Unit } from '$lib/schemas/unit';
	import Icon from '../icon/icon.svelte';

	let { unit }: { unit: Unit } = $props();
</script>

<div class="unit-card flex flex-col items-center justify-center">
	<div class="flex items-center justify-center">
		<Text type="small">{unit.name} Lvl {unit.level}</Text>
	</div>
	<div class="flex scale-75 items-center justify-center gap-2">
		<div class="flex flex-col items-center">
			<Icon icon="warrior"></Icon><Text>{unit.baseAttributes.strength}</Text>
		</div>
		<div class="flex flex-col items-center">
			<Icon icon="explorer"></Icon><Text>{unit.baseAttributes.leadership}</Text>
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
		color: black;
		background: hsl(var(--foreground));
	}
</style>
