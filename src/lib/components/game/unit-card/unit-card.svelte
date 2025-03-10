<script lang="ts">
	import Text from '$lib/components/ui/text/text.svelte';
	import type { Unit } from '$lib/schemas/unit';

	let { unit }: { unit: Unit } = $props();
</script>

<div class="flex flex-col gap-4 border-2 border-red-100 bg-slate-500">
	<Text type="medium">[{unit.level}] {unit.name}</Text>
	<Text type="medium">Class: {unit.class}</Text>
	<div class="flex flex-col">
		<Text>Str: {unit.baseAttributes.strength}</Text>
		<Text>Sta: {unit.baseAttributes.stamina}</Text>
		<Text>Agi: {unit.baseAttributes.agility}</Text>
		<Text>Int: {unit.baseAttributes.intellect}</Text>
		<Text>Spi: {unit.baseAttributes.spirit}</Text>
	</div>
</div>
