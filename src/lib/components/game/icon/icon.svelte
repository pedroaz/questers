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
	import Flame from 'lucide-svelte/icons/flame';

	let { icon }: { icon: IconType } = $props();

	const iconMap = {
		warrior: Swords,
		explorer: ShipWheel,
		crafter: Hammer,
		fisherman: Fish,
		sage: WandSparkles,
		monster: Skull,
		menu: Menu,
		play: Play,
		heart: Heart,
		experience: BookUp,
		gold: Coins,
		threat: Flame
	};

	const SelectedIcon = iconMap[icon] || null;
</script>

{#if SelectedIcon}
	<SelectedIcon />
{/if}
