<script lang="ts">
	import type { IconType } from '$lib/schemas/ui-schemas';

	import Swords from 'lucide-svelte/icons/swords';
	import ShipWheel from 'lucide-svelte/icons/ship-wheel';
	import Fish from 'lucide-svelte/icons/fish';
	import Hammer from 'lucide-svelte/icons/hammer';
	import WandSparkles from 'lucide-svelte/icons/wand-sparkles';
	import Skull from 'lucide-svelte/icons/skull';
	import Play from 'lucide-svelte/icons/play';

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
{:else if icon === 'monster'}
	<Skull></Skull>
{:else if icon === 'start-quest'}
	<Play></Play>
{/if}
