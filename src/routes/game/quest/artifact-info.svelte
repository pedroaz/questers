<script lang="ts">
	import Text from '$lib/components/ui/text/text.svelte';
	import type { ArtifactId } from '$lib/data/artifacts/artifacts-models';
	import { ARTIFACTS_DICT } from '$lib/data/artifacts/artifacts-storage';
	let { artifactId }: { artifactId: ArtifactId } = $props();
	import * as Popover from '$lib/components/ui/popover/index.js';
</script>

<Popover.Root>
	<Popover.Trigger>
		<div class="gbox">
			<Text>{ARTIFACTS_DICT[artifactId].name}</Text>
		</div>
	</Popover.Trigger>
	<Popover.Content>
		<Text>{ARTIFACTS_DICT[artifactId].description}</Text>
	</Popover.Content>
</Popover.Root>
