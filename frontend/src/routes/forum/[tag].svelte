<script context="module">
	export async function load({ params }) {
		let tag = params.tag;
		let foruminfo;
		let response;
		let anime;
		response = await fetch('http://localhost:5000/discussion/tags/' + tag);
		if (response.status === 200) {
			foruminfo = await response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
		response = await fetch('http://localhost:5000/anime');
		if (response.status === 200) {
			anime = await response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
		return { props: { foruminfo, tag, anime } };
	}
</script>

<script>
	import {
		Avatar,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Textarea
	} from 'flowbite-svelte';
	import { curruser, state } from '../../stores/store';
	export let foruminfo, tag;
	export let anime;
	console.log(foruminfo);
	console.log(anime);
	let text;
	let tags = [];
	tags.push(tag);
	let animeid;
	async function refresh() {
		let response;
		response = await fetch('http://localhost:5000/discussion/tags/' + tag);
		if (response.status === 200) {
			foruminfo = await response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
	}
	async function proxydiscussion() {
		let response;
		if (tag == 'Anime' || tag == 'Review' || tag == 'Watchroom') {
			response = await fetch('http://localhost:5000/discussion/discussionhead', {
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
					tags: tags,
					animeid: animeid

					// etc.
				})
			});
		} else {
			response = await fetch('http://localhost:5000/discussion/discussionhead', {
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
					tags: tags

					// etc.
				})
			});
		}
		if (response.status === 201) {
			return await response.json();
		} else {
			let errorMessage = await response.json();
			// console.log();
			alert('An error occurred: ' + errorMessage.message);

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

<svelte:head>
	<title>{tag} Subforum</title>
</svelte:head>

<div
	class="relative flex justify-center w-full text-2xl font-bold bg-solarizedBase3 text-solarizedBase02"
>
	Welcome to {tag} Subforum 
</div>
{#if $state == 1}
	<div class="relative flex-grow w-full bg-solarizedBase3 text-solarizedBase02">
		<div class="h-screen/2 w-1/2 ">
			{#if tag == 'Anime' || tag == 'Review' || tag == 'Watchroom'}
					
			<h2 class="text-lg flex justify-center font-medium">Select Anime</h2>
			<div class="px-5 flex justify-center">
				<select bind:value={animeid} class="text-black">
					{#each anime.results as an}
						<option value={an.animeid}>
							{an.title}
						</option>
					{/each}
				</select>
			</div>
			{/if}
		</div>
		<div class="h-screen/2 w-1/2 ">
			<br/>
			<br/>
			<h2 class="text-xl flex justify-center font-medium">Start a thread NOW!</h2>
			
			<div class="flex justify-center">
				<Textarea
					bind:value={text}
					class="mb-4 p-2"
					placeholder="Add a discussion thread To this subforum"
					
				/>
			</div>
			<br />
			<div class="flex justify-center">
				<button
					on:click={adddiscussion}
					class="px-5 inline py-3 text-lg font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-2xl focus:outline-none bg-green-600 active:bg-red-600 hover:bg-red-700"
					>Add Discussion Thread</button
				>
			</div>
		</div>
	</div>
	<br class="w-full bg-solarizedBase3" />
	<br class="w-full bg-solarizedBase3" />
	<br class="w-full bg-solarizedBase3" />
{/if}

{#if foruminfo.allDiscussionHeads.length == 0}
	<h2
		class="mb-2 text-2xl font-bold w-full flex justify-center tracking-tight bg-solarizedBase3 text-solarizedBase02 dark:text-white"
	>
		No discussion thread exists for this subforum yet, care to make one?
	</h2>
{:else}
	<h2 class="mb-2 text-2xl font-bold w-full flex justify-center bg-solarizedBase3 text-solarizedBase02">
		Many discussions in this subforum:
	</h2>
	<div class="flex justify-center p-20 w-full bg-solarizedBase3 text-solarizedBase02">
		<Table hoverable={true} class="w-full bg-solarizedBase3 text-solarizedBase02">
			<TableHead>
				<TableHeadCell>Thread</TableHeadCell>
				<TableHeadCell>Original poster</TableHeadCell>
				<TableHeadCell>Votes</TableHeadCell>

				<TableHeadCell>
					<span class="sr-only"> Join </span>
				</TableHeadCell>
			</TableHead>
			<TableBody class="divide-y">
				{#each foruminfo.allDiscussionHeads as forum}
					<TableBodyRow>
						<TableBodyCell>{forum.contentofdiscussion.slice(0, 50) + '...'}</TableBodyCell>
						<TableBodyCell
							><Avatar
								src={'http://localhost:5000/uploads/images/' + forum.pictureid}
							/>{forum.userid} On {forum.starttime.slice(12, 19)}, {forum.starttime.slice(
								0,
								10
							)}</TableBodyCell
						>
						<TableBodyCell>{forum.votes}</TableBodyCell>
						<TableBodyCell>
							<a
								href="/discussion/{forum.discussionheadid}"
								class="font-medium text-solarizedBlue hover:underline dark:text-blue-500"
							>
								Visit thread
							</a>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
{/if}
