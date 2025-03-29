<script lang="ts">
	import GameImage from '$lib/components/game/image/game-image.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import { EQUIP_DICT, type Equipment } from '$lib/data/equipments';
	import { recalculateUnit } from '$lib/schemas/unit-calculationts';
	import { logLoadout } from '$lib/services/infra/logger';
	import { getPlayerShip, getPlayerUnit, refreshWorldShips } from '$lib/states/game-state.svelte';

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
		recalculateUnit(data.player);
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
	{#if equipData}
		<GameImage id={equipData.image}></GameImage>
	{/if}
	{#if !equipData}
		<Text type="small">{text}</Text>
	{/if}
</div>
