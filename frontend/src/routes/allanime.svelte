<script>
	import { Spinner } from 'flowbite-svelte';

	let animes;
	let endpoint = 'http://localhost:5000/anime';
	let image = 'http://localhost:5000/uploads/images/';

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
	export async function fetchanimeinfo() {
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
		
	}
</script>
<svelte:head>
	<title>All anime</title>
</svelte:head>

<div class="grid grid-cols- gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 bg-solarizedBase3 text-solarizedBase02">
	{#await fetchanimeinfo()}
		<div class="text-center"><Spinner size="10" color="red" /></div>
	{:then}
		{#each resanimes as prop, i}
			<div class="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
				<a href="/anime/{prop.anime.animeid}">
					<img
						class="h-52 rounded-full mb-4"
						src={image + resanimes[i].animepicture[0].pictureid}
						alt="Anime Pic"
					/>
				</a>
				<h2 class="mt-2 text-lg font-medium text-black dark:text-red-700">
					{resanimes[i].anime.title}
				</h2>
			</div>
		{/each}
	{/await}
</div>
