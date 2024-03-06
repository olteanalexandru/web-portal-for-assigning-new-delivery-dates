import { writable } from 'svelte/store';
const tokenValue = writable(null);
const IDTokenValue = writable(null);
export { tokenValue, IDTokenValue };