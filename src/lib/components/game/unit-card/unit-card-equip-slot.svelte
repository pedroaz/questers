<script lang="ts">
	import GameImage from '../image/game-image.svelte';

	import * as HoverCard from '$lib/components/ui/hover-card/index.js';
	import Text from '$lib/components/ui/text/text.svelte';
	import {
		EquipmentType,
		type EquipmentData,
		type EquipmentId
	} from '$lib/data/equipment/equipment-models';
	import { EQUIP_DICT } from '$lib/data/equipment/equipment-storage';

	let { equipId, slot, hover }: { equipId: EquipmentId | null; slot: string; hover: boolean } =
		$props();
	let equipData = $state<EquipmentData>({
		name: 'No Equipment in this slot',
		type: EquipmentType.Armor,
		image: 'empty-slot.png'
	});
	if (equipId) {
		equipData = EQUIP_DICT[equipId];
	}
</script>

{#if hover}
	<HoverCard.Root>
		<HoverCard.Trigger>
			<div class="equip-slot">
				{#if equipId}
					<GameImage path={equipData.image} />
				{/if}
				{#if !equipId}
					{#if slot == 'weapon'}
						<GameImage path="equips/no-weapon.png" />
					{:else if slot == 'offhand'}
						<GameImage path="equips/no-weapon.png" />
					{:else if slot == 'trinket'}
						<GameImage path="equips/no-trinket.png" />
					{:else if slot == 'helmet'}
						<GameImage path="equips/no-helmet.png" />
					{:else if slot == 'armor'}
						<GameImage path="equips/no-armor.png" />
					{:else if slot == 'boots'}
						<GameImage path="equips/no-boots.png" />
					{/if}
				{/if}
			</div>
		</HoverCard.Trigger>
		<HoverCard.Content>
			<div class="flex items-center justify-center">
				<Text>{equipData?.name}</Text>
			</div>
		</HoverCard.Content>
	</HoverCard.Root>
{:else}
	<div class="equip-slot">
		{#if equipId}
			<GameImage path={equipData.image} />
		{/if}
		{#if !equipId}
			{#if slot == 'weapon'}
				<GameImage path="equips/no-weapon.png" />
			{:else if slot == 'offhand'}
				<GameImage path="equips/no-weapon.png" />
			{:else if slot == 'trinket'}
				<GameImage path="equips/no-trinket.png" />
			{:else if slot == 'helmet'}
				<GameImage path="equips/no-helmet.png" />
			{:else if slot == 'armor'}
				<GameImage path="equips/no-armor.png" />
			{:else if slot == 'boots'}
				<GameImage path="equips/no-boots.png" />
			{/if}
		{/if}
	</div>
{/if}

<style>
	.equip-slot {
		min-width: 30px;
		min-height: 30px;
		max-width: 75px;
		max-height: 75px;
	}
</style>
