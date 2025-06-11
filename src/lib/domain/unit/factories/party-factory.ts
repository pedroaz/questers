import { v4 as uuid4 } from 'uuid';

import type { PlayerParty } from '../party';

export function generateParty(playerId: string) {
	const party: PlayerParty = {
		id: uuid4(),
		playerId: playerId,
		companionsIds: [],
		hp: 30,
		maxHp: 30,
		energy: 3,
		maxEnergy: 3,
		chestsToOpen: [],
		rewards: [],
		storedArtifacts: [],
		skillRolls: 2,
		maxSkillRolls: 2,
		experience: 0,
		gold: 0
	};
	return party;
}
