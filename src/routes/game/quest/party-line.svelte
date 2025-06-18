<script lang="ts">
	import Sortable from 'sortablejs';
	import { onMount } from 'svelte';

	import UnitBody from '$lib/components/game/unit-body/unit-body.svelte';
	import { getCombatState, setCombatState } from '$lib/states/combat-state.svelte';
	import {
		getCurrentQuest,
		getPlayerPartyIds,
		getPlayerParty
	} from '$lib/states/player-state.svelte';
	import { getUnitById } from '$lib/states/units-state.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import Icon from '$lib/components/game/icon/icon.svelte';

	let crewPanel: HTMLElement;
	let sortableCrewPanel: Sortable;

	let data = $derived.by(() => {
		const quest = getCurrentQuest();
		const party = getPlayerParty();
		const combatState = getCombatState();

		let partyIds = getPlayerPartyIds();

		return {
			quest,
			party,
			partyIds,
			combatState
		};
	});

	onMount(async function () {
		sortableCrewPanel = Sortable.create(crewPanel, {
			group: {
				name: 'crewPanel',
				put: true
			},
			animation: 200,
			onChange: (event: Sortable.SortableEvent) => {
				updatePartyOrder();
			}
		});
		updatePartyOrder();
	});

	function updatePartyOrder() {
		const combatState = getCombatState();
		combatState.partyOrder = sortableCrewPanel.toArray();
		setCombatState(combatState);
	}
</script>

<div class="flex w-full items-center justify-center">
	<div class="flex-[0.15] px-4">
		<div class="gbox flex-col items-center justify-center gap-4">
			<div class="flex items-center justify-center">
				<Text type="medium">Party</Text>
			</div>

			<div class="flex items-center justify-center gap-4">
				<div id="party-hp" class="flex items-center justify-center">
					<Icon icon="heart" />
					<Text>{data.party.hp}/{data.party.maxHp}</Text>
				</div>
				<div class="flex items-center justify-center">
					<Icon icon="attack" />
					<Text>{data.combatState.partyAttack}</Text>
				</div>
				<div class=" flex items-center justify-center">
					<Icon icon="defense" />
					<Text>{data.combatState.partyDefense}</Text>
				</div>
			</div>
			<div class="flex flex-wrap items-center justify-center gap-2 py-4">
				<div class="gbox h-4 w-4"></div>
				<div class="gbox h-4 w-4"></div>
				<div class="gbox h-4 w-4"></div>
				<div class="gbox h-4 w-4"></div>
				<div class="gbox h-4 w-4"></div>
				<div class="gbox h-4 w-4"></div>
				<div class="flex flex-wrap items-center justify-center gap-2">
					<div class="gbox h-4 w-4"></div>
					<div class="gbox h-4 w-4"></div>
					<div class="gbox h-4 w-4"></div>
					<div class="gbox h-4 w-4"></div>
					<div class="gbox h-4 w-4"></div>
					<div class="gbox h-4 w-4"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="flex flex-[0.85] flex-col items-center justify-center gap-1">
		<div class="flex items-center justify-center gap-1">
			<div class="gbox h-10 w-10"></div>
			<div class="gbox h-10 w-10"></div>
			<div class="gbox h-10 w-10"></div>
			<div class="gbox h-10 w-10"></div>
			<div class="gbox h-10 w-10"></div>
			<div class="gbox h-10 w-10"></div>
		</div>
		<div bind:this={crewPanel} class="flex justify-center gap-2">
			{#each data.partyIds as id, i}
				<div data-id={id} {id} class="flex items-center justify-center">
					<UnitBody unit={getUnitById(id)}></UnitBody>
				</div>
			{/each}
		</div>
	</div>
</div>
