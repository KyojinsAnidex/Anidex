<script>
    import {eps,state,epanime} from '../stores/store';
    import {Rating} from 'flowbite-svelte';
    console.log($eps);
    console.log($epanime);

</script>
{#if $eps.length!=0}
<div class="flex justify-center">
<table class="table-auto border-separate">
    <tr>
      <th>EpisodeTitle   </th>
      <th>Season   </th>
      <th>Episode  </th>
      <th>Runtime(minutes:seconds)</th>
      <th>Rating</th>
    </tr> 
{#each $eps.episodes as prop, i}
<tr>
    <td>{prop.title}  </td>
    <td>{prop.season}  </td>
    <td>{prop.episode}  </td>
    <td>{prop.runtime.hours}:{prop.runtime.minutes}</td>
    <td><Rating count rating={prop.episoderating}></Rating></td>
</tr>
		{/each}
    
    </table>
</div>
{:else}
<h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
    The anime does not have any Episodes Added yet
</h4>

{/if}
<br>   {#if $state==1}
		  <div class="flex justify-center">
		  <a href="/addepisode">
		  <button
						  class="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-green-600 active:bg-red-600 hover:bg-red-700"
						  >Add Episodes</button
					  >
				  </a>
                </div>
                {/if}
                
                
               