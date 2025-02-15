<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { ScreenType } from '$lib/schemas/screen-type';
	import { goToScreen } from '$lib/services/screen-changer-service';
	import { gameState } from '$lib/states/game-state.svelte';
</script>

<div class="flex flex-col items-center justify-center gap-4 p-4">
	<h1>Quest</h1>
	<div>UUID: {gameState.data.currentQuest?.uuid}</div>
	<div>Name: {gameState.data.currentQuest?.name}</div>
	<div>Current Encounter: {gameState.data.currentEncounterIndex}</div>
	<div class="flex flex-col gap-4">
		{#each gameState.data.currentQuest.encounters as encounter}
			<div class="border-2 border-black p-4">
				<div
					style="text-decoration: {encounter.index === gameState.data.currentEncounterIndex
						? 'underline'
						: 'none'};"
				>
					Encounter: {encounter.index}
				</div>
				<div class="flex gap-4">
					{#each encounter.monsterInstances as monsterInstance}
						<div>[{monsterInstance.level}]{monsterInstance.monster}</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
	<Button
		onclick={() => {
			goToScreen(ScreenType.Combat);
		}}>Fight!</Button
	>
</div>
