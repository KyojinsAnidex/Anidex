<script context="module">
	export async function load({ params }) {
		let id = params.id;
		return { props: { id } };
	}
</script>
<script>
  export let id;
  import { allanimes,animeofinterest, state } from "../../stores/store";
  let anime= $allanimes[id].anime;
  let picture="http://localhost:5000/uploads/images/"+$allanimes[id].animepicture[0].pictureid;
//   console.log(anime);
//  console.log(picture);
function addtowatchlist()
{
$animeofinterest[0]=anime;
$animeofinterest[1]=picture;
}
</script>

<svelte:head>
	<title>{anime.title}</title>
</svelte:head>

<div
     class="flex flex-col items-center justify-center w-full max-w-lg mx-auto my-auto"
   >
     <img
       class="h-52 rounded-full mb-4"
       src={picture}
       alt="Anime Pic"
     />
     <h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
       Tittle: {anime.title}
     </h4>
     <h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
         Release Season: {anime.releaseseason}
       </h4>
       <h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
         Release Date: {anime.releasedate.slice(0, 10)}
       </h4>
       <h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
         Average Rating: {anime.averagerating}
       </h4>
       <h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
        Anime Rank: {anime.animerank}
       </h4>
       <h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
          Anime Genre: 
          {#each $allanimes[id].animegenres as genre}
          {genre.genrename} , 
          {/each}
         </h4>
         <h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
          Anime Studio: 
          {#each $allanimes[id].animestudio as studio}
          {studio.studioname}
          {/each}
         </h4>
     <p class="text-blue-500 text-center ">{anime.synopsis}</p>
     {#if $state==1}
     <a href="/addwatchlist">
     <button
				on:click={addtowatchlist}
				class="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-green-600 active:bg-red-600 hover:bg-red-700"
				>Add To Watchlist</button
			>
    </a>
      {/if}
     

     </div>
  