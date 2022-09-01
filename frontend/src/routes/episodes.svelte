<script>
	import { eps, state, epanime, curruser,animeofinterest } from '../stores/store';
	import { Rating, Range, AccordionFlush } from 'flowbite-svelte';
	//console.log($eps);
	//console.log($epanime);
	let rating = 0;
	let endpoint = 'http://localhost:5000/episoderating/' + $curruser.name;
	console.log($curruser);
	async function proxyrate(epid) {
		let response;

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
				episodeid: epid,
				rating: rating
				// etc.
			})
		});
		if (response.status === 201) {
			return await response.json();
		} else {
			let errorMessage = await response.json();
			// console.log();
			alert('An error occurred: ' + errorMessage.message);

			throw new Error(response.statusText);
		}
	}
	async function rate(epid) {
		let temp = await proxyrate(epid);

		if (temp.success == false) {
			alert('Could not Rate');
		} else {
			console.log(temp);
			rating = 0;
			fetchepisodes();
		}
	}
	let ependpoint = 'http://localhost:5000/episodes/' + $epanime;
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
	}
	let anime=$animeofinterest[0];
</script>
<div class= "flex justify-center bg-solarizedBase3 text-solarizedBase02">
<div class=" bg-solarizedBase3 text-solarizedBase02">
	<h4 class="mt-2 text-3xl font-medium  dark:text-red-700">
		{anime.title}
	</h4>
	<h4 class="mt-2 text-lg font-medium  dark:text-red-700">
		Release Date: {anime.releasedate.slice(0, 4)}
	</h4>
	<h4 class="mt-2 text-lg font-medium  dark:text-red-700">
		Relese Season: {anime.releaseseason}
	</h4>
</div>
</div>

{#if $eps.length != 0}
	<div class="flex justify-center bg-solarizedBase3 text-solarizedBase02">
		<table class="table-auto border-separate" cellpadding="20"cellspacing="20">
			<tr>
				<th>Title </th>
				<th>Season </th>
				<th>Episode </th>
				<th>Runtime</th>
				<th>Rating</th>
				{#if $state == 1}
					<th>Rate</th>
				{/if}
			</tr>
			{#each $eps.episodes as prop, i}
				<tr>
					<td>{prop.title} </td>
					<td>{prop.season} </td>
					<td>{prop.episode} </td>
					<td>{prop.runtime.minutes}:{prop.runtime.second ? prop.runtime.second : '00'}</td>
					<td><Rating count rating={prop.episoderating} /></td>

					{#if $state == 1}
						<td>
							<AccordionFlush id="1">
								<h2 slot="header">Give Rating</h2>
								<div slot="body">
									<Range min="0" max="10" bind:value={rating} step="1" />
									<br />
									<p>Rating : {rating}</p>

									<button
										on:click={rate(prop.episodeid)}
										class="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-green-600 active:bg-red-600 hover:bg-red-700"
										>Rate</button
									>
								</div>
							</AccordionFlush>
						</td>
					{/if}
				</tr>
			{/each}
		</table>
	</div>
{:else}
	<h4 class="mt-2 text-lg font-medium bg-solarizedBase3 text-solarizedBase02 dark:text-red-700">
		The anime does not have any Episodes Added yet
	</h4>
{/if}
<br class="bg-solarizedBase3 text-solarizedBase02" />
{#if $state == 1}
	<div class="flex justify-center bg-solarizedBase3 text-solarizedBase02">
		<a href="/addepisode">
			<button
			
				class="px-5 inline py-3 text-lg font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-2xl focus:outline-none bg-green-600 active:bg-red-600 hover:bg-red-700"
				>Add Episodes</button
			>
		</a>
	</div>
{/if}
