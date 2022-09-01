<script>
	import { Spinner } from 'flowbite-svelte';
	import { curruser, wlanimes } from '../stores/store';

	let watchlist = {
		success: false,
		watchlist_anime: [],
		watchlist_favourite: []
	};
	let resanimes = [];
	//console.log($curruser);
	//console.log($curruser.name);
	let user = $curruser.name;
	//console.log(user);
	let watchlistendpoint = 'http://localhost:5000/watchlist/' + user;
	async function proxyfetchwlinfo() {
		const response = await fetch(watchlistendpoint);
		if (response.status === 200) {
			return await response.json();
		} else if (response.status === 404) {
			alert('No Watchlist Found');
		} else {
			let errorMessage = await response.json();
			// console.log();
			alert('An error occurred: ' + errorMessage.message);

			throw new Error(response.statusText);
		}
	}
	async function fetchwlinfo() {
		let temp = await proxyfetchwlinfo();

		if (temp.success == false) {
			console.log('No Watchlist Found');
		} else {
			//console.log(temp);
			//console.log(watchlist);
			return temp;
		}
	}
	let anime;

	let image = 'http://localhost:5000/uploads/images/';
	async function proxyfetchanimeinfo(src) {
		const response = await fetch(src);
		if (response.status === 200) {
			return await response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
	}
	async function fetchanimeinfo() {
		watchlist = await fetchwlinfo();

		for (let i = 0; i < watchlist.watchlist_anime.length; i++) {
			let animeendpoint = 'http://localhost:5000/anime/' + watchlist.watchlist_anime[i].animeid;
			let anime = await proxyfetchanimeinfo(animeendpoint);

			if (anime.success == false) {
				console.log('No anime Found');
			} else {
				resanimes.push(anime);
				//console.log(anime);
			}
		}
		//console.log(resanimes);
		$wlanimes = resanimes;
		//console.log($wlanimes);
	}
	//fetchanimeinfo();
</script>

<div class="grid grid-cols- gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 bg-solarizedBase3 text-solarizedBase02">
	{#await fetchanimeinfo()}
		<div class="text-center"><Spinner size="10" color="red" /></div>
	{:then}
		{#each resanimes as prop, i}
			<div class="flex flex-col items-center justify-center w-full max-w-lg mx-auto bg-solarizedBase3 text-solarizedBase02">
				<a href="/wlanime/{i}">
					<img
						class="h-52 rounded-full mb-4"
						src={image + resanimes[i].animepicture[0].pictureid}
						alt="Anime Pic"
					/>
				</a>
				<h4 class="mt-2 text-xl font-medium  dark:text-red-700">
					{resanimes[i].anime.title}
				</h4>
				<h4 class="mt-2 text-lg font-medium  dark:text-red-700">
					{resanimes[i].anime.releaseseason}
				</h4>
				<h4 class="mt-2 text-lg font-medium  dark:text-red-700">
					{resanimes[i].anime.releasedate.slice(0, 4)}
				</h4>
			</div>
		{/each}
	{/await}
</div>
