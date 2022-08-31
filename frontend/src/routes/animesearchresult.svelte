<script>
	import { Spinner } from 'flowbite-svelte';
	import { state, animesearch, animepics, search } from '../stores/store';
	let animes = {
		success: false,
		resultAnime: []
	};
	let animeendpoint = 'http://localhost:5000/search/anime';
	let picendpoint = 'http://localhost:5000/anime/pictures/';
	let image = 'http://localhost:5000/uploads/images/';
	let pictures = [];
	async function proxyfetchanimeinfo() {
		const response = await fetch(animeendpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
				// like application/json or text/xml
			},
			body: JSON.stringify({
				// Example: Update JSON file with
				//          local data properties
				searchString: $search.txt
				// etc.
			})
		});
		if (response.status === 200) {
			return await response.json();
		} else if (response.status === 404) {
			alert('No anime Found');
		} else {
			let errorMessage = await response.json();
			// console.log();
			alert('An error occurred: ' + errorMessage.message);

			throw new Error(response.statusText);
		}
	}
	async function fetchanimeinfo() {
		let temp = await proxyfetchanimeinfo();

		if (temp.success == false) {
			alert('No anime Found');
		} else {
			animes = temp;
			//  console.log(animes);
			fetchanimepic();
			$animesearch = animes;
		}
	}
	async function proxyfetchanimepic(source) {
		const response = await fetch(source);
		if (response.status === 200) {
			return await response.json();
		}else {
			let errorMessage = await response.json();
			// console.log();
			alert('An error occurred: ' + errorMessage.message);

			throw new Error(response.statusText);
		}
	}

	async function fetchanimepic() {
		for (let i = 0; i < animes.resultAnime.length; i++) {
			let nendpoint = picendpoint + animes.resultAnime[i].animeid;

			let ntemp = await proxyfetchanimepic(nendpoint);

			if (ntemp.success == false) {
				alert('Picture Not Found');
			} else {
				pictures[i] = image + ntemp.gallery[0].pictureid;
				//  console.log(ntemp);
			}
		}
		$animepics = pictures;
	}
</script>

<div class="grid grid-cols- gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 h-screen bg-solarizedBase3 text-solarizedBase02">
	{#await fetchanimeinfo()}
		<div class="text-center"><Spinner size="10" color="red" /></div>
	{:then}
		{#each animes.resultAnime as prop, i}
			<div class="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
				<a href="/resanime/{i}">
					<img class="h-52 rounded-full mb-4" src={pictures[i]} alt="Anime Pic" />
				</a>
				<h4 class="mt-2 text-lg font-medium text-solarizedBase02 dark:text-red-700">
					{animes.resultAnime[i].title}
				</h4>
			</div>
		{/each}
	{/await}
</div>
