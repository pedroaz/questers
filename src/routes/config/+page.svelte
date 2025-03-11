<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import { persistConfig } from '$lib/persistence/persistence-saver';
	import { getConfigState } from '$lib/states/config-state.svelte';
	import { getGameIsLoaded } from '$lib/states/game-state.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		if (!getGameIsLoaded()) {
			goto('/');
		}
	});

	const configState = getConfigState();
</script>

{#if getGameIsLoaded()}
	<div class="absolute left-5 top-6">
		<Button href="/">Return to Menu</Button>
	</div>
	<div class="flex h-screen flex-col items-center justify-center gap-4 p-4">
		<h1>Config Page</h1>

		<div>Sound: {configState.sound ? 'On' : 'Off'}</div>
		<Switch bind:checked={configState.sound} />

		<Button onclick={persistConfig}>Save</Button>
	</div>
{/if}
