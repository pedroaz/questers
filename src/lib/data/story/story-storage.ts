import type { StoryData, StoryId } from './story-models';
import storyFile from './story.json';

export let STORY_DIC: Record<StoryId, StoryData>;

export function loadStories() {
	STORY_DIC = storyFile.reduce(
		(dict, story) => {
			const storyId = story.id as StoryId;
			dict[storyId] = {
				...story
			} as StoryData;
			return dict;
		},
		{} as Record<StoryId, StoryData>
	);
}
