<script>
 import { Spinner,AccordionFlush,Rating } from 'flowbite-svelte';
 let animes;
 let animeinfos=[];
 let endpoint="http://localhost:5000/anime";
 let image = "http://localhost:5000/uploads/images/";

	async function proxyfetchanimeid() {
		const response = await fetch(endpoint);
		if (response.status === 200) {
			return await response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
	}
	async function fetchanimeid() {
		let temp = await proxyfetchanimeid();

		if (temp.success == false) {
			console.log('No anime Found');
		} else {
			// console.log(temp);
			return temp;
		}
	}
	async function proxyfetchanimeinfo(src) {
		const response = await fetch(src);
		if (response.status === 200) {
			return await response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
	}
	let resanimes = [];
	export async function fetchanimeinfo() {
		animes = await fetchanimeid();

		for (let i = 0; i < animes.results.length; i++) {
			let animeendpoint = 'http://localhost:5000/anime/' + animes.results[i].animeid;
			let anime = await proxyfetchanimeinfo(animeendpoint);

			if (anime.success == false) {
				console.log('No anime Found');
			} else {
				resanimes.push(anime);
				//	console.log(anime);
			}
		}
		//console.log(resanimes);
        fetchanime();
	}
    async function fetchanime()
	{   for(let i=0;i<resanimes.length;i++)  
        {
		let response;
		response = await fetch("http://localhost:5000/anime/"+resanimes[i].anime.animeid);
        let anime;
		if (response.status === 200) {
			anime = await  response.json();
            console.log(anime);
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
        animeinfos.push(anime);
    }
	
	}
</script>
<div class="grid grid-cols- gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
	{#await fetchanimeinfo()}
		<div class="text-center"><Spinner size="10" color="red" /></div>
	{:then}
		{#each resanimes as prop, i}
			<div class="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
				
					<img
						class="h-52 rounded-full mb-4"
						src={image + resanimes[i].animepicture[0].pictureid}
						alt="Anime Pic"
					/>
				<h2 class="mt-2 text-lg font-medium text-black dark:text-red-700">
					{resanimes[i].anime.title}
				</h2>
               
				<AccordionFlush >
                    
                    <h2 slot="header"> More Info </h2>
                    <div slot="body">
                    <div class="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
                        <h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
                            Release Season: {animeinfos[i].anime.releaseseason}
                        </h4>
                        <h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
                            Release Date: {animeinfos[i].anime.releasedate.slice(0, 10)}
                        </h4>
                        
                            <Rating count rating={animeinfos[i].anime.averagerating}>
                                <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400" />
                            </Rating>
        
                            <h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
                                Anime Rank: {animeinfos[i].anime.animerank}
                            </h4>
                        <h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
                            Anime Genre:
                            {#each animeinfos[i].animegenres as genre}
                                {genre.genrename + ' '}
                            {/each}
                        </h4>
                        <h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
                            Anime Studio:
                            {#each animeinfos[i].animestudio as studio}
                                {studio.studioname}
                            {/each}
                        </h4>
                        
                    </div>
                    
                   
                </div>
                
                </AccordionFlush>
	
			</div>
		{/each}
	{/await}
</div>