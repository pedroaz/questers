<script lang="ts">
	import Text from '$lib/components/ui/text/text.svelte';
	import { getPlayerParty, setPlayerParty } from '$lib/states/player-state.svelte';
	import GameImage from '$lib/components/game/image/game-image.svelte';
	import { ARTIFACTS_DICT } from '$lib/data/artifacts/artifacts-storage';
	import type { ArtifactId } from '$lib/data/artifacts/artifacts-models';
	const data = $derived.by(() => {
		const party = getPlayerParty();
		return {
			party
		};
	});

	function equipArtifact(artifactId: ArtifactId) {
		console.log('E', artifactId);
		const party = getPlayerParty();
		if (party.artifacts.length >= 6) return;
		party.artifacts.push(artifactId);
		party.storedArtifacts = party.storedArtifacts.filter((a) => a != artifactId);
		setPlayerParty(party);
	}

	function unequipArtifact(artifactId: ArtifactId) {
		console.log('U', artifactId);
		const party = getPlayerParty();
		party.artifacts = party.artifacts.filter((a) => a != artifactId);
		party.storedArtifacts.push(artifactId);
		setPlayerParty(party);
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="flex items-center justify-center gap-4">
	<div class="gbox flex flex-col items-center gap-4">
		<Text type="medium">Equipped Artifacts</Text>
		<div class="gbox2 flex items-center justify-center gap-4">
			{#each data.party.artifacts as artifact}
				<div
					onclick={() => unequipArtifact(artifact)}
					class="flex cursor-pointer flex-col items-center justify-center"
				>
					<GameImage width="10vh" height="10vh" path={ARTIFACTS_DICT[artifact].image}></GameImage>
					<Text>{ARTIFACTS_DICT[artifact].name}</Text>
				</div>
			{/each}
		</div>
	</div>
	<div class="gbox flex flex-col items-center gap-4">
		<Text type="medium">Artifact Storage</Text>
		<div class="gbox2 flex items-center justify-center gap-4">
			{#each data.party.storedArtifacts as artifact}
				<div
					onclick={() => equipArtifact(artifact)}
					class="flex cursor-pointer flex-col items-center justify-center"
				>
					<GameImage width="10vh" height="10vh" path={ARTIFACTS_DICT[artifact].image}></GameImage>
					<Text>{ARTIFACTS_DICT[artifact].name}</Text>
				</div>
			{/each}
		</div>
	</div>
</div>
