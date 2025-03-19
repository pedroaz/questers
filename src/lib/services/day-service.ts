import { recalculateUnit } from '$lib/schemas/unit-calculationts';
import { setDay, getDay, getWorldUnits } from '$lib/states/game-state.svelte';
import { logStartGroup, logEndGroup } from './infra/logger';
import { generateQuests } from './quest-generator';

export function nextNight() {
	setDay(getDay() + 1);
	generateQuests();

	logStartGroup('Recalculating Units');
	getWorldUnits().forEach((unit) => {
		recalculateUnit(unit);
	});
	logEndGroup();

	// Reset Ship
	// Reset Skills from units
}
