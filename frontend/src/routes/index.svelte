<svelte:head>
   <title> Anidex Home Page </title>
</svelte:head>
<script>
   import {state,allanimes} from "../stores/store";
   let animes;
 let endpoint="http://localhost:5000/anime";
 let image = "http://localhost:5000/uploads/images/";
 async function proxyfetchanimeid()
 {
   const response = await fetch(endpoint);
   if(response.status === 200 )
   {
      return await response.json();
   }
   else
   {
     console.log("An error Try Again");
     throw new Error(response.statusText);
         
   }
 }
 async function fetchanimeid() {
   
       let temp = await proxyfetchanimeid();

       if (temp.success == false) {
         console.log("No anime Found");
       } else {
        console.log(temp);
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
  let resanimes=[];
	async function fetchanimeinfo() {
		animes= await fetchanimeid();

		for (let i = 0; i < animes.results.length; i++) {
			let animeendpoint = 'http://localhost:5000/anime/' + animes.results[i].animeid;
			let anime = await proxyfetchanimeinfo(animeendpoint);

			if (anime.success == false) {
				console.log('No anime Found');
			} else {
				resanimes.push(anime);
				console.log(anime);
			}
		}
		console.log(resanimes);
		$allanimes = resanimes;
		console.log($allanimes);
	}
</script>
<div class="grid grid-cols- gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
	{#await fetchanimeinfo() then}
		{#each resanimes as prop, i}
			<div class="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
				<a href="/animes/{i}">
					<img
						class="h-52 rounded-full mb-4"
						src={image + resanimes[i].animepicture[0].pictureid}
						alt="Anime Pic"
					/>
				</a>
				<h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
					{resanimes[i].anime.title}
				</h4>
				<h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
					{resanimes[i].anime.releaseseason}
				</h4>
				<h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
					{resanimes[i].anime.releasedate.slice(0, 4)}
				</h4>
	
			</div>
		{/each}
	{/await}
</div>