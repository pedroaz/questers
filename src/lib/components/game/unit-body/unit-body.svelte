<script lang="ts">
	import Text from '$lib/components/ui/text/text.svelte';
	import { UnitType, type Unit } from '$lib/domain/unit/unit';
	import Icon from '../icon/icon.svelte';
	import GameImage from '../image/game-image.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import UnitBodyDetails from './unit-body-details.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import UnitBodySkillSelection from './unit-body-skill-selection.svelte';
	let { unit }: { unit: Unit } = $props();
	let openDetails = $state(false);

	function showDetailedUnit() {
		openDetails = true;
	}
</script>

<div class="unit-body flex w-full cursor-default flex-col items-center justify-center px-8">
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div onclick={showDetailedUnit} class="flex cursor-pointer items-center justify-center">
		<Text underline type="medium">{unit.name}</Text>
	</div>

	<GameImage width="50px" height="50px" path={unit.bodyImage}></GameImage>
	<div class="flex justify-around gap-4">
		<div class="my-1 flex flex-col items-center justify-center">
			<div class="flex items-center justify-center">
				<Icon icon="power"></Icon>
				<Text>{unit.power}</Text>
			</div>
			{#if unit.type === UnitType.Boss || unit.type === UnitType.Monster}
				{#if unit.action}
					<Text>{unit.action}</Text>
				{:else}
					<Text>No Action</Text>
				{/if}
			{:else}
				<UnitBodySkillSelection {unit}></UnitBodySkillSelection>
			{/if}
		</div>
	</div>
</div>

<Dialog.Root open={openDetails} onOpenChange={(open) => (openDetails = open)}>
	<Dialog.Content class="h-[40%] w-[40%] max-w-none">
		<Dialog.Description>
			<UnitBodyDetails {unit}></UnitBodyDetails>
		</Dialog.Description>
	</Dialog.Content>
</Dialog.Root>

<style>
	.unit-body {
		border: 2px solid hsl(var(--color4));
		background: hsl(var(--color10));
		border-radius: 1em;
	}
</style>
