<script context="module">
	export async function load({ url }) {
		let personnels;
		let response;
		response = await fetch('http://localhost:5000/personnel');
		if (response.status === 200) {
			personnels = await response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
		return { props: { personnels } };
	}
</script>

<script>
	export let personnels;
</script>

<svelte:head>
	<title>All Personnel</title>
</svelte:head>

<div
	class="grid grid-cols- gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6  text-solarizedBase02 bg-solarizedBase3"
>
	{#each personnels.personnels as per, i}
		<div class="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
			<a href="/personnel/{per.personnelid}">
				<img
					class="h-52 rounded-full mb-4"
					src={'http://localhost:5000/uploads/images/' + per.pictureid}
					alt="Char Pic"
				/>
			</a>
			<h4 class="mt-2 text-lg font-medium  dark:text-red-700">
				{per.firstname + ' ' + per.lastname}
			</h4>
		</div>
	{/each}
</div>
