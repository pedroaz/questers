export enum ArtifactId {
	FireOrb = 'fire-orb',
	IceOrb = 'ice-orb',
	DoubleSword = 'double-sword',
	GoldenShield = 'golden-shield'
}

export interface ArtifactData {
	id: ArtifactId;
	name: string;
	description: string;
	image: string;
}
