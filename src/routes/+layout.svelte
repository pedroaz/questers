<script lang="ts">
	import DebugWindow from '$lib/components/game/top-menu/debug-window.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<DebugWindow></DebugWindow>
{@render children()}
