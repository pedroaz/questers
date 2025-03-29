<script lang="ts">
	import Text from '$lib/components/ui/text/text.svelte';
	import type { Unit } from '$lib/schemas/unit';
	import Icon from '../icon/icon.svelte';

	let { unit }: { unit: Unit } = $props();
</script>

<div class="flex items-center justify-center gap-2">
	<div class="flex items-center">
		<Icon icon="warrior"></Icon>
		<Text type="medium">{unit.attributes.strength}</Text>
	</div>
	<div class="flex items-center">
		<Icon icon="explorer"></Icon>
		<Text type="medium">{unit.attributes.leadership}</Text>
	</div>
	<div class="flex items-center">
		<Icon icon="fisherman"></Icon>
		<Text type="medium">{unit.attributes.agility}</Text>
	</div>
	<div class="flex items-center">
		<Icon icon="crafter"></Icon>
		<Text type="medium">{unit.attributes.intellect}</Text>
	</div>
	<div class="flex items-center">
		<Icon icon="sage"></Icon>
		<Text type="medium">{unit.attributes.spirit}</Text>
	</div>
</div>
