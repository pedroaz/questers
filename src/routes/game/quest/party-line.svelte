<script lang="ts">
	import Sortable from 'sortablejs';
	import { onMount } from 'svelte';

	import UnitBody from '$lib/components/game/unit-body/unit-body.svelte';
	import { getCombatState, setCombatState } from '$lib/states/combat-state.svelte';
	import {
		getNavigationData,
		getCurrentQuest,
		getPlayerPartyIds,
		getPlayerParty
	} from '$lib/states/player-state.svelte';
	import { getUnitById } from '$lib/states/units-state.svelte';

	let crewPanel: HTMLElement;
	let sortableCrewPanel: Sortable;

	let data = $derived.by(() => {
		const quest = getCurrentQuest();
		const party = getPlayerParty();

		let partyIds = getPlayerPartyIds();

		return {
			quest,
			party,
			partyIds
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

<div bind:this={crewPanel} class="flex gap-2">
	{#each data.partyIds as id, i}
		<div data-id={id} {id} class="flex items-center justify-center">
			<UnitBody unit={getUnitById(id)}></UnitBody>
		</div>
	{/each}
</div>
