<script lang="ts">
	import SkillInstanceCard from '$lib/components/game/skill-instance-card/skill-instance-card.svelte';
	import UnitCard from '$lib/components/game/unit-card/unit-card.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import {
		getCombatLogs,
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
		getTotalCrewDefense,
		getTotalCrewPower,
		getTotalEnemyDefense,
		getTotalEnemyPower,
		setCrewOrder
	} from '$lib/states/game-state.svelte';
	import UnitSkillDragPanel from './unit-skill-drag-panel.svelte';
	import Sortable from 'sortablejs';
	import { onDestroy, onMount } from 'svelte';
	import { handleShakeByClassEvent, handleShakeByIdEvent } from '$lib/utils';
	import { startCombat } from '$lib/services/combat/start-combat';
	import NextStepDialog from './next-step-dialog.svelte';
	import PlayerWonDialog from './player-won-dialog.svelte';
	import PlayerLostDialog from './player-lost-dialog.svelte';

	// Get State
	const data = $derived.by(() => {
		const quest = getQuestById(getQuestToLoad());
		const crew = getCrew();
		const enemies = getEnemies();
		const ship = getPlayerShip();
		const combatLogs = getCombatLogs();
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
			combatLogs,
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

<div class="flex h-full flex-col">
	<div class="box flex flex-[0.7] flex-col">
		<div class="box flex flex-[0.8] items-center">
			<div class="flex-[0.1]">
				<div class="flex flex-col items-center gap-4">
					<Text underline>Quest Info</Text>
					<Text>[{data.quest?.type}] {data.quest?.name}</Text>
					<Text>Win Condition: {data.currentPhase.winCondition}</Text>
					<div class="box p-2">
						<Text>Phases:</Text>
						<div class="flex flex-col gap-1">
							{#each data.quest?.phases! as phase, index}
								<Text underline={index === data.phaseIndex}>{phase.type}</Text>
							{/each}
						</div>
					</div>
				</div>
			</div>

			<div class="box unit-container">
				{#each data.crew as unit, i}
					<div id={unit.uuid} class="">
						<UnitCard {unit} />
					</div>
				{/each}
			</div>
			<div class="box unit-container">
				{#each data.enemies as unit}
					<div id={unit.uuid} class="col-span-1 row-auto">
						<UnitCard {unit} />
					</div>
				{/each}
			</div>
			<div class="flex flex-[0.1] flex-col items-center">
				{#each data.combatLogs as log}
					<Text>{log.message}</Text>
				{/each}
			</div>
		</div>
		<div class="box flex flex-[0.2] items-center">
			<div class="box flex h-full flex-[0.5]">
				<div bind:this={crewPanel} class="box flex flex-[0.8] justify-between p-4">
					{#each data.crew as unit}
						<UnitSkillDragPanel unitId={unit.uuid} id={`skill-panel-${unit.uuid}`} name={unit.name}
						></UnitSkillDragPanel>
					{/each}
				</div>
				<div class="box total-box flex flex-[0.2] flex-col items-center justify-center">
					<Text>Hp {data.ship?.hp} / {data.ship?.maxHp}</Text>
					<Text>Power {getTotalCrewPower()}</Text>
					<Text>Defense {getTotalCrewDefense()}</Text>
				</div>
			</div>
			<div class="box total-box flex h-full flex-[0.5]">
				<div class="box flex flex-[0.2] flex-col items-center justify-center">
					<!-- this is wrong, need to be on top level state. Not current Phase -->
					<!-- Other Pirates Ships also do Quests -->
					<Text>Hp {data.enemyHp} / {data?.enemyMaxHp}</Text>
					<Text>Power {getTotalEnemyPower()}</Text>
					<Text>Defense {getTotalEnemyDefense()}</Text>
				</div>
				<div class="box flex-[0.8]"></div>
			</div>
		</div>
	</div>
	<div class="flex flex-[0.3]">
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
		<div class="box flex flex-[0.2] flex-col items-center justify-center gap-2">
			<Button onclick={startCombatUI} size="lg">Go!</Button>
		</div>
	</div>
</div>

<NextStepDialog></NextStepDialog>
<PlayerWonDialog></PlayerWonDialog>
<PlayerLostDialog></PlayerLostDialog>

<!-- <svg xmlns='http://www.w3.org/2000/svg'  width='120' height='120' viewBox='0 0 120 120'><rect fill='#21261A' width='120' height='120'/><polygon  fill='#020C25' fill-opacity='1' points='120 120 60 120 90 90 120 60 120 0 120 0 60 60 0 0 0 60 30 90 60 120 120 120 '/></svg> -->

<style>
	p {
		color: black;
		opacity: 50%;
	}

	.unit-container {
		@apply grid h-full flex-[0.4] flex-col items-center justify-center;
	}
</style>
