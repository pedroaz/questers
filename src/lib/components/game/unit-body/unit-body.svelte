<script lang="ts">
	import Text from '$lib/components/ui/text/text.svelte';
	import type { Unit } from '$lib/domain/unit/unit';
	import Icon from '../icon/icon.svelte';
	import GameImage from '../image/game-image.svelte';
	let { unit }: { unit: Unit } = $props();
</script>

<div class="unit-body flex w-full cursor-default flex-col items-center justify-center px-8">
	<Text type="medium">{unit.name}</Text>
	<GameImage width="50px" height="50px" path={unit.bodyImage}></GameImage>
	<div class="flex justify-around gap-4">
		<div class="flex items-center justify-center">
			<Icon icon="power"></Icon>
			<Text>{unit.power}</Text>
		</div>
		<Text>Attack</Text>
	</div>
</div>

<style>
	.unit-body {
		border: 2px solid hsl(var(--color4));
		background: hsl(var(--color10));
		border-radius: 1em;
	}
</style>
