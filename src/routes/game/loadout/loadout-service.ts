import { COMPANION_DICT } from '$lib/data/companions/companions-storage';
import { UnitType, type Unit } from '$lib/domain/unit/unit';
import { resetUnitToNewDay } from '$lib/domain/unit/unit-reseter';
import { getPlayerParty, getPlayerPartyIds, setPlayerParty } from '$lib/states/player-state.svelte';
import { getUnitById } from '$lib/states/units-state.svelte';

export function initLoadout() {
	const party = getPlayerParty();

	const partyUnitIds = getPlayerPartyIds();

	partyUnitIds.forEach((id) => {
		const unit = getUnitById(id);
		while (unit.level < party.level) {
			if (unit.type === UnitType.Player) {
				unit.level++;
			}

			if (unit.type === UnitType.Companion) {
				addAttribute(unit);
				addSkill(unit);
				unit.level++;
			}
		}

		resetUnitToNewDay(unit);
	});
	setPlayerParty(party);
}

function addAttribute(unit: Unit) {
	if (!unit.companionId) {
		console.warn('Unit missing companionId:', unit.uuid);
		return;
	}
	const data = COMPANION_DICT[unit.companionId!];
	if (unit.level >= data.levelUps.length) {
		return;
	}
	const attr = data.levelUps[unit.level];
	switch (attr) {
		case 'str':
			unit.attributes.strength++;
			break;
		case 'lead':
			unit.attributes.leadership++;
			break;
		case 'agi':
			unit.attributes.agility++;
			break;
		case 'int':
			unit.attributes.intellect++;
			break;
		case 'spi':
			unit.attributes.spirit++;
			break;
	}
}

function addSkill(unit: Unit) {
	if (!unit.companionId) {
		console.warn('Unit missing companionId:', unit.uuid);
		return;
	}
	const data = COMPANION_DICT[unit.companionId];
	if (unit.level >= data.skills.length) {
		return;
	}
	const skillId = data.skills[unit.level];
	if (unit.skills.includes(skillId)) {
		return;
	}
	unit.skills.push(skillId);
}
