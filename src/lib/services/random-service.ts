/**
 * Get a random integer between min and max (inclusive).
 */
export function getRandomNumber(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function rollChance(chance: number): boolean {
	return getRandomNumber(0, 100) <= chance;
}
