<script lang="ts">
	import DebugQuestBtn from './debug-quest-btn.svelte';
	import EnemiesLine from './enemies-line.svelte';
	import LogPanel from './log-panel.svelte';
	import DisplayPanel from './display-panel.svelte';
	import PartyLine from './party-line.svelte';
	import PlayPanel from './play-panel.svelte';

	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { startCombat, startQuest } from '$lib/domain/combat/combat-life-cycle';
	import { onMount, onDestroy } from 'svelte';
	import TutorialBtn from './tutorial-btn.svelte';
	import RerollBtn from './reroll-btn.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';

	onMount(async () => {
		window.addEventListener('keydown', handleKeydown);
	});

	onDestroy(() => {
		window.removeEventListener('keydown', handleKeydown);
	});

	async function handleKeydown(event: KeyboardEvent) {
		if (event.code === 'Space') {
			event.preventDefault(); // Optional: prevent scrolling
			await startCombat();
		}
	}

	startQuest();
</script>

<div class="flex h-full flex-col">
	<!-- <div class="flex flex-[0.1] flex-col items-center justify-around">
		<DisplayPanel></DisplayPanel>
	</div> -->
	<div class="flex flex-[0.5] items-center justify-center">
		<EnemiesLine></EnemiesLine>
	</div>
	<Separator></Separator>
	<div class="flex flex-[0.5] items-center justify-center">
		<PartyLine></PartyLine>
	</div>
</div>
