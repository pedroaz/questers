<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';
	import EnemiesLine from './enemies-line.svelte';
	import MiddlePanel from './middle-panel.svelte';
	import PartyLine from './party-line.svelte';
	import { startCombat, startQuest } from '$lib/domain/combat/combat-life-cycle';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import LogPanel from './log-panel.svelte';

	let isLogOpen = $state(false);
	startQuest();
</script>

<div class="flex h-full flex-col">
	<div class="flex flex-[0.7] flex-col">
		<div class="flex flex-[0.4] items-center justify-center">
			<EnemiesLine></EnemiesLine>
		</div>
		<div class="flex flex-[0.2] flex-col items-center justify-center">
			<MiddlePanel></MiddlePanel>
		</div>
		<div class="flex flex-[0.4] items-center justify-center">
			<PartyLine></PartyLine>
		</div>
	</div>

	<div class="flex flex-[0.3]">
		<div class="flex flex-[0.25] flex-col items-center justify-center gap-2">
			<Button>Quest Details</Button>
			<Button onclick={() => (isLogOpen = true)}>Logs</Button>
		</div>
		<div class="flex flex-[0.5] items-center justify-center">
			<Button onclick={async () => await startCombat()}>Start</Button>
		</div>
		<div class="flex flex-[0.25] flex-col items-center justify-center gap-2">
			<Button>Settings</Button>
			<Button>Debug</Button>
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
