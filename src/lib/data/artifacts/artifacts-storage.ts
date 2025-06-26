import artifactsFile from './artifacts.json';
import type { ArtifactData, ArtifactId } from '../artifacts/artifacts-models';

export let ARTIFACTS_DICT: Record<ArtifactId, ArtifactData>;

export function loadArtifactsDict() {
	ARTIFACTS_DICT = artifactsFile.reduce(
		(dict, artifact) => {
			dict[artifact.id as ArtifactId] = {
				...artifact,
				id: artifact.id as ArtifactId
			};
			return dict;
		},
		{} as Record<ArtifactId, ArtifactData>
	);
}
