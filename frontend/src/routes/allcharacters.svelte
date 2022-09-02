<script context="module">
	export async function load({ url }) {
		let characters;
		let response;
		response = await fetch('http://localhost:5000/characters');
		if (response.status === 200) {
			characters = await response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
		return { props: { characters } };
	}
</script>

<script>
	export let characters;
</script>
<svelte:head>
	<title>All Characters</title>
</svelte:head>
<div class="grid grid-cols- gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 bg-solarizedBase3 text-solarizedBase02">
	{#each characters.results as char, i}
		<div class="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
			<a href="/characters/{char.characterid}">
				<img
					class="h-52 rounded-full mb-4"
					src={'http://localhost:5000/uploads/images/' + char.pictureid}
					alt="Char Pic"
				/>
			</a>
			<h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
				{char.firstname + ' ' + char.lastname}
			</h4>
		</div>
	{/each}
</div>
