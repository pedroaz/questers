<script lang="ts">
	import Aperture from '@lucide/svelte/icons/aperture';
	import BookUp from '@lucide/svelte/icons/book-up';
	import BowArrow from '@lucide/svelte/icons/bow-arrow';
	import Coins from '@lucide/svelte/icons/circle-dollar-sign';
	import CircleHelp from '@lucide/svelte/icons/circle-help';
	import Flame from '@lucide/svelte/icons/flame';
	import Hammer from '@lucide/svelte/icons/hammer';
	import Heart from '@lucide/svelte/icons/heart';
	import Image from '@lucide/svelte/icons/image';
	import Info from '@lucide/svelte/icons/info';
	import Menu from '@lucide/svelte/icons/menu';
	import Play from '@lucide/svelte/icons/play';
	import Settings from '@lucide/svelte/icons/settings';
	import Shield from '@lucide/svelte/icons/shield';
	import ShipWheel from '@lucide/svelte/icons/ship-wheel';
	import Skull from '@lucide/svelte/icons/skull';
	import Star from '@lucide/svelte/icons/star';
	import Sword from '@lucide/svelte/icons/sword';
	import WandSparkles from '@lucide/svelte/icons/wand-sparkles';
	import Zap from '@lucide/svelte/icons/zap';
	import CheckCheck from '@lucide/svelte/icons/check-check';

	import type { IconType } from '$lib/schemas/ui-schemas';

	let { icon, onclick, classes }: { icon: IconType; onclick?: () => void; classes?: string } =
		$props();

	const iconMap = {
		warrior: Sword,
		explorer: ShipWheel,
		crafter: Hammer,
		hunter: BowArrow,
		mage: WandSparkles,
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
		settings: Settings,
		attack: Sword,
		info: Info,
		check: CheckCheck
	};

	const SelectedIcon = iconMap[icon] || null;
</script>

{#if SelectedIcon}
	<SelectedIcon class={classes} {onclick} />
{/if}
