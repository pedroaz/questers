<script lang="ts">
	import DebugQuestBtn from './debug-quest-btn.svelte';
	import EnemiesLine from './enemies-line.svelte';
	import LogPanel from './log-panel.svelte';
	import DisplayPanel from './display-panel.svelte';
	import PartyLine from './party-line.svelte';
	import PlayPanel from './play-panel.svelte';

	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { startQuest } from '$lib/domain/combat/combat-life-cycle';

	let isLogOpen = $state(false);
	startQuest();
</script>

<div class="flex h-full">
	<!-- <div class="flex flex-[0.1] flex-col items-center justify-around">
		<DisplayPanel></DisplayPanel>
	</div> -->
	<div class="flex flex-[0.88] flex-col">
		<div class="flex flex-[0.5] items-center justify-center">
			<EnemiesLine></EnemiesLine>
		</div>
		<div class="flex flex-[0.5] items-center justify-center">
			<PartyLine></PartyLine>
		</div>
	</div>

	<div class="flex flex-[0.1] flex-col justify-between py-5">
		<div class="gbox flex flex-col items-center justify-center gap-4">
			<Button>Settings</Button>

			<Button>Quest Details</Button>
			<Button onclick={() => (isLogOpen = true)}>Logs</Button>
		</div>
		<div class="gbox flex flex-col items-center justify-center gap-4">
			<DebugQuestBtn></DebugQuestBtn>
			<PlayPanel></PlayPanel>
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
