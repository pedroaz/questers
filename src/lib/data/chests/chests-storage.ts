import type { ChestData, ChestId } from './chests-models';
import chestsFile from './chests.json';
import type { ArtifactId } from '../artifacts/artifacts-models';

export let CHESTS_DICT: Record<ChestId, ChestData>;

export function loadChestsDict() {
	CHESTS_DICT = chestsFile.reduce(
		(dict, chest) => {
			dict[chest.id as ChestId] = {
				...chest,
				id: chest.id as ChestId,
				artifactChances: chest.artifactsChances.map((artifact) => ({
					artifactId: artifact.artifactId as ArtifactId,
					chance: artifact.chance
				}))
			};
			return dict;
		},
		{} as Record<ChestId, ChestData>
	);
}
