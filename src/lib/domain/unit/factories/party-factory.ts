import { v4 as uuid4 } from 'uuid';

import type { PlayerParty } from '../party';

import { ArtifactId } from '$lib/data/artifacts/artifacts-models';

export function generateParty(playerId: string) {
	const party: PlayerParty = {
		id: uuid4(),
		playerId: playerId,
		companionsIds: [],
		level: 1,
		hp: 30,
		maxHp: 30,
		energy: 3,
		maxEnergy: 3,
		chestsToOpen: [],
		rewards: [],
		artifacts: [ArtifactId.FireOrb, ArtifactId.IceOrb],
		storedArtifacts: [],
		experience: 0,
		gold: 0
	};
	return party;
}
