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
		setBackground,
		setCrewOrder
	} from '$lib/states/game-state.svelte';
	import Sortable from 'sortablejs';
	import { onDestroy, onMount } from 'svelte';
	import { handleShakeByClassEvent, handleShakeByIdEvent } from '$lib/utils';
	import { startCombat } from '$lib/services/combat/start-combat';
	import NextStepDialog from './next-step-dialog.svelte';
	import PlayerWonDialog from './player-won-dialog.svelte';
	import PlayerLostDialog from './player-lost-dialog.svelte';
	import QuestInfo from './quest-info.svelte';
	import TotalBox from './total-box.svelte';
	import UnitBody from '$lib/components/game/unit-body/unit-body.svelte';
	import UnitSkillDragPanel from './unit-skill-drag-panel.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import SkillInstanceCard from '$lib/components/game/skill-instance-card/skill-instance-card.svelte';

	// Set Background
	setBackground('chevrons');

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
		sortableCrewPanel = Sortable.create(crewPanel, {
			group: {
				name: 'crewPanel',
				put: true
			},
			animation: 200
		});
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
		setCrewOrder(sortableCrewPanel.toArray());
		await startCombat();
	}
</script>

<NextStepDialog></NextStepDialog>
<PlayerWonDialog></PlayerWonDialog>
<PlayerLostDialog></PlayerLostDialog>

<!-- <svg xmlns='http://www.w3.org/2000/svg'  width='120' height='120' viewBox='0 0 120 120'><rect fill='#21261A' width='120' height='120'/><polygon  fill='#020C25' fill-opacity='1' points='120 120 60 120 90 90 120 60 120 0 120 0 60 60 0 0 0 60 30 90 60 120 120 120 '/></svg> -->

<div class="flex h-full flex-col">
	<!-- Top -->
	<div class="grid w-full flex-[0.1] grid-cols-3 px-8">
		<QuestInfo></QuestInfo>
		<TotalBox></TotalBox>
		<div class="flex items-center justify-end">
			<Button>Logs</Button>
		</div>
	</div>

	<!-- Middle -->
	<div class="flex flex-[0.5] gap-2 p-4">
		<!-- Crew -->
		<div class="grid w-full flex-[0.5] grid-cols-2 grid-rows-3 gap-4">
			{#each data.crew as unit, i}
				<div
					id={unit.uuid}
					class="flex flex-shrink-0 items-center"
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
					class="flex flex-shrink-0 items-center"
					style="grid-column: {Math.floor(i / 3) + 1}; grid-row: {(i % 3) + 1};"
				>
					<UnitBody {unit} />
				</div>
			{/each}
		</div>
	</div>
	<!-- Bottom -->
	<div class="flex flex flex-[0.4]">
		<!-- Skills -->
		<div class="flex flex-[0.8] flex-col">
			<div bind:this={crewPanel} class="box flex flex-[0.8] justify-between p-4">
				{#each data.crew as unit}
					<UnitSkillDragPanel unitId={unit.uuid} id={`skill-panel-${unit.uuid}`} name={unit.name}
					></UnitSkillDragPanel>
				{/each}
			</div>
			<div class="box flex flex-[0.8] gap-4 p-4">
				{#each data.crew as unit}
					<div class="box flex flex-col items-center gap-2 p-2">
						<Text>{unit.name}</Text>
						{#each unit.skillInstances as skill}
							<SkillInstanceCard {unit} skillInstance={skill}></SkillInstanceCard>
						{/each}
					</div>
				{/each}
			</div>
		</div>
		<!-- Buttons -->
		<div class="flex flex-[0.2] flex-col items-center justify-center">
			<div>
				<Button onclick={startCombatUI} size="lg">Go!</Button>
			</div>
		</div>
	</div>
</div>

<style>
	p {
		color: black;
		opacity: 50%;
	}
</style>
