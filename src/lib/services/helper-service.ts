export function getRandomElement<T>(list: T[]): T | undefined {
	const randomIndex = Math.floor(Math.random() * list.length);
	return list[randomIndex];
}
