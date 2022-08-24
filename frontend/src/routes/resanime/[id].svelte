<script context="module">
	export async function load({ params }) {
		let id = params.id;
		return { props: { id } };
	}
</script>

<script>
	export let id;
	import { animesearch, animepics,state,curruser } from '../../stores/store';
	import { Range, Label, Radio } from 'flowbite-svelte';

	let anime = $animesearch.resultAnime[id];
	let picture = $animepics[id];
	//  console.log(anime);
	// console.log(picture);
	let addlist = false;
	let rating = 0;
	let favourite = false;
	function addtowatchlist() {
		addlist = true;
	}
	let endpoint = 'http://localhost:5000/watchlist/' + $curruser.name;
	console.log($curruser);
	async function proxyrate() {
		const response = await fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + $curruser.token
				// like application/json or text/xml
			},
			body: JSON.stringify({
				// Example: Update JSON file with
				//          local data properties
				animeid: anime.animeid,
				favourite: favourite,
				rating: rating
				// etc.
			})
		});
		if (response.status === 201) {
			return await response.json();
		} else {
			alert('An error Try Again');
			throw new Error(response.statusText);
		}
	}

	async function rate() {
		let temp = await proxyrate();

		if (temp.success == false) {
			alert('Could not Add');
		} else {
			console.log(temp);
		}
	}
</script>

<svelte:head>
	<title>{anime.title}</title>
</svelte:head>
<div class="relative flex h-full w-full">
	<div class="h-screen w-1/2">
		<div class="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
			<img class="h-52 rounded-full mb-4" src={picture} alt="Anime Pic" />
			<h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
				Tittle: {anime.title}
			</h4>
			<h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
				Release Season: {anime.releaseseason}
			</h4>
			<h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
				Release Date: {anime.releasedate.slice(0, 10)}
			</h4>
			<h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
				Average Rating: {anime.averagerating}
			</h4>
			<h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
				Anime Rank: {anime.animerank}
			</h4>
		</div>
	</div>
	<div class="h-screen w-1/2">
		<div class="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
			<p class="text-blue-500 text-center ">Synopsis: {anime.synopsis}</p>
			{#if $state == 1}
				{#if addlist == false}
					<button
						on:click={addtowatchlist}
						class="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-green-600 active:bg-red-600 hover:bg-red-700"
						>Add To Watchlist</button
					>
				{:else}
  
					<Label>Rate the Folowing:</Label>
					<Radio bind:group={favourite} value="true">Favourite</Radio>
          <Radio bind:group={favourite} value="false">Not Favourite</Radio>
					<Range min="0" max="10" bind:value={rating} step="1" />
					<p>Rating: {rating}</p>
					<button
						on:click={rate}
						class="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-green-600 active:bg-red-600 hover:bg-red-700"
						>Submit</button
					>
      	{/if}
			{/if}
		</div>
	</div>
</div>
