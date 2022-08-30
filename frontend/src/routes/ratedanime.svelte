<script>
	import { state, topanimes,anshowchoice } from '../stores/store';
	import { Spinner,Rating } from 'flowbite-svelte';
	let animes;
	let endpoint = 'http://localhost:5000/anime';
	let image = 'http://localhost:5000/uploads/images/';
	let search=6;
	async function proxyfetchanimeid() {
		const response = await fetch(endpoint);
		if (response.status === 200) {
			return await response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
	}
	async function fetchanimeid() {
		let temp = await proxyfetchanimeid();

		if (temp.success == false) {
			console.log('No anime Found');
		} else {
			// console.log(temp);
			return temp;
		}
	}
	async function proxyfetchanimeinfo(src) {
		const response = await fetch(src);
		if (response.status === 200) {
			return await response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
	}
	let resanimes = [];
	async function fetchanimeinfo() {
		animes = await fetchanimeid();

		for (let i = 0; i < animes.results.length; i++) {
			let animeendpoint = 'http://localhost:5000/anime/' + animes.results[i].animeid;
			let anime = await proxyfetchanimeinfo(animeendpoint);

			if (anime.success == false) {
				console.log('No anime Found');
			} else {
				resanimes.push(anime);
				//	console.log(anime);
			}
		}
		//console.log(resanimes);
		$topanimes = resanimes;
		$anshowchoice=0;
		//console.log($allanimes);
	}
	function showmore()
	{
		search=search*2;
	}
</script>

<svelte:head>
	<title>Top Rated Anime</title>
</svelte:head>
<div class="grid grid-cols- gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
	{#await fetchanimeinfo()}
		<div class="text-center"><Spinner size="10" color="red" /></div>
	{:then}
		{#each resanimes as prop, i}
			{#if i <= search}
				<div class="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
					<a href="/ranimes/{i}">
						<img
							class="h-52 rounded-full mb-4"
							src={image + resanimes[i].animepicture[0].pictureid}
							alt="Anime Pic"
						/>
					</a>
					<h2 class="mt-2 text-lg font-medium text-black dark:text-red-700">
						{resanimes[i].anime.title}
					</h2>
					<h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
						{resanimes[i].anime.releaseseason}
					</h4>
					<h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
						{resanimes[i].anime.releasedate.slice(0, 4)}
					</h4>
					<Rating count rating={resanimes[i].anime.averagerating}  >
						<span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400" />
					</Rating>
				</div>
			{/if}
		{/each}
		{#if resanimes.length>search}
		<button
				on:click={showmore}
				class="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-slate-600 active:bg-red-600 hover:bg-red-700"
				>Show More</button
			>
			{/if}
		
	{/await}
</div>

