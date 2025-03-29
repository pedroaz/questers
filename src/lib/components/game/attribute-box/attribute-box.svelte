<script lang="ts">
	import Text from '$lib/components/ui/text/text.svelte';
	import type { UnitAttributes } from '$lib/schemas/unit';
	import Icon from '../icon/icon.svelte';

	let { attributes }: { attributes: UnitAttributes } = $props();
</script>

<div class="flex items-center justify-center gap-2">
	<div class="flex items-center">
		<Icon icon="warrior"></Icon>
		<Text type="medium">{attributes.strength}</Text>
	</div>
	<div class="flex items-center">
		<Icon icon="explorer"></Icon>
		<Text type="medium">{attributes.leadership}</Text>
	</div>
	<div class="flex items-center">
		<Icon icon="fisherman"></Icon>
		<Text type="medium">{attributes.agility}</Text>
	</div>
	<div class="flex items-center">
		<Icon icon="crafter"></Icon>
		<Text type="medium">{attributes.intellect}</Text>
	</div>
	<div class="flex items-center">
		<Icon icon="sage"></Icon>
		<Text type="medium">{attributes.spirit}</Text>
	</div>
</div>
