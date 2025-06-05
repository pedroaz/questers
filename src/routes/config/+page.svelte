<script lang="ts">
	import { onMount } from 'svelte';

	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import Text from '$lib/components/ui/text/text.svelte';
	import { persistConfig } from '$lib/persistence/persistence-saver';
	import { getConfigState } from '$lib/states/config-state.svelte';
	import { getGameIsLoaded } from '$lib/states/game-state.svelte';

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
		<Text type="big">Configurations</Text>

		<!-- <div>Sound: {configState.sound ? 'On' : 'Off'}</div>
		<Switch bind:checked={configState.sound} /> -->

		<Button disabled onclick={persistConfig}>Save</Button>
	</div>
{/if}
