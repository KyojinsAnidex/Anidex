<script context="module">
	export async function load({ params }) {
		let id = params.id;
		return { props: { id } };
	}
</script>

<script>
	export let id;
	import { topanimes } from '../../stores/store';
	let anime = $topanimes[id].anime;
	let picture = 'http://localhost:5000/uploads/images/' + $topanimes[id].animepicture[0].pictureid;
	//   console.log(anime);
	//  console.log(picture);
</script>

<svelte:head>
	<title>{anime.title}</title>
</svelte:head>

<div class="flex flex-col items-center justify-center w-full max-w-lg mx-auto my-auto">
	<img class="h-52 rounded-full mb-4" src={picture} alt="Anime Pic" />
	<h2 class="mt-2 text-lg text-center font-medium text-black dark:text-red-700">
		{anime.title}
	</h2>
	<h4 class="mt-2 text-lg text-center font-medium text-gray-700 dark:text-red-700">
		Year: {anime.releasedate.slice(0, 4)}
	</h4>
	<h4 class="mt-2 text-lg text-center font-medium text-gray-700 dark:text-red-700">
		Season: {anime.releaseseason}
	</h4>
	<h4 class="mt-2 text-lg text-center font-medium text-gray-700 dark:text-red-700">
		Average Rating: {anime.averagerating}
	</h4>
	<h4 class="mt-2 text-lg text-center font-medium text-gray-700 dark:text-red-700">
		Anime Rank: {anime.animerank}
	</h4>
	<h4 class="mt-2 text-lg text-center font-medium text-gray-700 dark:text-red-700">
		Genre:
		{#each $topanimes[id].animegenres as genre}
			{genre.genrename + ', '}
		{/each}
	</h4>
	<h4 class="mt-2 text-lg text-center font-medium text-gray-700 dark:text-red-700">
		Studio:
		{#each $topanimes[id].animestudio as studio}
			{studio.studioname}
		{/each}
	</h4>
	<p class="text-black text-center ">{anime.synopsis}</p>
</div>
