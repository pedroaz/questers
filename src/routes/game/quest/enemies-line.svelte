<script lang="ts">
	import UnitBody from '$lib/components/game/unit-body/unit-body.svelte';
	import { getEnemiesIds, getCurrentQuest } from '$lib/states/player-state.svelte';
	import { getUnitById } from '$lib/states/units-state.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import Icon from '$lib/components/game/icon/icon.svelte';
	import { getCombatState } from '$lib/states/combat-state.svelte';
	import ArtifactInfo from './artifact-info.svelte';

	let data = $derived.by(() => {
		const quest = getCurrentQuest();
		const combatState = getCombatState();
		let enemyIds = getEnemiesIds();

		return {
			quest,
			enemyIds,
			combatState
		};
	});
</script>

<div class="flex w-full items-center justify-center">
	<div class="flex-[0.15] px-4">
		<div class="gbox flex-col items-center justify-center gap-4">
			<div class="flex items-center justify-center">
				<Text type="medium">Enemies</Text>
			</div>

			<div class="flex items-center justify-center gap-4">
				<div id="party-hp" class="flex items-center justify-center">
					<Icon icon="heart" />
					<Text>{data.combatState.enemiesHp}/{data.combatState.enemiesMaxHp}</Text>
				</div>
				<div class="flex items-center justify-center">
					<Icon icon="attack" />
					<Text>{data.combatState.enemiesAttack}</Text>
				</div>
				<div class=" flex items-center justify-center">
					<Icon icon="defense" />
					<Text>{data.combatState.enemiesDefense}</Text>
				</div>
			</div>
			<div class="flex flex-wrap items-center justify-center gap-2 py-4">
				<div class="gbox h-4 w-4"></div>
				<div class="gbox h-4 w-4"></div>
				<div class="gbox h-4 w-4"></div>
				<div class="gbox h-4 w-4"></div>
				<div class="gbox h-4 w-4"></div>
				<div class="gbox h-4 w-4"></div>
				<div class="flex flex-wrap items-center justify-center gap-2">
					<div class="gbox h-4 w-4"></div>
					<div class="gbox h-4 w-4"></div>
					<div class="gbox h-4 w-4"></div>
					<div class="gbox h-4 w-4"></div>
					<div class="gbox h-4 w-4"></div>
					<div class="gbox h-4 w-4"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="flex flex-[0.85] flex-col items-center justify-center gap-1">
		<div class="flex justify-center gap-2">
			{#each data.enemyIds as id, i}
				<div {id} class="flex items-center justify-center">
					<UnitBody unit={getUnitById(id)}></UnitBody>
				</div>
			{/each}
		</div>
		{#each data.combatState.enemiesArtifacts as artifact}
			<ArtifactInfo artifactId={artifact}></ArtifactInfo>
		{/each}
	</div>
</div>
