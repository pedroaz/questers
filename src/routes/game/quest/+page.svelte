<script lang="ts">
	import UnitCard from '$lib/components/game/unit-card/unit-card.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import { getCrew, getEnemies, getQuestById, getQuestToLoad } from '$lib/states/game-state.svelte';
	const questId = getQuestToLoad();
	const quest = getQuestById(questId);
	const crew = getCrew();
	const enemies = getEnemies();
</script>

<div class="flex h-full flex-col">
	<div class="box flex flex-[0.7] flex-col">
		<div class="box flex flex-[0.8] items-center">
			<div class="box flex h-full flex-[0.5] flex-col items-center justify-center gap-1">
				{#each crew as unit}
					<UnitCard {unit}></UnitCard>
				{/each}
			</div>
			<div class="box flex h-full flex-[0.5] flex-col items-center justify-center gap-1">
				{#each enemies as unit}
					<UnitCard {unit}></UnitCard>
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
		<div class="box flex-[0.7]">
			<p>Actions</p>
		</div>
		<div class="box flex flex-[0.3] items-center justify-center">
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
