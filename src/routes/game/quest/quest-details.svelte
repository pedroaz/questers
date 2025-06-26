<script lang="ts">
	import GameImage from '$lib/components/game/image/game-image.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import Text from '$lib/components/ui/text/text.svelte';
	import { getCombatState } from '$lib/states/combat-state.svelte';
	import { getCurrentQuest } from '$lib/states/player-state.svelte';
	import { getUnitById } from '$lib/states/units-state.svelte';

	const quest = getCurrentQuest();
	const combatState = getCombatState();
</script>

<Drawer.Root>
	<Drawer.Trigger>
		<Button>Quest Details</Button>
	</Drawer.Trigger>
	<Drawer.Content>
		<div style="height: 50vh;">
			<div class="flex h-full flex-col items-center gap-4">
				<Text type="big">Quest Details</Text>
				<Text>Round: {combatState.roundIndex}</Text>
				<div class="flex items-center justify-center gap-12">
					{#each quest.rounds as round}
						<div class="flex flex-col items-center justify-center">
							<Text underline={combatState.combatIndex == round.index} type="medium"
								>Round {round.index}</Text
							>
							<div class="flex gap-2">
								{#each round.enemiesIds as enemyId}
									<div class="flex flex-col items-center justify-center gap-2">
										<GameImage width="5vh" height="5vh" path={getUnitById(enemyId).bodyImage}
										></GameImage>
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</Drawer.Content>
</Drawer.Root>
