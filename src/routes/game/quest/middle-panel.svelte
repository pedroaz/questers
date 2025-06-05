<script lang="ts">
	import Icon from '$lib/components/game/icon/icon.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import { getCombatState } from '$lib/states/combat-state.svelte';
	import { getPlayerParty } from '$lib/states/player-state.svelte';

	const data = $derived.by(() => {
		const combatState = getCombatState();
		const party = getPlayerParty();
		return {
			combatState,
			party
		};
	});
</script>

<div class="flex flex-col items-center justify-center gap-4">
	<div class="flex items-center justify-center gap-4">
		<!-- <Text>Buffs</Text> -->
		<div class="box2 flex items-center justify-center">
			<Icon icon="heart" />
			<Text>{data.combatState.enemiesHp}/{data.combatState.enemiesMaxHp}</Text>
		</div>
		<div class="box2 flex items-center justify-center">
			<Icon icon="attack" />
			<Text>{data.combatState.enemiesPower}</Text>
		</div>
		<div class="box2 flex items-center justify-center">
			<Icon icon="defense" />
			<Text>{data.combatState.enemiesDefense}</Text>
		</div>
		<!-- <Text>Debuffs</Text> -->
	</div>
	<div class="flex items-center justify-center gap-4">
		<!-- <Text>Buffs</Text> -->
		<div class="box2 flex items-center justify-center">
			<Icon icon="heart" />
			<Text>{data.party.hp}/{data.party.maxHp}</Text>
		</div>
		<div class="box2 flex items-center justify-center">
			<Icon icon="attack" />
			<Text>{data.combatState.partyPower}</Text>
		</div>
		<div class="box2 flex items-center justify-center">
			<Icon icon="defense" />
			<Text>{data.combatState.partyDefense}</Text>
		</div>
		<!-- <Text>Debuffs</Text> -->
	</div>
</div>

<!-- <div class="relative inline-block h-16 w-16">
			<Icon classes={'w-16 h-16'} icon="defense" />
			<div class="absolute inset-0 flex items-center justify-center">
				<Text>100</Text>
			</div>
		</div> -->

<style>
	.box2 {
		border: 2px solid hsl(var(--color4));
		background: hsl(var(--color10));
		border-radius: 1em;
		padding: 4px;
	}
</style>
