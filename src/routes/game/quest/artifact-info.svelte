<script lang="ts">
	import Text from '$lib/components/ui/text/text.svelte';
	import type { ArtifactId } from '$lib/data/artifacts/artifacts-models';
	import { ARTIFACTS_DICT } from '$lib/data/artifacts/artifacts-storage';
	import * as Popover from '$lib/components/ui/popover/index.js';

	let { artifactId }: { artifactId: ArtifactId } = $props();
</script>

<Popover.Root>
	<Popover.Trigger>
		<div class="gbox">
			<Text>{ARTIFACTS_DICT[artifactId].name}</Text>
		</div>
	</Popover.Trigger>
	<Popover.Content>
		<div class="flex items-center justify-center">
			<Text>{ARTIFACTS_DICT[artifactId].description}</Text>
		</div>
	</Popover.Content>
</Popover.Root>
