<script lang="ts">
	import Text from '$lib/components/ui/text/text.svelte';
	import type { Unit } from '$lib/domain/unit/unit';
	import Icon from '../icon/icon.svelte';
	import GameImage from '../image/game-image.svelte';
	import UnitCardEquipSlot from './unit-card-equip-slot.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import UnitCardDetails from './unit-card-details.svelte';

	let { unit }: { unit: Unit } = $props();
	let openDetails = $state(false);

	function showDetailedUnit() {
		openDetails = true;
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onclick={showDetailedUnit} class="parent cursor-pointer">
	<div class="div1 flex items-center justify-center">
		<Text type="medium">{unit.name} - Lvl {unit.level}</Text>
	</div>
	<div class="div2 flex flex-col items-center justify-center gap-2">
		<UnitCardEquipSlot hover={false} slot="weapon" equipId={unit.weapon}></UnitCardEquipSlot>
		<UnitCardEquipSlot hover={false} slot="offhand" equipId={unit.offhand}></UnitCardEquipSlot>
		<UnitCardEquipSlot hover={false} slot="trinket" equipId={unit.trinket}></UnitCardEquipSlot>
	</div>
	<div class="div3 flex items-center justify-center">
		<GameImage path={unit.bodyImage}></GameImage>
	</div>
	<div class="div4 flex flex-col items-center justify-center gap-2">
		<UnitCardEquipSlot hover={false} slot="helmet" equipId={unit.helmet}></UnitCardEquipSlot>
		<UnitCardEquipSlot hover={false} slot="armor" equipId={unit.armor}></UnitCardEquipSlot>
		<UnitCardEquipSlot hover={false} slot="boots" equipId={unit.boots}></UnitCardEquipSlot>
	</div>
	<div class="div5">
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
</div>

<Dialog.Root open={openDetails} onOpenChange={(open) => (openDetails = open)}>
	<Dialog.Content class="h-[80%] w-[80%] max-w-none">
		<Dialog.Description>
			<UnitCardDetails {unit}></UnitCardDetails>
		</Dialog.Description>
	</Dialog.Content>
</Dialog.Root>

<style>
	.parent {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(5, 1fr);
		grid-column-gap: 0px;
		grid-row-gap: 0px;
		border: 2px solid hsl(var(--color4));
		background: hsl(var(--color10));
		border-radius: 1em;
	}

	.div1 {
		grid-area: 1 / 1 / 2 / 6;
	}
	.div2 {
		grid-area: 2 / 1 / 5 / 2;
	}
	.div3 {
		grid-area: 2 / 2 / 5 / 5;
	}
	.div4 {
		grid-area: 2 / 5 / 5 / 6;
	}
	.div5 {
		grid-area: 5 / 1 / 6 / 6;
	}
</style>
