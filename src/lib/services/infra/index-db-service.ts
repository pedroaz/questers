/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/indexDbService.ts

// Open the IndexedDB and create a store if it doesn't exist
const dbName = 'game_logs';
const storeName = 'logs';

let db: IDBDatabase | null = null;

async function openDb() {
	if (db) return db;

	// Open IndexedDB, create a store if it doesn't exist
	const request = indexedDB.open(dbName, 1);

	request.onupgradeneeded = (event) => {
		const db = (event.target as IDBRequest).result;
		// Create a store with an auto-incrementing key
		if (!db.objectStoreNames.contains(storeName)) {
			db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
		}
	};

	const dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
		request.onsuccess = (event) => {
			db = (event.target as IDBRequest).result;
			resolve(db as IDBDatabase);
		};
		request.onerror = (event) => {
			reject((event.target as IDBRequest).error);
		};
	});

	return dbPromise;
}

// Add log entry to IndexedDB
export async function addLog(category: string, message: string) {
	const db = await openDb();
	const transaction = db.transaction(storeName, 'readwrite');
	const store = transaction.objectStore(storeName);

	const log = { category, message, timestamp: new Date().toISOString() };

	// Add the log entry
	store.add(log);

	return new Promise<void>((resolve, reject) => {
		transaction.oncomplete = () => resolve();
		transaction.onerror = (event) => reject((event.target as IDBRequest).error);
	});
}

// Retrieve logs from IndexedDB
export async function getLogs(): Promise<any[]> {
	const db = await openDb();
	const transaction = db.transaction(storeName, 'readonly');
	const store = transaction.objectStore(storeName);

	const logsPromise = new Promise<any[]>((resolve, reject) => {
		const logs: any[] = [];
		const request = store.openCursor();

		request.onsuccess = (event) => {
			const cursor = (event.target as IDBRequest).result;
			if (cursor) {
				logs.push(cursor.value);
				cursor.continue();
			} else {
				resolve(logs);
			}
		};

		request.onerror = (event) => reject((event.target as IDBRequest).error);
	});

	return logsPromise;
}

// Clear all logs
export async function clearLogs() {
	const db = await openDb();
	const transaction = db.transaction(storeName, 'readwrite');
	const store = transaction.objectStore(storeName);

	const clearPromise = new Promise<void>((resolve, reject) => {
		const request = store.clear();
		request.onsuccess = () => resolve();
		request.onerror = (event) => reject((event.target as IDBRequest).error);
	});

	return clearPromise;
}

// Delete IndexedDB
export async function deleteDb() {
	const request = indexedDB.deleteDatabase(dbName);

	return new Promise<void>((resolve, reject) => {
		request.onsuccess = () => resolve();
		request.onerror = (event) => reject((event.target as IDBRequest).error);
	});
}
