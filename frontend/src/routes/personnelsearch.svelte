<script>
	import { Spinner } from 'flowbite-svelte';
	import { state, search, perpics, persearch, pershowchoice } from '../stores/store';
	let animes = {
		success: false,
		resultPersonnel: []
	};
	let perendpoint = 'http://localhost:5000/search/personnel';
	let image = 'http://localhost:5000/uploads/images/';
	let pictures = [];
	async function proxyfetchperinfo() {
		const response = await fetch(perendpoint, {
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
			alert('No Personnel Found');
		} else {
			let errorMessage = await response.json();
			// console.log();
			alert('An error occurred: ' + errorMessage.message);

			throw new Error(response.statusText);
		}
	}
	async function fetchperinfo() {
		let temp = await proxyfetchperinfo();

		if (temp.success == false) {
			alert('No Personnel Found');
		} else {
			animes = temp;
			//			console.log(animes);
			addperpic();
			$perpics = pictures;
			$persearch = animes;
			$pershowchoice = 0;
		}
	}

	function addperpic() {
		for (let i = 0; i < animes.resultPersonnel.length; i++) {
			pictures[i] = image + animes.resultPersonnel[i].pictureid;
		}
	}
</script>

<div
	class="grid grid-cols- gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 bg-solarizedBase3 text-solarizedBase02"
>
	{#await fetchperinfo()}
		<div class="text-center"><Spinner size="10" color="red" /></div>
	{:then}
		{#each animes.resultPersonnel as prop, i}
			<div class="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
				<a href="/personnel/{i}">
					<img class="h-52 rounded-full mb-4" src={pictures[i]} alt="Char Pic" />
				</a>
				<h4 class="mt-2 text-lg font-medium  dark:text-red-700">
					{animes.resultPersonnel[i].firstname + ' ' + animes.resultPersonnel[i].lastname}
				</h4>
			</div>
		{/each}
	{/await}
</div>
