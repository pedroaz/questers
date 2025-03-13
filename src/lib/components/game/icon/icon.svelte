<script lang="ts">
	import Swords from 'lucide-svelte/icons/swords';
	import ShipWheel from 'lucide-svelte/icons/ship-wheel';
	import Fish from 'lucide-svelte/icons/fish';
	import Hammer from 'lucide-svelte/icons/hammer';
	import WandSparkles from 'lucide-svelte/icons/wand-sparkles';
	import type { IconType } from '$lib/schemas/ui-schemas';

	let { icon }: { icon: IconType } = $props();
</script>

{#if icon === 'warrior'}
	<Swords></Swords>
{:else if icon === 'explorer'}
	<ShipWheel></ShipWheel>
{:else if icon === 'crafter'}
	<Hammer></Hammer>
{:else if icon === 'fisherman'}
	<Fish></Fish>
{:else if icon === 'sage'}
	<WandSparkles></WandSparkles>
{:else if icon === 'monster-normal'}
	<WandSparkles></WandSparkles>
{/if}
