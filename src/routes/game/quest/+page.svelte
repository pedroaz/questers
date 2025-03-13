<script lang="ts">
	import SkillInstanceCard from '$lib/components/game/skill-instance-card/skill-instance-card.svelte';
	import UnitCard from '$lib/components/game/unit-card/unit-card.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import type { SkillInstance } from '$lib/data/skills';
	import { getCrew, getEnemies, getQuestById, getQuestToLoad } from '$lib/states/game-state.svelte';
	const questId = getQuestToLoad();
	const quest = getQuestById(questId);
	const crew = getCrew();
	const enemies = getEnemies();
</script>

<div class="flex h-full flex-col">
	<div class="box flex flex-[0.7] flex-col">
		<div class="box flex flex-[0.8] items-center">
			<div
				class="box grid h-full flex-[0.5] auto-rows-auto grid-cols-2 items-center justify-center gap-1"
			>
				{#each crew as unit, i}
					<div class="col-span-1 row-auto scale-75">
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
				<div class="box flex-[0.8]">
					<p>Active Stuff Crew</p>
				</div>
				<div class="box flex-[0.2]">
					<p>Crew Power</p>
				</div>
			</div>
			<div class="box flex h-full flex-[0.5]">
				<div class="box flex-[0.2]">
					<p>Enemies Power</p>
				</div>
				<div class="box flex-[0.8]">
					<p>Active Stuff Enemies</p>
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
						<SkillInstanceCard skillInstance={skill}></SkillInstanceCard>
					{/each}
				</div>
			{/each}
		</div>
		<div class="box flex flex-[0.2] items-center justify-center">
			<Button size="lg">Go!</Button>
		</div>
	</div>
</div>

<style>
	p {
		color: black;
		opacity: 50%;
	}
</style>
