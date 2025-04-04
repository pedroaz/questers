<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import {
		getCrew,
		getCurrentPhase,
		getEnemies,
		getEnemyHp,
		getEnemyMaxHp,
		getPhaseIndex,
		getPlayerShip,
		getPlayerUnit,
		getQuestById,
		getQuestToLoad,
		setCrewOrder
	} from '$lib/states/game-state.svelte';
	import Sortable from 'sortablejs';
	import { onDestroy, onMount } from 'svelte';
	import { handleShakeByClassEvent, handleShakeByIdEvent } from '$lib/utils';
	import { changeQuestPhase } from '$lib/services/combat/combat-manager';
	import NextStepDialog from './next-step-dialog.svelte';
	import PlayerWonDialog from './player-won-dialog.svelte';
	import PlayerLostDialog from './player-lost-dialog.svelte';
	import TotalBox from './total-box.svelte';
	import UnitBody from '$lib/components/game/unit-body/unit-body.svelte';
	import UnitSkillDragPanel from './unit-skill-drag-panel.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import Icon from '$lib/components/game/icon/icon.svelte';
	import UnitsOrder from './units-order.svelte';
	import { organizeAllOrder } from '$lib/services/combat/combat-utils';

	// Get State
	const data = $derived.by(() => {
		const quest = getQuestById(getQuestToLoad());
		const crew = getCrew();
		const enemies = getEnemies();
		const ship = getPlayerShip();
		const currentPhase = getCurrentPhase();
		const phaseIndex = getPhaseIndex();
		const enemyHp = getEnemyHp();
		const enemyMaxHp = getEnemyMaxHp();
		const playerUnit = getPlayerUnit();
		return {
			quest,
			crew,
			enemies,
			ship,
			currentPhase,
			phaseIndex,
			enemyHp,
			enemyMaxHp,
			playerUnit
		};
	});

	// Draggable
	let crewPanel: HTMLElement;
	let sortableCrewPanel: Sortable;

	// Life Cycle
	onMount(async function () {
		changeQuestPhase('new-stage-dialog');
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
	async function startCombatUI() {
		await changeQuestPhase('calculating');
	}
</script>

<NextStepDialog></NextStepDialog>
<PlayerWonDialog></PlayerWonDialog>
<PlayerLostDialog></PlayerLostDialog>

<div class="flex h-full flex-col">
	<!-- Top -->
	<div class="w-full flex-[0.1] px-8">
		<TotalBox></TotalBox>
	</div>

	<!-- Middle -->
	<div class="flex flex-[0.5] gap-2 p-4">
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
	<div class="flex flex-[0.4]">
		<!-- Idk Yet -->
		<div class="flex flex-[0.1] items-center justify-center"></div>
		<!-- Skills -->
		<div class="flex flex-[0.8] flex-col items-center gap-1">
			<div class="flex w-[50%] flex-[0.1] items-center justify-center">
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
		<!-- Buttons -->
		<div class="flex flex-[0.1] flex-col items-center justify-center p-4">
			<Button variant="outline" onclick={startCombatUI} size="lg">
				<div class="flex items-center justify-center gap-3">
					<Icon icon="start"></Icon>
					<Text type="small">Start!</Text>
					<Icon icon="start"></Icon>
				</div>
			</Button>
		</div>
	</div>
</div>

<style>
	p {
		color: black;
		opacity: 50%;
	}
</style>
