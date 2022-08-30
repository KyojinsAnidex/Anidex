<script context="module">
	
	export async function load({ params }) {
		let animeid = params.animeid;
        let discussion;
		let response;
		response = await fetch('http://localhost:5000/discussion/anime/'+animeid);
		if (response.status === 200) {
			discussion = await  response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
       
		return { props: { discussion,animeid } };
	}
</script>
<script>
    export let discussion,animeid;
    import {AccordionFlush,Avatar} from 'flowbite-svelte';
    console.log(discussion);
    console.log(animeid);
    let anime;
    async function fetchanime()
    {
        let response = await fetch('http://localhost:5000/anime/'+animeid);
		if (response.status === 200) {
			anime = await response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
    }
    console.log(anime);
</script>
{#await fetchanime() then}
<div class="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
    <img class="h-52 rounded-full mb-4" src={'http://localhost:5000/uploads/images/'+anime.animepicture[0].pictureid} alt="Anime Pic" />
    <h2 class="mt-2 text-3xl font-medium text-black dark:text-red-700">
        {anime.anime.title}
    </h2>
    <h2 class="mt-2 text-3xl font-medium text-black dark:text-red-700">
       No. Of Reviews : {discussion.reviewTagDiscussions.length}
    </h2>
    </div>
{/await}
<div class="flex justify-center p-20">
    <table  class="table-fixed border-solid ">
        <tr>
                  <th>Content of Review</th>
                  <th>Reviewer</th>
                  <th>Review Time</th>
                  <th>Votes</th>
                  
                 
                </tr>
            
                {#each discussion.reviewTagDiscussions as forum}
                <tr>
                      <td><AccordionFlush>
                        <h2 slot="header">{forum.contentofdiscussion.slice(0,50)}</h2>
                        <div slot="body">{forum.contentofdiscussion}</div>
                      </AccordionFlush>
                        </td>
                      <td><Avatar src={'http://localhost:5000/uploads/images/'+forum.pictureid}></Avatar>{forum.userid}</td>
                      <td>{forum.starttime.slice(0,10)}</td>
                      <td>{forum.votes}</td>
                      
                 
                </tr>
                  {/each}
                
              </table>
            </div>
    
