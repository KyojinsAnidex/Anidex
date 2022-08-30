<script context="module">

	export async function load({ params }) {
		let tag = params.tag;
        let foruminfo;
		let response;
        let anime;
		response = await fetch('http://localhost:5000/discussion/tags/'+tag);
		if (response.status === 200) {
			foruminfo = await  response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
        response = await fetch('http://localhost:5000/anime');
		if (response.status === 200) {
			anime = await  response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
		return { props: { foruminfo,tag,anime } };
	}
</script>
<script>
    import { Avatar,Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell,Textarea  } from 'flowbite-svelte';
    import {curruser,state} from '../../stores/store';
    export let foruminfo,tag;
    export let anime;
    console.log(foruminfo);
    console.log(anime);
    let text;
    let tags=[];
    tags.push(tag);
    let animeid;
    async function refresh()
    {
		let response;
		response = await fetch('http://localhost:5000/discussion/tags/'+tag);
		if (response.status === 200) {
			foruminfo = await  response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
    }
    async function proxydiscussion() {

		let response;
        if(tag=='Anime' || tag=='Review' || tag=='Watchroom')
        {
        response = await fetch(
			'http://localhost:5000/discussion/discussionhead',
			{
				method: 'POST',
				headers: {
					Authorization: 'Bearer ' + $curruser.token,
					'Content-Type': 'application/json'

					// like application/json or text/xml
				},
				body: JSON.stringify({
					// Example: Update JSON file with
					//          local data properties
					content: text,
					userid: $curruser.name,
                    tags:tags,
                    animeid:animeid

					// etc.
				})
			}
		);
        }
        else
        {
            response = await fetch(
			'http://localhost:5000/discussion/discussionhead',
			{
				method: 'POST',
				headers: {
					Authorization: 'Bearer ' + $curruser.token,
					'Content-Type': 'application/json'

					// like application/json or text/xml
				},
				body: JSON.stringify({
					// Example: Update JSON file with
					//          local data properties
					content: text,
					userid: $curruser.name,
                    tags:tags

					// etc.
				})
			}
		);
        }
		if (response.status === 201) {
			return await response.json();
		} else {
			alert('Could Not Add Studio Try Again');
			throw new Error(response.statusText);
		}
	}
	async function adddiscussion() {
		let temp = await proxydiscussion();

		if (temp.success == false) {
			alert('Could not Add Review');
		} else {
			console.log(temp);
			text = '';
			refresh();
		}
	}
   
</script>

{#if $state == 1}
<div class="relative flex ">
    <div class="h-screen/2 w-1/2 ">
{#if tag=='Anime' || tag=='Review' || tag=='Watchroom'}   
        <select bind:value={animeid} class="text-black">
            {#each anime.results as an}
                <option value={an.animeid}>
                    {an.title}
                </option>
            {/each}
        </select>
{/if}
</div>
<div class="h-screen/2 w-1/2 ">
	<div class="flex justify-center">
		<Textarea bind:value={text} class="mb-4" placeholder="Add a Discussion To this Thread" />
		</div>
		<br />
		<div class="flex justify-center">
			<button
				on:click={adddiscussion}
				class="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-green-600 active:bg-red-600 hover:bg-red-700"
				>Add Discussion</button
			>
            <br>
		</div>
    </div>
</div>
{/if}

{#if foruminfo.allDiscussionHeads.length==0}
<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    No Discussion Head Exists For This Forum Yet
</h5>
{:else}
<Table hoverable={true}>
    <TableHead>
              <TableHeadCell>Content of Discussion</TableHeadCell>
              <TableHeadCell>Discussion Starter</TableHeadCell>
              <TableHeadCell>Start Time</TableHeadCell>
              <TableHeadCell>Votes</TableHeadCell>
              
              <TableHeadCell>
                  <span class="sr-only"> Join </span>
              </TableHeadCell>
          </TableHead>
          <TableBody class="divide-y">
            {#each foruminfo.allDiscussionHeads as forum}
              <TableBodyRow>
                  <TableBodyCell>{forum.contentofdiscussion.slice(0,50)+"..."}</TableBodyCell>
                  <TableBodyCell><Avatar src={'http://localhost:5000/uploads/images/'+forum.pictureid}></Avatar>{forum.userid}</TableBodyCell>
                  <TableBodyCell>{forum.starttime.slice(0,10)}</TableBodyCell>
                  <TableBodyCell>{forum.votes}</TableBodyCell>
                  <TableBodyCell>
                      <a href="/discussion/{forum.discussionheadid}" class="font-medium text-blue-600 hover:underline dark:text-blue-500">
                         Join Discussion
                      </a>
                  </TableBodyCell>
              </TableBodyRow>
              {/each}      
          </TableBody>
      </Table>
{/if}

