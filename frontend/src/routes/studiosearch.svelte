<script>
	import { Spinner } from 'flowbite-svelte';
	import { search } from '../stores/store';
	let animes = {
		success: false,
		resultStudio: []
	};
	let studendpoint = 'http://localhost:5000/search/studio';
	async function proxyfetchstudioinfo() {
		const response = await fetch(studendpoint, {
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
			alert('No Studio Found');
		} else {
			let errorMessage = await response.json();
			// console.log();
			alert('An error occurred: ' + errorMessage.message);

			throw new Error(response.statusText);
		}
	}
	async function fetchstudioinfo() {
		let temp = await proxyfetchstudioinfo();

		if (temp.success == false) {
			alert('No Character Found');
		} else {
			animes = temp;
		
			
		}
	}
	
</script>

<div class="felx justify-center bg-solarizedBase3 text-solarizedBase02">
	<div class="grid grid-cols- gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
		{#await fetchstudioinfo()}
			<div class="text-center"><Spinner size="10" color="red" /></div>
		{:then}
			{#each animes.resultStudio as prop, i}
				<div class="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
					<h2 class="mt-2 text-2xl font-bold text-center   dark:text-red-700">
						{animes.resultStudio[i].studioname}
					</h2>
					<h4 class="mt-2 text-lg font-medium text-center  dark:text-red-700">
						Founded In {animes.resultStudio[i].foundingdate.slice(0, 4)}
					</h4>
					<h4 class="mt-2 text-lg font-medium text-center  dark:text-red-700">
						Office Address: {animes.resultStudio[i].office_address}
					</h4>
					<a href={'http://' + animes.resultStudio[i].website}>
						<h4 class="mt-2 text-lg text-center font-medium text-solarizedBlue dark:text-red-700">
							Website
						</h4>
					</a>
					<a
						class="mt-2 text-lg text-center font-medium text-gray-700 dark:text-red-700"
						href="/studio/{animes.resultStudio[i].studioname}"
					>
						<button
						
							class="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-green-600 active:bg-red-600 hover:bg-red-700"
							>Show Produced Animes</button
						></a
					>
				</div>
			{/each}
		{/await}
	</div>
</div>
