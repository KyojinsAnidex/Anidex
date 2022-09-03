<script>
	import { Spinner } from 'flowbite-svelte';

	import { search } from '../stores/store';
	let animes = {
		success: false,
		resultUser: []
	};
	let userendpoint = 'http://localhost:5000/search/users';
	let image = 'http://localhost:5000/uploads/images/';
	async function proxyfetchuserinfo() {
		const response = await fetch(userendpoint, {
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
			alert('No user found.');
			throw new Error(response.statusText);
		} else {
			let errorMessage = await response.json();
			// console.log();
			alert('An error occurred: ' + errorMessage.message);

			throw new Error(response.statusText);
		}
	}
	async function fetchuserinfo() {
		let temp = await proxyfetchuserinfo();
		if (temp.success == false) {
			alert('No User Found');
		} else {
			animes = temp;
			image = image + animes.resultUser[0].pictureid;
		}
	}
</script>
<svelte:head>
	<title>User search</title>
</svelte:head>

{#await fetchuserinfo()}
	<div class="text-center"><Spinner size="10" color="red" /></div>
{:then}
	<div class="container min-w-full bg-solarizedBase3 text-solarizedBase02">
		<div class="grid grid-cols-1 md:grid-cols-2">
			<div class="mt-10">
				<div class="flex justify-center">
					<img class="h-52 rounded-full mb-4" src={image} alt="person pic" />
				</div>
				<div class="animate-fade-in-down mb-1 text-center text-xl">
					{animes.resultUser[0].userid}
				</div>
				<div class="animate-fade-in-down mb-1 text-center text-lg ">
					{animes.resultUser[0].email}
				</div>
				<blockquote>
					<p class="animate-fade-in-down mx-12 mb-9 text-center text-sm">
						{animes.resultUser[0].biography}
					</p>
				</blockquote>
				<div class="flex justify-center">
					<a href="/userwatchlist/{animes.resultUser[0].userid}">
						<button
							class="px-5 inline py-3 text-lg font-medium leading-5 shadow-2xl transition-all duration-400 border border-transparent rounded-2xl focus:outline-none text-solarizedBase3 bg-green-600 active:bg-red-600 hover:bg-red-700"
							>Show Watchlist</button
						>
					</a>
				</div>
			</div>
		</div>
	</div>
{/await}
