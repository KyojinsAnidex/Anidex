<script context="module">
	export async function load({ params }) {
		let id = params.id;
		return { props: { id } };
	}
</script>

<script>
	export let id;
	import {
		topanimes,
		curruser,
		state,
		eps,
		epanime,
		allan,
		anshowchoice
	} from '../../stores/store';
	import { Range, Label, Radio, AccordionFlush, Rating } from 'flowbite-svelte';
	let anime;
	let picture;
	if ($anshowchoice == 0) {
		anime = $topanimes[id].anime;
		picture = 'http://localhost:5000/uploads/images/' + $topanimes[id].animepicture[0].pictureid;
	} else {
		anime = $allan[id].anime;
		picture = 'http://localhost:5000/uploads/images/' + $allan[id].animepicture[0].pictureid;
	}
	//   console.log(anime);
	//  console.log(picture);
	let giverating = false;
	let rating = 0;
	let favourite = false;

	let endpoint = 'http://localhost:5000/watchlist/' + $curruser.name;
	console.log($curruser);
	async function proxyrate() {
		let response;

		if (giverating == true) {
			response = await fetch(endpoint, {
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
		} else {
			response = await fetch(endpoint, {
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
					favourite: favourite
					// etc.
				})
			});
		}
		if (response.status === 201) {
			return await response.json();
		} else {
			let errorMessage = await response.json();
			// console.log();
			alert('An error occurred: ' + errorMessage.message);

			throw new Error(response.statusText);
		}
	}
	async function rate() {
		let temp = await proxyrate();

		if (temp.success == false) {
			alert('Could not Add');
		} else {
			console.log(temp);
			refresh();
		}
	}
	function checkrate() {
		giverating = !giverating;
	}
	let ependpoint = 'http://localhost:5000/episodes/' + anime.animeid;
	$eps = [];
	$epanime = -1;
	async function proxyfetchepisodes() {
		const response = await fetch(ependpoint);
		if (response.status === 200) {
			return await response.json();
		} else if (response.status === 404) {
			return await response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
	}
	async function fetchepisodes() {
		let temp = await proxyfetchepisodes();

		if (temp.success == false) {
			console.log('No episodes Found');
		} else {
			console.log(temp);
			$eps = temp;
		}
		$epanime = anime.animeid;
	}
	let refanime;
	async function refresh() {
		let response;
		let endpoint = 'http://localhost:5000/anime/' + $topanimes[id].anime.animeid;
		response = await fetch(endpoint);
		if (response.status === 200) {
			refanime = await response.json();
			fetchrating();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
	}
	let rateendpoint='http://localhost:5000/animerating/anime/'+$curruser.name;
	let userrating;
	async function proxyfetchrating() {
		const response = await fetch(rateendpoint, {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + $curruser.token,
				'Content-Type': 'application/json'
				// like application/json or text/xml
			},
			body: JSON.stringify({
				// Example: Update JSON file with
				//          local data properties
				animeid:anime.animeid 
				// etc.
			})
		});
		if (response.status === 200) {
			return await response.json();
		} else if (response.status === 404) {
			return await response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
	}
	async function fetchrating() {
		let temp = await proxyfetchrating();

		if (temp.success == false) {
			console.log('No Rating Found');
		} else {
			console.log(temp);
			userrating=temp.rating;
		}
	
	}
	console.log(userrating);
</script>

<svelte:head>
	<title>{anime.title}</title>
</svelte:head>

<div class="relative flex h-full w-full bg-solarizedBase3 text-solarizedBase02">
	<div class="h-full w-1/2">
		<div class="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
			<img class="h-52 rounded-full mb-4" src={picture} alt="Anime Pic" />
			<h4 class="mt-2 text-3xl font-medium  dark:text-red-700">
				{anime.title}
			</h4>
			<h4 class="mt-2 text-lg font-medium  dark:text-red-700">
				{anime.releasedate.slice(0, 4)}
			</h4>
			<h4 class="mt-2 text-lg font-medium  dark:text-red-700">
				{anime.releaseseason}
			</h4>
			{#await refresh() then}
				<Rating count rating={refanime.anime.averagerating}>
					<span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400" />
					<a
						href="../reviewanime/{refanime.anime.animeid}"
						class="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
						>Reviews</a
					>
				</Rating>

				<h4 class="mt-2 text-lg font-medium  dark:text-red-700">
					Rank: {refanime.anime.animerank}
				</h4>
			{/await}
			<h4 class="mt-2 text-lg font-medium  dark:text-red-700">
				Genre:
				{#each $topanimes[id].animegenres as genre}
					{genre.genrename + ' | '}
				{/each}
			</h4>
			<h4 class="mt-2 text-lg font-medium  dark:text-red-700">
				Studio:
				{#each $topanimes[id].animestudio as studio}
					{studio.studioname + ' | '}
				{/each}
			</h4>
		</div>
	</div>
	<div class="h-full w-1/2">
		<div class="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
			<AccordionFlush id="1">
				<h2 slot="header" class="text-lg">Synopsis</h2>
				<div slot="body">
					<p class=" text-center ">{anime.synopsis}</p>
					<div class="flex justify-center p-2">
						<a href="/episodes">
							<button
								on:click={fetchepisodes()}
								class="px-5 inline py-2 text-lg font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-2xl focus:outline-none bg-green-600 active:bg-red-600 hover:bg-red-700"
								>Episodes</button
							>
						</a>
					</div>
				</div>
			</AccordionFlush>
			{#if $state == 1}
				<AccordionFlush id="2">
					<h2 slot="header" class="text-lg font-medium">Add To Watchlist</h2>
					<div slot="body">
						{#if userrating!=0}
						<p>Previous Rating: {userrating}</p>
						{:else}
						<p>User Has Not Rated This Anime Yet</p>
						{/if}
						<Radio bind:group={favourite} value="true">Favourite</Radio>
						<Radio bind:group={favourite} value="false">Not Favourite</Radio>
						{#if giverating == false}
							<br />
							<button
								on:click={checkrate}
								class="px-5 inline py-3 text-lg font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-2xl focus:outline-none bg-green-600 active:bg-red-600 hover:bg-red-700"
								>Rate</button
							>
						{/if}
						{#if giverating == true}
							<br />
							<p>Rating Bar:</p>
							<Range min="0" max="10" bind:value={rating} step="1" />
							<br />
							<p>Rating : {rating}</p>
						{/if}
						<button
							on:click={rate}
							class="px-5 inline py-3 text-lg font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-2xl focus:outline-none bg-green-600 active:bg-red-600 hover:bg-red-700"
							>Submit</button
						>
					</div>
				</AccordionFlush>
			{/if}
		</div>
	</div>
</div>
