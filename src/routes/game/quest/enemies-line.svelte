<script lang="ts">
	import UnitBody from '$lib/components/game/unit-body/unit-body.svelte';
	import { getEnemiesIds, getCurrentQuest } from '$lib/states/player-state.svelte';
	import { getUnitById } from '$lib/states/units-state.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import Icon from '$lib/components/game/icon/icon.svelte';
	import { getCombatState } from '$lib/states/combat-state.svelte';
	import ArtifactInfo from './artifact-info.svelte';
	import BuffInfo from './buff-info.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import TutorialBtn from './tutorial-btn.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import LogPanel from './log-panel.svelte';

	let isLogOpen = $state(false);

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
	<div class="flex-[0.1] px-4">
		<div class="gbox flex-col items-center justify-center gap-4">
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
			<Separator></Separator>
			<div class="flex flex-wrap items-center justify-center gap-2 py-4">
				{#each data.combatState.enemiesBuffs as buff}
					<BuffInfo buffInstance={buff}></BuffInfo>
				{/each}
			</div>
		</div>
	</div>
	<div class="flex flex-[0.8] flex-col items-center justify-center gap-1">
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
	<div class="flex-[0.1] px-4">
		<div class="gbox flex flex-col items-center justify-center gap-4">
			<TutorialBtn></TutorialBtn>
			<Button>Quest Details</Button>
			<Button onclick={() => (isLogOpen = true)}>Logs</Button>
		</div>
	</div>
</div>

<Dialog.Root
	open={isLogOpen}
	onOpenChange={(open) => {
		isLogOpen = open;
	}}
>
	<Dialog.Content class="h-[80%]">
		<LogPanel></LogPanel>
	</Dialog.Content>
</Dialog.Root>
