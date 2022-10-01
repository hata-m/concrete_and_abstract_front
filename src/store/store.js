import { writable } from 'svelte/store';

export const registeredSubjects = writable([]);

export const registeredRoomId = writable("");
export const registeredSubjectId = writable(0);

export const registeredUserId = writable(0);
export const registeredUserName = writable("");
