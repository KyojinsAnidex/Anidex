<script>
    import {state,animeofinterest} from '../stores/store';
    let anime=$animeofinterest[0];
    let picture=$animeofinterest[1];
</script>
<div class="relative flex h-full w-full">
<div
     class="h-screen w-1/2"
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

</div>
<div class="h-screen w-1/2 ">
   
</div>
</div>