<script lang="ts">
	import EnemiesLine from './enemies-line.svelte';

	import PartyLine from './party-line.svelte';

	import { startCombat, startQuest } from '$lib/domain/combat/combat-life-cycle';
	import { onMount, onDestroy } from 'svelte';
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
	<div class="flex flex-[0.5] items-center justify-center">
		<EnemiesLine></EnemiesLine>
	</div>
	<Separator></Separator>
	<div class="flex flex-[0.5] items-center justify-center">
		<PartyLine></PartyLine>
	</div>
</div>
