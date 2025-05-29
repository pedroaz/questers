<script lang="ts">
	import GameImage from '$lib/components/game/image/game-image.svelte';
	import { EQUIP_DICT, type Equipment } from '$lib/data/equipments';
	import { resetUnit } from '$lib/schemas/unit-calculationts';
	import { logLoadout } from '$lib/domain/infra/logger';
	import {
		getPlayerParty,
		getPlayerUnit,
		refreshWorldParties
	} from '$lib/states/game-state.svelte';
	import * as HoverCard from '$lib/components/ui/hover-card/index.js';
	import Text from '$lib/components/ui/text/text.svelte';
	import AttributeBox from '$lib/components/game/attribute-box/attribute-box.svelte';

	let { equip: equipId, index }: { equip: Equipment | undefined; index: number } = $props();
	const equipData = $derived.by(() => {
		if (!equipId) return;
		return EQUIP_DICT[equipId];
	});

	const data = $derived.by(() => {
		const player = getPlayerUnit();
		const party = getPlayerParty();
		return { player, party };
	});

	function handleClick() {
		logLoadout(`Trying to equip ${equipId}`);

		if (!equipId || !equipData || !data.player || !data.party) {
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
		data.party.storedEquips.splice(index, 1);

		// Add previous
		if (previousEquip) {
			logLoadout(`Adding equip ${previousEquip} to storage`);
			data.party.storedEquips.push(previousEquip);
		}

		resetUnit(data.player);
		refreshWorldParties();
		refreshWorldParties();
	}
</script>

<HoverCard.Root>
	<HoverCard.Trigger>
		{#if equipData}
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<div onclick={handleClick} class="box h-16 w-16 cursor-pointer">
				<GameImage id={equipData.image}></GameImage>
			</div>
		{/if}
	</HoverCard.Trigger>
	<HoverCard.Content>
		{#if equipData?.bonusAttributes}
			<Text>{equipData.name}</Text>
			<AttributeBox attributes={equipData?.bonusAttributes}></AttributeBox>
		{/if}
	</HoverCard.Content>
</HoverCard.Root>
<!-- svelte-ignore a11y_click_events_have_key_events -->
