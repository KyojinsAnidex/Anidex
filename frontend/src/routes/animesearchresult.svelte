<script>
	import { Spinner } from 'flowbite-svelte';
    import {state,animesearch,animepics,search,searchdest} from "../stores/store";
  let animes = {
    success: false,
    resultAnime: [],
  };
  let animeendpoint="http://localhost:5000/search/anime";
  let picendpoint = "http://localhost:5000/anime/pictures/";
  let image = "http://localhost:5000/uploads/images/";
  let pictures = [];
  async function proxyfetchanimeinfo()
  {
    const response = await fetch(animeendpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // like application/json or text/xml
      },
      body: JSON.stringify({
        // Example: Update JSON file with
        //          local data properties
        searchString:$search.txt
        // etc.
      }),
    });
    if(response.status === 200 )
    {
       return await response.json();
    }
    else
    {
      alert("An error Try Again");
      throw new Error(response.statusText);  
    }
  }
  async function fetchanimeinfo() {
    
        let temp = await proxyfetchanimeinfo();

        if (temp.success == false) {
          alert("No anime Found");
        } else {
          animes = temp;
        //  console.log(animes);
          fetchanimepic();
          $animesearch=animes;         
        }
      }
      async function proxyfetchanimepic(source)
      {
         const response = await fetch(source);
         if(response.status === 200 )
    {
       return await response.json();
    }
    else
    {
      alert("An error Try Again");
      throw new Error(response.statusText);
          
    }
         
      }
      
  async function fetchanimepic() {
    for (let i = 0; i < animes.resultAnime.length; i++) {
      let nendpoint = picendpoint + animes.resultAnime[i].animeid;
      
          let ntemp =  await proxyfetchanimepic(nendpoint);

          if (ntemp.success == false) {
            alert("Picture Not Found");
          } else {
            pictures[i] = image + ntemp.gallery[0].pictureid;
          //  console.log(ntemp);
          }
        }
        $animepics=pictures;
    }
  
</script>

<div
  class="grid grid-cols- gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
>
  {#await fetchanimeinfo()}
  <div class="text-center" ><Spinner size="10" color="red"/></div>
  {:then}
    {#each animes.resultAnime as prop,i}
      <div
        class="flex flex-col items-center justify-center w-full max-w-lg mx-auto"
      >
      <a href="/resanime/{i}">
        <img
          class="h-52 rounded-full mb-4"
          src={pictures[i]}
          alt="Anime Pic"
        />
      </a>
        <h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
          {animes.resultAnime[i].title}
        </h4>
        {#if $state==1}
        <button
          class="flex items-center justify-center w-full px-2 py-2 mt-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 mx-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
            />
          </svg>
          <span class="mx-1">Add to List</span>
        </button>
        {/if}
      </div>
    {/each}
  {/await}
</div>
