<script>
	import { state, search,studiosearch } from '../stores/store';
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
		} else {
			alert('An error Try Again');
			throw new Error(response.statusText);
		}
	}
	async function fetchstudioinfo() {
		let temp = await proxyfetchstudioinfo();

		if (temp.success == false) {
			alert('No Character Found');
		} else {
			animes = temp;
            $studiosearch=animes;
		}

	}
</script>

<div class="grid grid-cols- gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
	{#await fetchstudioinfo() then}
		{#each animes.resultStudio as prop, i}
			<div class="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
				<h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
					Studio Name: {animes.resultStudio[i].studioname}
				</h4>
                <h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
					Founding Date: {animes.resultStudio[i].foundingdate.slice(0, 10)}
				</h4>
                <h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
					Office Address: {animes.resultStudio[i].office_address}
				</h4>
                <a href={"http://"+animes.resultStudio[i].website}>
                <h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
					Website : {animes.resultStudio[i].website}
				</h4>
            </a>
            <a class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700" href="/studio/{animes.resultStudio[i].studioname}">Produced Animes</a>
			</div>
		{/each}
	{/await}
</div>
