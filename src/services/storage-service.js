const AUTH_STORAGE_KEY = 'academyx.authenticated-user';

export function readAuthenticatedUser() {
	for (const storage of [window.sessionStorage, window.localStorage]) {
		try {
			const storedUser = storage.getItem(AUTH_STORAGE_KEY);
			if (storedUser) return JSON.parse(storedUser);
		} catch {
			storage.removeItem(AUTH_STORAGE_KEY);
		}
	}

	return null;
}

export function writeAuthenticatedUser(user, remember) {
	clearAuthenticatedUser();
	const storage = remember ? window.localStorage : window.sessionStorage;
	storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

export function clearAuthenticatedUser() {
	window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
	window.localStorage.removeItem(AUTH_STORAGE_KEY);
}
