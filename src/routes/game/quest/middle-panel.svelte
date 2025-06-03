<script lang="ts">
	import Icon from '$lib/components/game/icon/icon.svelte';
	import Text from '$lib/components/ui/text/text.svelte';
	import { getCombatState } from '$lib/states/combat-state.svelte';

	const data = $derived.by(() => {
		const combatState = getCombatState();
		return {};
	});
</script>

<div class="flex flex-col items-center justify-center gap-4">
	<div class="flex items-center justify-center gap-4">
		<Text>Buffs</Text>
		<div class="flex items-center justify-center">
			<Icon icon="attack" />
			<Text>100</Text>
		</div>
		<div class="flex items-center justify-center">
			<Icon icon="defense" />
			<Text>100</Text>
		</div>
		<Text>Debuffs</Text>
	</div>
	<div class="flex items-center justify-center gap-4">
		<Text>Buffs</Text>
		<div class="flex items-center justify-center">
			<Icon icon="attack" />
			<Text>100</Text>
		</div>
		<div class="flex items-center justify-center">
			<Icon icon="defense" />
			<Text>100</Text>
		</div>
		<Text>Debuffs</Text>
	</div>
</div>

<!-- <div class="relative inline-block h-16 w-16">
			<Icon classes={'w-16 h-16'} icon="defense" />
			<div class="absolute inset-0 flex items-center justify-center">
				<Text>100</Text>
			</div>
		</div> -->
