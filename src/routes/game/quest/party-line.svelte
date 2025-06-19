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
	import ArtifactInfo from './artifact-info.svelte';
	import BuffInfo from './buff-info.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import DebugQuestBtn from './debug-quest-btn.svelte';
	import RerollBtn from './reroll-btn.svelte';
	import PlayPanel from './play-panel.svelte';

	let crewPanel: HTMLElement;
	let sortableCrewPanel: Sortable;
	let artifactsPanel: HTMLElement;
	let sortableArtifactsPanel: Sortable;

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

		sortableArtifactsPanel = Sortable.create(artifactsPanel, {
			group: {
				name: 'artifactsPanel',
				put: true
			},
			animation: 200,
			onChange: (event: Sortable.SortableEvent) => {
				updateArtifactsOrder();
			}
		});
		updateArtifactsOrder();
	});

	function updatePartyOrder() {
		const combatState = getCombatState();
		combatState.partyOrder = sortableCrewPanel.toArray();
		setCombatState(combatState);
	}

	function updateArtifactsOrder() {
		const combatState = getCombatState();
		combatState.partyOrder = sortableArtifactsPanel.toArray();
		setCombatState(combatState);
	}
</script>

<div class="flex w-full items-center justify-center">
	<div class="flex-[0.1] px-4">
		<div class="gbox flex-col items-center justify-center gap-4">
			<!-- <div class="flex items-center justify-center">
				<Text type="medium">Party</Text>
			</div> -->

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
			<Separator></Separator>
			<div class="flex flex-wrap items-center justify-center gap-2 py-4">
				{#each data.combatState.partyBuffs as buff}
					<BuffInfo buffInstance={buff}></BuffInfo>
				{/each}
			</div>
		</div>
	</div>
	<div class="flex flex-[0.85] flex-col items-center justify-center gap-1">
		<div
			id="party-artifacts-panel"
			bind:this={artifactsPanel}
			class="flex items-center justify-center gap-1"
		>
			{#each data.party.artifacts as artifact}
				<ArtifactInfo artifactId={artifact}></ArtifactInfo>
			{/each}
		</div>
		<div id="party-crew-panel" bind:this={crewPanel} class="flex justify-center gap-2">
			{#each data.partyIds as id, i}
				<div data-id={id} {id} class="flex items-center justify-center">
					<UnitBody unit={getUnitById(id)}></UnitBody>
				</div>
			{/each}
		</div>
	</div>
	<div class="flex-[0.1] px-4">
		<div class="gbox flex flex-col items-center justify-center gap-4">
			<DebugQuestBtn></DebugQuestBtn>
			<RerollBtn></RerollBtn>
			<PlayPanel></PlayPanel>
		</div>
	</div>
</div>
