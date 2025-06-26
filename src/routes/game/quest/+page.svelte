<script lang="ts">
	import EnemiesLine from './enemies-line.svelte';

	import PartyLine from './party-line.svelte';

	import { startCombat, startQuest } from '$lib/domain/combat/combat-life-cycle';
	import { onMount, onDestroy } from 'svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { handleShakeByIdEvent, SHAKE_BY_ID_EVENT } from '$lib/animations';

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
		window.addEventListener(SHAKE_BY_ID_EVENT, handleShakeByIdEvent as EventListener);

		return () => {
			window.removeEventListener('keydown', handleKeydown);
			window.removeEventListener(SHAKE_BY_ID_EVENT, handleShakeByIdEvent as EventListener);
		};
	});

	async function handleKeydown(event: KeyboardEvent) {
		if (event.code === 'Space') {
			event.preventDefault();
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
