<script lang="ts">
	import GameImage from '$lib/components/game/image/game-image.svelte';
	import { EQUIP_DICT, type Equipment } from '$lib/data/equipments';
	import { recalculateUnit } from '$lib/schemas/unit-calculationts';
	import { log, logLoadout } from '$lib/services/infra/logger';
	import { getPlayerShip, getPlayerUnit, refreshWorldShips } from '$lib/states/game-state.svelte';

	let { equip: equipId, index }: { equip: Equipment | undefined; index: number } = $props();
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
		logLoadout(`Trying to equip ${equipId}`);

		if (!equipId || !equipData || !data.player || !data.ship) {
			logLoadout(`Error equipping ${equipId}`);
			return;
		}

		let previousEquip = undefined;

		logLoadout(`Case: ${equipData.type}`);
		switch (equipData.type) {
			case 'weapon':
				previousEquip = data.player.weapon;
				data.player.weapon = equipId;
				break;
			case 'armor':
				previousEquip = data.player.weapon;
				data.player.armor = equipId;
				break;
			default:
				break;
		}

		logLoadout(`Previous ${previousEquip}`);

		// remove equip from storage
		logLoadout(`Removing equip ${equipId} from storage with index ${index}`);
		data.ship.storedEquips.splice(index, 1);

		// Add previous
		if (previousEquip) {
			logLoadout(`Adding equip ${previousEquip} to storage`);
			data.ship.storedEquips.push(previousEquip);
		}

		recalculateUnit(data.player);
		refreshWorldShips();
		refreshWorldShips();
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
{#if equipData}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div onclick={handleClick} class="box h-16 w-16 cursor-pointer">
		<GameImage id={equipData.image}></GameImage>
	</div>
{/if}
