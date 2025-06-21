<script lang="ts">
	import { onMount } from 'svelte';

	import UnitBodyDetails from './unit-body-details.svelte';
	import Icon from '../icon/icon.svelte';
	import GameImage from '../image/game-image.svelte';

	import { handleShakeByIdEvent, SHAKE_BY_ID_EVENT } from '$lib/animations';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Text from '$lib/components/ui/text/text.svelte';
	import { UnitType, type Unit } from '$lib/domain/unit/unit';
	import * as Popover from '$lib/components/ui/popover/index.js';

	let { unit }: { unit: Unit } = $props();
	let openDetails = $state(false);

	function showDetailedUnit() {
		openDetails = true;
	}
</script>

<div id={unit.uuid} class="unit-body flex cursor-default flex-col items-center justify-center px-8">
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div onclick={showDetailedUnit} class="flex cursor-pointer items-center justify-center">
		<Text underline type="medium">{unit.name}</Text>
	</div>

	<GameImage width="auto" height="15vh" path={unit.bodyImage}></GameImage>
	<div class="flex justify-around gap-4">
		<div class="my-1 flex flex-col items-center justify-center">
			<div class="flex items-center justify-center">
				<Icon icon="power"></Icon>
				<Text>{unit.power}</Text>
			</div>
			{#if unit.action}
				<Popover.Root>
					<Popover.Trigger>
						<Text underline>{unit.action.data.name}</Text>
					</Popover.Trigger>
					<Popover.Content>
						<div class="flex items-center justify-center">
							<Text underline>{unit.action.data.description}</Text>
						</div>
					</Popover.Content>
				</Popover.Root>
			{:else}
				<Text>No Action</Text>
			{/if}
		</div>
	</div>
</div>

<Dialog.Root open={openDetails} onOpenChange={(open) => (openDetails = open)}>
	<Dialog.Content class="h-[60%] w-[60%] max-w-none">
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
