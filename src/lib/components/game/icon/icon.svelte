<script lang="ts">
	import type { IconType } from '$lib/schemas/ui-schemas';

	import Swords from '@lucide/svelte/icons/sword';
	import ShipWheel from '@lucide/svelte/icons/ship-wheel';
	import BowArrow from '@lucide/svelte/icons/bow-arrow';
	import Hammer from '@lucide/svelte/icons/hammer';
	import WandSparkles from '@lucide/svelte/icons/wand-sparkles';
	import Skull from '@lucide/svelte/icons/skull';
	import Play from '@lucide/svelte/icons/play';
	import Menu from '@lucide/svelte/icons/menu';
	import Heart from '@lucide/svelte/icons/heart';
	import BookUp from '@lucide/svelte/icons/book-up';
	import Coins from '@lucide/svelte/icons/circle-dollar-sign';
	import Flame from '@lucide/svelte/icons/flame';
	import Zap from '@lucide/svelte/icons/zap';
	import Star from '@lucide/svelte/icons/star';
	import CircleHelp from '@lucide/svelte/icons/circle-help';
	import Aperture from '@lucide/svelte/icons/aperture';
	import Shield from '@lucide/svelte/icons/shield';
	import Image from '@lucide/svelte/icons/image';
	import Settings from '@lucide/svelte/icons/settings';
	import Sparkles from '@lucide/svelte/icons/sparkles';

	let { icon, onclick, classes }: { icon: IconType; onclick?: () => void; classes?: string } =
		$props();

	const iconMap = {
		warrior: Swords,
		explorer: ShipWheel,
		crafter: Hammer,
		hunter: BowArrow,
		sage: WandSparkles,
		monster: Skull,
		menu: Menu,
		play: Play,
		heart: Heart,
		experience: BookUp,
		gold: Coins,
		threat: Flame,
		energy: Zap,
		question: CircleHelp,
		start: Aperture,
		power: Star,
		defense: Shield,
		image: Image,
		settings: Settings
	};

	const SelectedIcon = iconMap[icon] || null;
</script>

{#if SelectedIcon}
	<SelectedIcon class={classes} {onclick} />
{/if}
