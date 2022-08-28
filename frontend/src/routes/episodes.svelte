<script>
    import {eps} from '../stores/store';
    import {Rating} from 'flowbite-svelte';
    console.log($eps);
</script>
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