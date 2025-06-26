import { ArtifactId } from './artifacts-models';

export const ARTIFACT_MAP: Record<ArtifactId, () => void> = {
	[ArtifactId.FireOrb]: nothing,
	[ArtifactId.IceOrb]: nothing,
	[ArtifactId.DoubleSword]: nothing,
	[ArtifactId.GoldenShield]: nothing
};

function nothing() {}
