import { writable } from 'svelte-local-storage-store';
export let curruser = writable('curruser', {
	name: '',
	mail: '',
	image: '',
	token: '',
	admin: false
});
export let search = writable('search', {
	txt: '',
	type: ''
});
export let state = writable('state', 0);
export let animeofinterest = writable('animeofinterest', []);
export let eps = writable('eps', []);
export let epanime = writable('epanime', -1);
export let userepratings = writable('userepratings', []);
