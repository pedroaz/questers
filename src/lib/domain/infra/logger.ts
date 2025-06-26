import { addLog } from './index-db-service';

const ENABLE_DEBUG = false;
const ENABLE_LOADER = false;
const ENABLE_CREATE_WORLD = false;
const ENABLE_PERSISTENCE = false;
const ENABLE_GROUPS = false;
const ENABLE_COMBAT = false;
const ENABLE_LOADOUT = false;

enum LogCategory {
	Debug = 'debug',
	Loader = 'loader',
	CreateWorld = 'create-world',
	Persistence = 'persistence',
	Combat = 'combat',
	Loadout = 'loadout'
}

function internalLog(category: LogCategory, message: string) {
	addLog(category, message);
	console.log(`[${category}] ${message}`);
}

export function log(message: string) {
	if (!ENABLE_DEBUG) return;
	internalLog(LogCategory.Debug, message);
}

export function logLoadEvent(message: string) {
	if (!ENABLE_LOADER) return;
	internalLog(LogCategory.Loader, message);
}

export function logCreateWorld(message: string) {
	if (!ENABLE_CREATE_WORLD) return;
	internalLog(LogCategory.CreateWorld, message);
}

export function logPersistence(message: string) {
	if (!ENABLE_PERSISTENCE) return;
	internalLog(LogCategory.Persistence, message);
}

export function logStartGroup(groupName: string) {
	if (!ENABLE_GROUPS) return;
	console.group(groupName);
}

export function logEndGroup() {
	if (!ENABLE_GROUPS) return;
	console.groupEnd();
}

export function logCombat(message: string) {
	if (!ENABLE_COMBAT) return;
	internalLog(LogCategory.Combat, message);
}

export function logLoadout(message: string) {
	if (!ENABLE_LOADOUT) return;
	internalLog(LogCategory.Loadout, message);
}
