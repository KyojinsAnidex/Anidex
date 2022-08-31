<script context="module">
	export async function load({ url }) {
		let studios;
		let response;
		response = await fetch('http://localhost:5000/studios');
		if (response.status === 200) {
			studios = await response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
		return { props: { studios } };
	}
</script>
<script>
    export let studios;
    console.log(studios);
</script>
<svelte:head>
	<title>All Studio</title>
</svelte:head>
<div class="felx justify-center bg-solarizedBase3 text-solarizedBase02">
	<div class="grid grid-cols- gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
			
			{#each studios.results as prop, i}
				<div class="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
					<h2 class="mt-2 text-2xl font-bold text-center   dark:text-red-700">
						{prop.studioname}
					</h2>
					<h4 class="mt-2 text-lg font-medium text-center  dark:text-red-700">
						Founded In {prop.foundingdate.slice(0, 4)}
					</h4>
					<h4 class="mt-2 text-lg font-medium text-center  dark:text-red-700">
						Office Address: {prop.office_address}
					</h4>
					<a href={'http://' + prop.website}>
						<h4 class="mt-2 text-lg text-center font-medium text-solarizedBlue dark:text-red-700">
							Website
						</h4>
					</a>
					<a
						class="mt-2 text-lg text-center font-medium text-gray-700 dark:text-red-700"
						href="/studio/{prop.studioname}"
					>
						<button
							class="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-green-600 active:bg-red-600 hover:bg-red-700"
							>Show Produced Animes</button
						></a
					>
				</div>
			{/each}
	
	</div>
</div>
