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

<div class="flex h-full flex-col items-center justify-around gap-4">
	<div class="gbox flex w-full flex-col items-center justify-center gap-4">
		<Text type="medium">Enemies</Text>
		<div id="enemy-hp" class="box2 flex items-center justify-center">
			<Icon icon="heart" />
			<Text>{data.combatState.enemiesHp}/{data.combatState.enemiesMaxHp}</Text>
		</div>
		<div class="box2 flex items-center justify-center">
			<Icon icon="attack" />
			<Text>{data.combatState.enemiesAttack}</Text>
		</div>
		<div class="box2 flex items-center justify-center">
			<Icon icon="defense" />
			<Text>{data.combatState.enemiesDefense}</Text>
		</div>
	</div>
	<div class="gbox flex w-full flex-col items-center justify-center gap-4">
		<Text type="medium">Party</Text>
		<div id="party-hp" class="box2 flex items-center justify-center">
			<Icon icon="heart" />
			<Text>{data.party.hp}/{data.party.maxHp}</Text>
		</div>
		<div class="box2 flex items-center justify-center">
			<Icon icon="attack" />
			<Text>{data.combatState.partyAttack}</Text>
		</div>
		<div class="box2 flex items-center justify-center">
			<Icon icon="defense" />
			<Text>{data.combatState.partyDefense}</Text>
		</div>
	</div>
</div>
