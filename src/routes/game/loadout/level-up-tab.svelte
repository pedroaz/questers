<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Text from '$lib/components/ui/text/text.svelte';
	import { Attribute } from '$lib/domain/unit/attribute';
	import { getPlayerParty, getPlayerUnit } from '$lib/states/player-state.svelte';

	const data = $derived.by(() => {
		const party = getPlayerParty();
		return {
			party
		};
	});

	function addAttr(attr: Attribute) {
		const player = getPlayerUnit();
		const party = getPlayerParty();
		switch (attr) {
			case Attribute.Str:
				player.attributes.strength++;
				break;
			case Attribute.Agi:
				player.attributes.agility++;
				break;
			case Attribute.Int:
				player.attributes.intellect++;
				break;
			case Attribute.Lead:
				player.attributes.leadership++;
				break;
			case Attribute.Spi:
				player.attributes.spirit++;
				break;
		}
		party.unspentLevelUps--;
	}
</script>

{#if data.party.unspentLevelUps > 0}
	<div class="flex flex-col items-center justify-center gap-2">
		<Text type="medium">You have {data.party.unspentLevelUps} attribute points to spend</Text>
		<div class="flex gap-2">
			{#each Object.values(Attribute) as attr}
				<Button onclick={() => addAttr(attr)}>{attr}</Button>
			{/each}
		</div>
	</div>
{/if}
