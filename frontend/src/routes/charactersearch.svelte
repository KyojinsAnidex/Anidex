<script>
	import { Spinner } from 'flowbite-svelte';
	import { search } from '../stores/store';
	let animes = {
		success: false,
		resultCharacter: []
	};
	let charendpoint = 'http://localhost:5000/search/characters';
	let image = 'http://localhost:5000/uploads/images/';
	let pictures = [];
	async function proxyfetchcharinfo() {
		const response = await fetch(charendpoint, {
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
			alert('No Character Found');
		} else {
			let errorMessage = await response.json();
			// console.log();
			alert('An error occurred: ' + errorMessage.message);

			throw new Error(response.statusText);
		}
	}
	async function fetchcharinfo() {
		let temp = await proxyfetchcharinfo();

		if (temp.success == false) {
			alert('No Character Found');
		} else {
			animes = temp;
			//			console.log(animes);
			addcharpic();
		}
	}

	function addcharpic() {
		for (let i = 0; i < animes.resultCharacter.length; i++) {
			pictures[i] = image + animes.resultCharacter[i].pictureid;
		}
	}
</script>

<div
	class="grid grid-cols- gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 h-screen bg-solarizedBase3 text-solarizedBase02"
>
	{#await fetchcharinfo()}
		<div class="text-center"><Spinner size="10" color="red" /></div>
	{:then}
		{#each animes.resultCharacter as prop, i}
			<div class="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
				<a href="/characters/{prop.characterid}">
					<img class="h-52 rounded-full mb-4" src={pictures[i]} alt="Char Pic" />
				</a>
				<h4 class="mt-2 text-lg font-medium text-solarizedBase02 dark:text-red-700">
					{animes.resultCharacter[i].firstname + ' ' + animes.resultCharacter[i].lastname}
				</h4>
			</div>
		{/each}
	{/await}
</div>
