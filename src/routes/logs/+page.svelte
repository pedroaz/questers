<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { clearLogs, getLogs } from '$lib/domain/infra/index-db-service';
	import { onMount } from 'svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import Text from '$lib/components/ui/text/text.svelte';

	let logs: any[] = [];
	onMount(async () => {
		const fetchLogs = async () => {
			logs = await getLogs();
		};
		fetchLogs();
		setInterval(fetchLogs, 100);
	});
</script>

<div class="p-4">
	<Button onclick={() => window.location.reload()}>Refresh</Button>
	<Button onclick={() => clearLogs()}>Clear Logs</Button>
</div>

<div class="flex flex-col items-center justify-center gap-1">
	<table class="table-auto">
		<thead>
			<tr>
				<th><Text type="big">Logs</Text></th>
			</tr>
		</thead>
		<tbody>
			<ScrollArea class="h-[500px] w-[350px] rounded-md border p-4">
				{#each logs as log}
					<tr>
						<td>[{log.category}] - {log.message}</td>
					</tr>
				{/each}
			</ScrollArea>
		</tbody>
	</table>
</div>
