import type { QuestInstance } from './quests-models';

import type { CompanionId } from '$lib/data/companions/companions-models';
import type { AreaId, RegionId } from '$lib/data/navigation/navigation-models';

export interface NavigationData {
	currentRegion: RegionId;
	discoveredAreas: AreaId[];
	quests: QuestInstance[];
	firstTimeInRegion: boolean;
	selectedQuestId: string;
	npcCompanionsAlreadyUsed: CompanionId[];
}
