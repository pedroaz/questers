<script lang="ts">
	import AttributeBox from '$lib/components/game/attribute-box/attribute-box.svelte';
	import GameImage from '$lib/components/game/image/game-image.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import { SKILLS_DICT } from '$lib/data/skills';
	import { newDay } from '$lib/services/world-service';
	import { getPlayerShip, getPlayerUnit } from '$lib/states/game-state.svelte';
	import EquipmentSlot from './equipment-slot.svelte';
	import SkillSlot from './skill-slot.svelte';
	import StorageSlot from './storage-slot.svelte';

	let data = $derived.by(() => {
		const player = getPlayerUnit();
		const ship = getPlayerShip();
		return { player, ship };
	});
</script>

<div class="flex h-screen items-center justify-center p-4">
	<div class="flex h-full flex-[0.4] flex-col items-center gap-4">
		<Text underline type="medium">Equipments</Text>
		<Text type="medium">Currently Equipped</Text>
		<div class="flex items-center justify-center gap-4">
			<EquipmentSlot text="Weapon" equip={data.player?.weapon}></EquipmentSlot>
			<EquipmentSlot text="Armor" equip={data.player?.armor}></EquipmentSlot>
			<EquipmentSlot text="Trinket" equip={data.player?.trinket}></EquipmentSlot>
		</div>
		<Text type="medium">Storage</Text>
		<div class="flex gap-4">
			{#if data.ship}
				{#each data.ship.storedEquips as equip, index}
					<StorageSlot {index} {equip}></StorageSlot>
				{/each}
			{/if}
		</div>
	</div>
	<div class="flex flex-[0.2] flex-col items-center justify-center gap-4">
		{#if data.player}
			<GameImage id={data.player?.image}></GameImage>
			<div class="flex">
				<AttributeBox attributes={data.player.attributes}></AttributeBox>
			</div>
		{/if}
		<Button variant="outline" onclick={newDay}>Done</Button>
	</div>
	<div class="flex h-full flex-[0.4] flex-col items-center gap-4">
		<Text type="medium">Skills</Text>
		<div class="flex">
			{#if data.player?.skills}
				{#each data.player?.skills as skill}
					<SkillSlot {skill}></SkillSlot>
				{/each}
			{/if}
		</div>
	</div>
</div>
