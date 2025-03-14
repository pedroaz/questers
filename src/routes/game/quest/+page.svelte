<script lang="ts">
	import SkillInstanceCard from '$lib/components/game/skill-instance-card/skill-instance-card.svelte';
	import UnitCard from '$lib/components/game/unit-card/unit-card.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import type { SkillInstance } from '$lib/data/skills';
	import {
		getCrew,
		getEnemies,
		getQuestById,
		getQuestToLoad,
		getTotalCrewDefense,
		getTotalCrewPower,
		getTotalEnemyPower,
		setCrewOrder
	} from '$lib/states/game-state.svelte';
	import UnitSkillPanel from './unit-skill-panel.svelte';
	import Sortable from 'sortablejs';
	import { newTurn, startCombat } from '$lib/schemas/unit-calculationts';
	import { onDestroy, onMount } from 'svelte';
	import anime from 'animejs';

	// Get State
	const questId = getQuestToLoad();
	const quest = getQuestById(questId);
	const crew = getCrew();
	const enemies = getEnemies();

	// Draggable
	let crewPanel: HTMLElement;
	let sortableCrewPanel: Sortable;

	// Animations
	const animationsDict: Record<string, anime.AnimeInstance> = {};

	onMount(async function () {
		sortableCrewPanel = Sortable.create(crewPanel, {
			group: {
				name: 'crewPanel',
				put: true
			},
			animation: 200
		});
		window.addEventListener('shake-div', (event: Event) =>
			handleShakeUnitEvent(event as CustomEvent)
		);
		for (const unit of crew) {
			console.log(`Creating animation for ${unit.uuid}`);
			var elements = document.getElementById(unit.uuid);
			var animation = anime({
				targets: elements,
				translateX: [-10, 10, -10, 10, -5, 5, 0], // Move left-right
				duration: 500,
				scale: [0.75, 0.75],
				easing: 'easeInOutQuad',
				autoplay: false
			});
			animationsDict[unit.uuid] = animation;
		}
	});

	onDestroy(() => {
		window.removeEventListener('shake-unit', (event: Event) =>
			handleShakeUnitEvent(event as CustomEvent)
		);
	});

	function handleShakeUnitEvent(event: CustomEvent) {
		console.log(`Shaking ${event.detail.id}`);
		const animation = animationsDict[event.detail.id];
		if (animation) {
			console.log(animation.animatables);
			animation.play();
		} else {
			console.error(`No animation found for id: ${event.detail.id}`);
		}
	}

	// Buttons

	async function startCombatUI() {
		setCrewOrder(sortableCrewPanel.toArray());
		await startCombat();
	}

	function newTurnUI() {
		newTurn();
	}

	let unitElements = [];

	function debugShake() {
		console.log('Shaking');
		var elements = document.getElementById('086bc838-0da8-44d8-a1c8-1f3a4dd73d7e');
		anime({
			targets: elements,
			translateX: [-10, 10, -10, 10, -5, 5, 0], // Move left-right
			duration: 500,
			scale: [0.75, 0.75],
			easing: 'easeInOutQuad'
		});
	}
</script>

<div class="flex h-full flex-col">
	<div class="box flex flex-[0.7] flex-col">
		<div class="box flex flex-[0.8] items-center">
			<div
				class="box grid h-full flex-[0.5] auto-rows-auto grid-cols-2 items-center justify-center gap-1"
			>
				{#each crew as unit, i}
					<div id={unit.uuid} class="col-span-1 row-auto scale-75">
						{unit.uuid}
						<UnitCard {unit} />
					</div>
				{/each}
			</div>
			<div
				class="box grid h-full flex-[0.5] auto-rows-auto grid-cols-2 items-center justify-center gap-1"
			>
				{#each enemies as unit}
					<div class="col-span-1 row-auto scale-75">
						<UnitCard {unit} />
					</div>
				{/each}
			</div>
		</div>
		<div class="box flex flex-[0.2] items-center">
			<div class="box flex h-full flex-[0.5]">
				<div bind:this={crewPanel} class="box flex flex-[0.8] justify-between p-4">
					{#each crew as unit}
						<UnitSkillPanel id={unit.uuid} name={unit.name}></UnitSkillPanel>
					{/each}
				</div>
				<div class="box flex flex-[0.2] flex-col items-center justify-center">
					<Text>Power {getTotalCrewPower()}</Text>
					<Text>Defense {getTotalCrewDefense()}</Text>
				</div>
			</div>
			<div class="box flex h-full flex-[0.5]">
				<div class="box flex flex-[0.2] flex-col items-center justify-center">
					<Text>Power {getTotalEnemyPower()}</Text>
					<Text>Defense {getTotalCrewDefense()}</Text>
				</div>
				<div class="box flex-[0.8]">
					<p>Enemies Actions</p>
				</div>
			</div>
		</div>
	</div>
	<div class="flex flex-[0.3]">
		<div class="box flex flex-[0.8] gap-4 p-4">
			{#each crew as unit}
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
			<Button onclick={debugShake} size="lg">Shake</Button>
		</div>
	</div>
</div>

<style>
	p {
		color: black;
		opacity: 50%;
	}
</style>
