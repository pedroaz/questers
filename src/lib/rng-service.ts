/**
 * Get a random integer between min and max (inclusive).
 */
export function getRandomNumber(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
If chance = 30:
	•	There is a 30% chance the function returns true.
	•	There is a 70% chance it returns false.
*/
export function rollChance(chance: number): boolean {
	return getRandomNumber(0, 100) <= chance;
}
