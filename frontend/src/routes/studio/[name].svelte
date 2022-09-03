<script context="module">
	export async function load({ params }) {
		let name = params.name;
		//  console.log(name);
		let animes = {
			success: false,
			animeOfStudio: []
		};
		let studioendpoint = 'http://localhost:5000/studios/anime/' + name;
		let endpoint = 'http://localhost:5000/anime/pictures/';
		let image = 'http://localhost:5000/uploads/images/';
		let pictures = [];
		let animeresults = [];
		async function proxystudioinfo() {
			const response = await fetch(studioendpoint);
			if (response.status === 200) {
				return await response.json();
			} else if (response.status === 404) {
				alert('No Anime Of That Studio Found');
				return await response.json();
			} else {
				console.log('An error Try Again');
				throw new Error(response.statusText);
			}
		}
		async function fetchstudioinfo() {
			let temp = await proxystudioinfo();

			if (temp.success == false) {
				console.log('No anime Found');
			} else {
				animes = temp;
				// console.log(animes);
				return animes;
			}
		}
		async function fetchanimes() {
			animes = await fetchstudioinfo();
			// console.log(animes);
			for (let i = 0; i < animes.animeOfStudio.length; i++) {
				let animeid = animes.animeOfStudio[i].animeid;
				// console.log(animeid);
				const response = await fetch('http://localhost:5000/anime/' + animeid);
				if (response.status === 200) {
					let temp = await response.json();
					console.log(temp);
					animeresults[animeresults.length] = temp.anime;
					console.log(animeresults);
				}
			}
			return animeresults;
		}
		async function proxyfetchanimepic(source) {
			const response = await fetch(source);
			if (response.status === 200) {
				return await response.json();
			} else {
				console.log('An error Try Again');
				throw new Error(response.statusText);
			}
		}

		async function fetchanimepic() {
			let animeresults = await fetchanimes();
			for (let i = 0; i < animeresults.length; i++) {
				// console.log(animeresults[i].animeid);
				let nendpoint = endpoint + animeresults[i].animeid;
				// console.log(nendpoint);

				let ntemp = await proxyfetchanimepic(nendpoint);

				if (ntemp.success == false) {
					console.log('Picture Not Found');
				} else {
					pictures[i] = image + ntemp.gallery[0].pictureid;
					console.log(ntemp);
				}
			}
			return pictures;
		}
		pictures = await fetchanimepic();
		return { props: { animeresults, pictures, name } };
	}
</script>

<script>
	export let animeresults;
	export let pictures;
	export let name;
</script>

<svelte:head>
	<title>
		{name}
	</title>
</svelte:head>

<div class=" bg-solarizedBase3 text-solarizedBase02">
	<div class="flex justify-center">
		<div class=" bg-solarizedBase3 text-solarizedBase02">
			<h4 class="mt-2 text-3xl font-medium  dark:text-red-700">
				Studio : {name}
			</h4>
		</div>
	</div>

	<div
		class="grid grid-cols- gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 bg-solarizedBase3 text-solarizedBase02"
	>
		{#each animeresults as prop, i}
			<div class="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
				<a href="/anime/{prop.animeid}">
					<img class="h-52 rounded-full mb-4" src={pictures[i]} alt="Anime Pic" />
				</a>
				<h2 class="mt-2 text-2xl text-center font-medium dark:text-red-700">
					{animeresults[i].title}
				</h2>
				<h4 class="mt-2 text-lg text-center font-medium  dark:text-red-700">
					{animeresults[i].releaseseason}
				</h4>
				<h4 class="mt-2 text-lg text-center font-medium  dark:text-red-700">
					{animeresults[i].releasedate.slice(0, 4)}
				</h4>
				<!--
         <h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
           {animes.results[i].averagerating}
         </h4>
         <h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
           {animes.results[i].animerank}
         </h4>
       <p class="text-blue-500">{animes.results[i].synopsis}</p>
       -->
			</div>
		{/each}
	</div>
</div>
