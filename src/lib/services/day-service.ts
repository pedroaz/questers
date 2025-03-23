import { recalculateUnit } from '$lib/schemas/unit-calculationts';
import { setTotalDays, getTotalDays, getWorldUnits } from '$lib/states/game-state.svelte';
import { logStartGroup, logEndGroup } from './infra/logger';
import { generateQuests } from './quest-generator';

export function nextNight() {
	setTotalDays(getTotalDays() + 1);
	generateQuests();

	logStartGroup('Recalculating Units');
	getWorldUnits().forEach((unit) => {
		recalculateUnit(unit);
	});
	logEndGroup();

	// Reset Ship
	// Reset Skills from units
}
