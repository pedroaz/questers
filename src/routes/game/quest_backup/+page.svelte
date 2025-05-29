<script lang="ts">
	import Button, { buttonVariants } from '$lib/components/ui/button/button.svelte';
	import {
		getCrew,
		getEnemies,
		getEnemyHp,
		getEnemyMaxHp,
		getPlayerParty,
		getPlayerUnit,
		getQuestById,
		getQuestToLoad,
		setCrewOrder,
		getStage
	} from '$lib/states/game-state.svelte';
	import Sortable from 'sortablejs';
	import { onDestroy, onMount } from 'svelte';
	import { handleShakeByClassEvent, handleShakeByIdEvent } from '$lib/utils';
	import { changeQuestStage } from '$lib/domain/combat/combat-manager';
	import UnitBody from '$lib/components/game/unit-body/unit-body.svelte';
	import UnitSkillDragPanel from './unit-skill-drag-panel.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import Icon from '$lib/components/game/icon/icon.svelte';
	import UnitsOrder from './units-order.svelte';
	import { organizeAllOrder } from '$lib/domain/combat/combat-utils';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import LogsTable from './logs-table.svelte';
	import type { QuestStage } from '$lib/data/quests';
	import NextRoundDisplay from './new-round-display.svelte';
	import CombatSummaryDisplay from './combat-summary-display.svelte';
	import QuestFinishedDisplay from './quest-finished-display.svelte';
	import QuestInfo from './quest-info.svelte';
	import CrewDisplay from './crew-display.svelte';
	import EnemiesDisplay from './enemies-display.svelte';

	// Get State
	const data = $derived.by(() => {
		const quest = getQuestById(getQuestToLoad());
		const crew = getCrew();
		const enemies = getEnemies();
		const enemyHp = getEnemyHp();
		const enemyMaxHp = getEnemyMaxHp();
		const playerUnit = getPlayerUnit();
		const stage = getStage();
		const displayCombatHeader = stage === 'calculating' ? 'display: none;' : '';
		const displayActionText = stage === 'calculating' ? '' : 'display: none;';
		const displayOrder = stage === 'waiting-for-input' ? '' : 'display: none;';
		const displayNextRound = stage !== 'new-round' ? 'display: none;' : '';
		const displayPlayerWon = stage !== 'player-won' ? 'display: none;' : '';
		const displayPlayerLost = stage !== 'player-lost' ? 'display: none;' : '';
		const displayCombatSummary = stage === 'calculating' ? '' : 'display: none;';
		return {
			quest,
			crew,
			enemies,
			enemyHp,
			enemyMaxHp,
			playerUnit,
			stage,
			displayCombatHeader,
			displayActionText,
			displayOrder,
			displayNextRound,
			displayPlayerWon,
			displayPlayerLost,
			displayCombatSummary
		};
	});

	// Draggable
	let crewPanel: HTMLElement;
	let sortableCrewPanel: Sortable;

	// Life Cycle
	onMount(async function () {
		await changeQuestStage('new-round');
		sortableCrewPanel = Sortable.create(crewPanel, {
			group: {
				name: 'crewPanel',
				put: true
			},
			animation: 200,
			onChange: (event: Sortable.SortableEvent) => {
				// Organize Order
				setCrewOrder(sortableCrewPanel.toArray());
				organizeAllOrder();
			}
		});

		// Add a initial order
		setCrewOrder(sortableCrewPanel.toArray());
		organizeAllOrder();

		window.addEventListener('shake-by-id', (event: Event) =>
			handleShakeByIdEvent(event as CustomEvent)
		);

		window.addEventListener('shake-by-class', (event: Event) =>
			handleShakeByClassEvent(event as CustomEvent)
		);
	});

	onDestroy(() => {
		window.removeEventListener('shake-by-id', (event: Event) =>
			handleShakeByIdEvent(event as CustomEvent)
		);

		window.removeEventListener('shake-by-class', (event: Event) =>
			handleShakeByClassEvent(event as CustomEvent)
		);
	});

	// Buttons
	async function startCombatButtonHandler() {
		await changeQuestStage('calculating');
	}
</script>

<div class="flex h-full flex-col">
	<!-- Top -->
	<div class="flex flex-[0.6] gap-2 p-4">
		<!-- Crew -->
		<div class="grid w-full flex-[0.5] grid-cols-2 grid-rows-3 gap-4">
			{#each data.crew as unit, i}
				<div
					id={unit.uuid}
					class="flex flex-shrink-0 items-center justify-center"
					style="grid-column: {i % 2 === 0 ? 2 : 1}; grid-row: {Math.floor(i / 2) + 1};"
				>
					<UnitBody {unit} />
				</div>
			{/each}
		</div>

		<!-- Enemies -->
		<div class="grid w-full flex-[0.5] grid-cols-2 grid-rows-3 gap-4">
			{#each data.enemies as unit, i}
				<div
					id={unit.uuid}
					class="flex flex-shrink-0 items-center justify-center"
					style="grid-column: {Math.floor(i / 3) + 1}; grid-row: {(i % 3) + 1};"
				>
					<UnitBody {unit} />
				</div>
			{/each}
		</div>
	</div>

	<!-- Bottom -->
	<div class="flex flex-[0.4] justify-around">
		<!-- Log-->
		<div class="flex items-center justify-center">
			<QuestInfo></QuestInfo>
		</div>
		<div class="flex items-center justify-center"><CrewDisplay></CrewDisplay></div>
		<!-- Skills -->
		<div class="flex items-center justify-center">
			<div style={data.displayOrder} class="flex flex-col items-center justify-center gap-1">
				<div class="flex w-[50%] items-center justify-center">
					<UnitsOrder></UnitsOrder>
				</div>
				<div
					bind:this={crewPanel}
					style="background-color: hsl(var(--color3));"
					class="flex flex-[0.8] justify-center gap-5 rounded-lg p-4"
				>
					{#each data.crew as unit}
						<UnitSkillDragPanel unitId={unit.uuid} id={`skill-panel-${unit.uuid}`}
						></UnitSkillDragPanel>
					{/each}
				</div>
			</div>
			<div style={data.displayNextRound} class="flex items-center justify-center">
				<NextRoundDisplay></NextRoundDisplay>
			</div>
			<div style={data.displayCombatSummary} class="flex items-center justify-center">
				<CombatSummaryDisplay></CombatSummaryDisplay>
			</div>
		</div>
		<div class="flex flex-[0.1] items-center justify-center">
			<EnemiesDisplay></EnemiesDisplay>
		</div>
		<!-- Buttons -->
		<div class="flex flex-col items-center justify-center p-4">
			{#if data.stage === 'player-won' || data.stage === 'player-lost'}
				<QuestFinishedDisplay></QuestFinishedDisplay>
			{:else}
				<Button variant="outline" onclick={startCombatButtonHandler} size="lg">
					<div class="flex items-center justify-center gap-3">
						<Icon icon="start"></Icon>
						<Text type="small">Start!</Text>
						<Icon icon="start"></Icon>
					</div>
				</Button>
			{/if}
		</div>
	</div>
</div>
