<script context="module">
	export async function load({ params }) {
		let animeid = params.animeid;
		let discussion;
		let response;
		response = await fetch('http://localhost:5000/discussion/anime/' + animeid);
		if (response.status === 200) {
			discussion = await response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}

		return { props: { discussion, animeid } };
	}
</script>

<script>
	export let discussion, animeid;
	import { AccordionFlush, Avatar, Textarea,Button } from 'flowbite-svelte';
	import { state, curruser } from './../../stores/store.js';
	console.log(discussion);
	console.log(animeid);
	let anime;
	async function fetchanime() {
		let response = await fetch('http://localhost:5000/anime/' + animeid);
		if (response.status === 200) {
			anime = await response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
	}
	console.log(anime);
  let review;
  let tags=[];
  tags.push("Review");
  async function refresh()
  {
		let response;
		response = await fetch('http://localhost:5000/discussion/anime/' + animeid);
		if (response.status === 200) {
			discussion = await response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
  }
  async function proxyreview()
  {
    const response = await fetch('http://localhost:5000/discussion/discussionhead', {
			method: 'POST',
			headers: {
                Authorization: 'Bearer ' + $curruser.token,
				'Content-Type': 'application/json'
                
				// like application/json or text/xml
			},
			body: JSON.stringify({
				// Example: Update JSON file with
				//          local data properties
				content:review,
        userid:$curruser.name,
        tags:tags,
        animeid:animeid
				// etc.
			})
		});
		if (response.status === 201) {
			return await response.json();
		} else {
			
			alert('Could Not Add Studio Try Again');
			throw new Error(response.statusText);
		}
  }
  async function addreview() {
		let temp = await proxyreview();

		if (temp.success == false) {
			alert('Could not Add Review');
		} else {
			console.log(temp);
      review='';
      refresh();
		}
	}
 
</script>

{#await fetchanime() then}
	<div class="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
		<img
			class="h-52 rounded-full mb-4"
			src={'http://localhost:5000/uploads/images/' + anime.animepicture[0].pictureid}
			alt="Anime Pic"
		/>
		<h2 class="mt-2 text-3xl font-medium text-black dark:text-red-700">
			{anime.anime.title}
		</h2>
		{#if discussion.reviewTagDiscussions.length!=0}
		<h2 class="mt-2 text-3xl font-medium text-black dark:text-red-700">
			No. Of Reviews : {discussion.reviewTagDiscussions.length}
		</h2>
		{/if}
	</div>
{/await}
{#if discussion.reviewTagDiscussions.length==0}
<div class="flex justify-center">
<h2 class="mt-2 text-3xl font-medium text-black dark:text-red-700">No Review Of This Anime Yet</h2>
</div>
{:else}
<div class="flex justify-center p-20">
	<table class="table-fixed border-solid ">
		<tr>
			<th>Content of Review</th>
			<th>Reviewer</th>
			<th>Review Time</th>
			<th>Votes</th>
		</tr>

		{#each discussion.reviewTagDiscussions as forum}
			<tr>
				<td
					><AccordionFlush>
						<h2 slot="header">{forum.contentofdiscussion.slice(0, 50)}</h2>
						<div slot="body">{forum.contentofdiscussion}</div>
					</AccordionFlush>
				</td>
				<td
					><Avatar
						src={'http://localhost:5000/uploads/images/' + forum.pictureid}
					/>{forum.userid}</td
				>
				<td>{forum.starttime.slice(0, 10)}</td>
				<td>{forum.votes}</td>
			</tr>
		{/each}
	</table>
</div>
{/if}
{#if $state==1}

  <Textarea bind:value={review} class="mb-4" placeholder="Write a Review">
  </Textarea>
  <br>
  <div class="flex justify-center">
  <button 
  on:click={addreview}    
  class="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-green-600 active:bg-red-600 hover:bg-red-700"
  >Post Review</button
>
</div>

{/if}



