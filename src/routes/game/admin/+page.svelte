<script lang="ts">
	import { SKILLS_DICT } from '$lib/data/skills';
	import { getQuestRoundIndex, getRound, getUnitActions } from '$lib/states/game-state.svelte';
	const data = $derived.by(() => {
		const roundIndex = getQuestRoundIndex();
		const round = getRound();
		return {
			roundIndex,
			round
		};
	});

	$inspect(data);

	function print(obj: any) {
		return JSON.stringify(obj);
	}
</script>

<div class="flex h-full flex-col items-center justify-center gap-4">
	<div>{print(SKILLS_DICT)}</div>

	<div class="text-4xl">Quest:</div>
	<div>Round {data.roundIndex}</div>
	<div class="flex flex-col items-center justify-center gap-4">
		{#each data.round.enemies as enemy}
			<div class="box p-4">
				<div>{enemy.name}</div>
				{#each enemy.skillInstances as skill}
					<div>{skill.data?.name}</div>
					<div>{print(skill.data)}</div>
				{/each}
				<!-- {#each enemy.skillInstances as skillInstance}
					<div>{skillInstance.data.type}</div>
				{/each} -->
			</div>
		{/each}
	</div>

	<div class="box flex flex-col items-center justify-center gap-4">
		{print(getUnitActions())}
	</div>
</div>
