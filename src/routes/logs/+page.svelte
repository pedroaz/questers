<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { clearLogs, getLogs } from '$lib/domain/infra/index-db-service';
	import { onMount } from 'svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';

	let logs: any[] = [];
	onMount(async () => {
		const fetchLogs = async () => {
			logs = await getLogs();
		};
		fetchLogs();
		setInterval(fetchLogs, 100);
	});
</script>

<div>
	<Button variant="outline" onclick={() => window.location.reload()}>Refresh</Button>
	<Button variant="outline" onclick={() => clearLogs()}>Clear Logs</Button>
</div>

<div class="flex flex-col items-center justify-center gap-1">
	<table class="table-auto">
		<thead>
			<tr>
				<th>Message</th>
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
