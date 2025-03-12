<script lang="ts">
	import UnitCard from '$lib/components/game/unit-card/unit-card.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import { getCrew, getQuestById, getQuestToLoad } from '$lib/states/game-state.svelte';
	const questId = getQuestToLoad();
	const quest = getQuestById(questId);
	const crew = getCrew();
</script>

<div class="flex h-full flex-col">
	<div class="box flex flex-[0.7] flex-col bg-red-200">
		<div class="box flex flex-[0.8] items-center bg-red-200">
			<div class="box h-full flex-[0.5]">
				{#each crew as unit}
					<UnitCard {unit}></UnitCard>
				{/each}
			</div>
			<div class="box h-full flex-[0.5]">
				<p>Enemies</p>
			</div>
		</div>
		<div class="box flex flex-[0.2] items-center bg-red-200">
			<div class="box flex h-full flex-[0.5]">
				<div class="box flex-[0.8]">
					<p>Active Stuff Crew</p>
				</div>
				<div class="box flex-[0.2] bg-red-300">
					<p>Crew Power</p>
				</div>
			</div>
			<div class="box flex h-full flex-[0.5]">
				<div class="box flex-[0.2] bg-red-300">
					<p>Enemies Power</p>
				</div>
				<div class="box flex-[0.8]">
					<p>Active Stuff Enemies</p>
				</div>
			</div>
		</div>
	</div>
	<div class="flex flex-[0.3] bg-yellow-200">
		<div class="box flex-[0.7] bg-orange-200">
			<p>Actions</p>
		</div>
		<div class="box flex-[0.3] bg-purple-200">
			<p>Buttons</p>
		</div>
	</div>
</div>

<style>
	.box {
		box-shadow: 0px 0px 0px 1px black inset;
	}
	p {
		color: black;
		opacity: 50%;
	}
</style>
