<script context="module">
	export async function load({ params }) {
		let id = params.id;
		return { props: { id } };
	}
</script>

<script>
	export let id;
	import { studioresanimes, studiorespics,state,curruser } from '../../stores/store';
	import { Range, Label, Radio,AccordionFlush,Rating } from 'flowbite-svelte';

	let anime = $studioresanimes[id];
	let picture = $studiorespics[id];
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
		
		if(rating!=0)
		{
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
	}
	else
	{
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
				// etc.
			})
		});


	}
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
			
				<Rating count rating={anime.averagerating}  >
					<span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400" />
					<a
						href="/"
						class="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
						>69 reviews</a
					>
				</Rating>
			
			<h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
				Anime Rank: {anime.animerank}
			</h4>
			
		</div>
	</div>
	<div class="h-screen w-1/2">
		<div class="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
			<AccordionFlush id="1" >
				<h2 slot="header">Synopsis</h2>
				<div slot="body">
				  <p class=" text-center ">{anime.synopsis}</p>
				</div>
			  </AccordionFlush>
			{#if $state == 1}
			<AccordionFlush id="2" >
				<h2 slot="header">Add to watchlist</h2>
				<div slot="body">
							<Radio bind:group={favourite} value="true">Favourite</Radio>
				  <Radio bind:group={favourite} value="false">Not Favourite</Radio>
							<button
								on:click={rate}
								class="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-green-600 active:bg-red-600 hover:bg-red-700"
								>Submit</button
							>
				</div>
			  </AccordionFlush>	
			
      <AccordionFlush id="3" >
        <h2 slot="header">Rate and Add To Watchlist</h2>
        <div slot="body">
					<Radio bind:group={favourite} value="true">Favourite</Radio>
          <Radio bind:group={favourite} value="false">Not Favourite</Radio>
					<Range min="0" max="10" bind:value={rating} step="1" />
					<p>Rating: {rating}</p>
					<button
						on:click={rate}
						class="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-green-600 active:bg-red-600 hover:bg-red-700"
						>Submit</button
					>
        </div>
      </AccordionFlush>		
			{/if}
		</div>
	</div>
</div>