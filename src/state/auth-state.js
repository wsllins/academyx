import { clearAuthenticatedUser, readAuthenticatedUser, writeAuthenticatedUser } from '../services/storage-service.js';

export function getCurrentUser() {
	return readAuthenticatedUser();
}

export function setCurrentUser(user, remember) {
	writeAuthenticatedUser(user, remember);
}

export function clearCurrentUser() {
	clearAuthenticatedUser();
}
