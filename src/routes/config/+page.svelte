<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import { persistConfig } from '$lib/persistence/persistence-service';
	import { gameConfigState } from '$lib/states/config-state.svelte';
	import { loadingState } from '$lib/states/game-state.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		if (!loadingState.loaded) {
			goto('/');
		}
	});
</script>

{#if loadingState.loaded}
	<div class="flex flex-col items-center justify-center gap-4 p-4">
		<h1>Config Page</h1>
		<Button href="/">Menu</Button>
		<div>Sound: {gameConfigState.sound ? 'On' : 'Off'}</div>
		<Switch bind:checked={gameConfigState.sound} />

		<Button onclick={persistConfig}>Save</Button>
	</div>
{/if}
