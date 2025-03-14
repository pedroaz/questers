<script lang="ts">
	import SkillInstanceCard from '$lib/components/game/skill-instance-card/skill-instance-card.svelte';
	import UnitCard from '$lib/components/game/unit-card/unit-card.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import {
		getCrew,
		getEnemies,
		getPlayerShip,
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
	import { newTurn } from '$lib/services/combat/player-combat-actions';

	// Get State
	const state = $derived.by(() => {
		const quest = getQuestById(getQuestToLoad());
		const crew = getCrew();
		const enemies = getEnemies();
		const ship = getPlayerShip();
		return { quest, crew, enemies, ship };
	});

	// Draggable
	let crewPanel: HTMLElement;
	let sortableCrewPanel: Sortable;

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

	function newTurnUI() {
		newTurn();
	}
</script>

<div class="flex h-full flex-col">
	<div class="box flex flex-[0.7] flex-col">
		<div class="box flex flex-[0.8] items-center">
			<div
				class="box grid h-full flex-[0.5] auto-rows-auto grid-cols-2 items-center justify-center gap-4 p-4"
			>
				{#each state.crew as unit, i}
					<div id={unit.uuid} class="col-span-1 row-auto">
						<UnitCard {unit} />
					</div>
				{/each}
			</div>
			<div
				class="box grid h-full flex-[0.5] auto-rows-auto grid-cols-2 items-center justify-center gap-4 p-4"
			>
				{#each state.enemies as unit}
					<div id={unit.uuid} class="col-span-1 row-auto">
						<UnitCard {unit} />
					</div>
				{/each}
			</div>
		</div>
		<div class="box flex flex-[0.2] items-center">
			<div class="box flex h-full flex-[0.5]">
				<div bind:this={crewPanel} class="box flex flex-[0.8] justify-between p-4">
					{#each state.crew as unit}
						<UnitSkillDragPanel unitId={unit.uuid} id={`skill-panel-${unit.uuid}`} name={unit.name}
						></UnitSkillDragPanel>
					{/each}
				</div>
				<div class="box total-box flex flex-[0.2] flex-col items-center justify-center">
					<Text>Hp {state.ship?.hp} / {state.ship?.maxHp}</Text>
					<Text>Power {getTotalCrewPower()}</Text>
					<Text>Defense {getTotalCrewDefense()}</Text>
				</div>
			</div>
			<div class="box total-box flex h-full flex-[0.5]">
				<div class="box flex flex-[0.2] flex-col items-center justify-center">
					<Text>Hp {state?.quest?.hp} / {state?.quest?.maxHp}</Text>
					<Text>Power {getTotalEnemyPower()}</Text>
					<Text>Defense {getTotalEnemyDefense()}</Text>
				</div>
				<div class="box flex-[0.8]">
					<p>Enemies Actions</p>
				</div>
			</div>
		</div>
	</div>
	<div class="flex flex-[0.3]">
		<div class="box flex flex-[0.8] gap-4 p-4">
			{#each state.crew as unit}
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
			<Button onclick={newTurnUI} size="lg">New Turn</Button>
		</div>
	</div>
</div>

<style>
	p {
		color: black;
		opacity: 50%;
	}
</style>
