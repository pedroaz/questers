<script lang="ts">
	import DebugWindow from '$lib/components/game/top-menu/debug-window.svelte';
	import { loadSlim } from '@tsparticles/slim';
	import { particlesInit } from '@tsparticles/svelte';
	import '../app.css';
	let { children } = $props();
	void particlesInit(async (engine) => {
		// call this once per app
		// you can use main to customize the tsParticles instance adding presets or custom shapes
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size
		//await loadFull(engine);
		await loadSlim(engine);
	});
</script>

<DebugWindow></DebugWindow>
{@render children()}
