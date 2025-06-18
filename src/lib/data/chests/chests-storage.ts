import type { ChestData, ChestId, ChestType } from './chests-models';
import chestsFile from './chests.json';
import type { ArtifactId } from '../artifacts/artifacts-models';
import type { SkillId } from '../skills/skills-models';

export let CHESTS_DICT: Record<ChestId, ChestData>;

export function loadChestsDict() {
	CHESTS_DICT = chestsFile.reduce(
		(dict, chest) => {
			dict[chest.id as ChestId] = {
				...chest,
				id: chest.id as ChestId,
				type: chest.type as ChestType,
				minExp: chest.minExp ?? null,
				maxExp: chest.maxExp ?? null,
				minGold: chest.minGold ?? null,
				maxGold: chest.maxGold ?? null,
				artifactChances:
					chest.artifactChances?.map((artifact) => ({
						artifactId: artifact.artifactId as ArtifactId,
						weight: artifact.weight
					})) || [],
				skillChances:
					chest.skillChances?.map((skill) => ({
						skillId: skill.skillId as SkillId,
						weight: skill.weight
					})) || []
			};
			return dict;
		},
		{} as Record<ChestId, ChestData>
	);
}
