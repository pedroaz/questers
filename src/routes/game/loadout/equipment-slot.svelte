<script lang="ts">
	import GameImage from '$lib/components/game/image/game-image.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import { EQUIP_DICT, type Equipment } from '$lib/data/equipments';
	import { resetUnit } from '$lib/schemas/unit-calculationts';
	import { getPlayerShip, getPlayerUnit, refreshWorldShips } from '$lib/states/game-state.svelte';
	import * as HoverCard from '$lib/components/ui/hover-card/index.js';
	import AttributeBox from '$lib/components/game/attribute-box/attribute-box.svelte';

	let { equip: equipId, text }: { equip: Equipment | undefined; text: string } = $props();
	const equipData = $derived.by(() => {
		if (!equipId) return;
		return EQUIP_DICT[equipId];
	});

	const data = $derived.by(() => {
		const player = getPlayerUnit();
		const ship = getPlayerShip();
		return { player, ship };
	});

	function handleClick() {
		if (!equipId || !equipData || !data.player || !data.ship) {
			console.log('Error equipping');
			return;
		}

		let previousEquip = undefined;

		switch (equipData.type) {
			case 'weapon':
				previousEquip = data.player.weapon;
				data.player.weapon = undefined;
				break;
			case 'armor':
				previousEquip = data.player.weapon;
				data.player.armor = undefined;
				break;
			default:
				break;
		}

		// Add previous
		if (previousEquip) {
			data.ship.storedEquips.push(previousEquip);
		}
		resetUnit(data.player);
		refreshWorldShips();
		refreshWorldShips();
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	onclick={handleClick}
	class="box flex h-16 w-16 cursor-pointer flex-col items-center justify-center"
>
	<HoverCard.Root>
		<HoverCard.Trigger>
			{#if equipData}
				<GameImage id={equipData.image}></GameImage>
			{/if}
			{#if !equipData}
				<Text type="small">{text}</Text>
			{/if}
		</HoverCard.Trigger>
		{#if equipData?.bonusAttributes}
			<HoverCard.Content>
				<Text>{equipData.name}</Text>
				<AttributeBox attributes={equipData?.bonusAttributes}></AttributeBox>
			</HoverCard.Content>
		{/if}
	</HoverCard.Root>
</div>
