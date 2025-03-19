<script lang="ts">
	import type { IconType } from '$lib/schemas/ui-schemas';

	import Swords from 'lucide-svelte/icons/swords';
	import ShipWheel from 'lucide-svelte/icons/ship-wheel';
	import Fish from 'lucide-svelte/icons/fish';
	import Hammer from 'lucide-svelte/icons/hammer';
	import WandSparkles from 'lucide-svelte/icons/wand-sparkles';
	import Skull from 'lucide-svelte/icons/skull';
	import Play from 'lucide-svelte/icons/play';
	import Menu from 'lucide-svelte/icons/menu';
	import Heart from 'lucide-svelte/icons/heart';
	import BookUp from 'lucide-svelte/icons/book-up';
	import Coins from 'lucide-svelte/icons/coins';

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
{:else if icon === 'menu'}
	<Menu></Menu>
{:else if icon === 'start-quest'}
	<Play></Play>
{:else if icon === 'heart'}
	<Heart></Heart>
{:else if icon === 'experience'}
	<BookUp></BookUp>
{:else if icon === 'gold'}
	<Coins></Coins>
{/if}
