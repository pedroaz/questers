<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { SKILLS_DICT, type SkillInstance } from '$lib/data/skills';
	import type { Unit } from '$lib/schemas/unit';
	import { addCrewAction } from '$lib/services/combat/player-combat-actions';

	let { unit, skillInstance }: { unit: Unit; skillInstance: SkillInstance } = $props();
	const data = SKILLS_DICT[skillInstance.type];

	function onClick() {
		addCrewAction(unit.uuid, skillInstance);
	}
</script>

<Button onclick={onClick} disabled={skillInstance.used}>{data.name}</Button>
