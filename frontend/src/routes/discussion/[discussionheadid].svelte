<script context="module">
	export async function load({ params }) {
		let discussionheadid = params.discussionheadid;
		let discussion;
		let response;
		response = await fetch('http://localhost:5000/discussion/discussionhead/' + discussionheadid);
		if (response.status === 200) {
			discussion = await response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
		return { props: { discussion, discussionheadid } };
	}
</script>

<script>
	export let discussion, discussionheadid;
	console.log(discussion);
	import { Card, Avatar, AccordionFlush, Textarea } from 'flowbite-svelte';
	import { state, curruser } from './../../stores/store.js';
	async function refresh() {
		let response;
		response = await fetch('http://localhost:5000/discussion/discussionhead/' + discussionheadid);
		if (response.status === 200) {
			discussion = await response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
	}
	let text;

	async function proxydiscussion() {
		const response = await fetch(
			'http://localhost:5000/discussion/discussionhead/' + discussionheadid,
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
					userid: $curruser.name

					// etc.
				})
			}
		);
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

<div class="flex justify-center">
	<Card
		img={'http://localhost:5000/uploads/images/' + discussion.discussionHead.pictureid}
		horizontal
		reverse={false}
	>
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			{discussion.discussionHead.userid}
		</h5>
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			Votes: {discussion.discussionHead.votes}
		</h5>
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			Start Time: {discussion.discussionHead.starttime.slice(0, 10)}
		</h5>
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			Description:
		</h5>
		<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
			{discussion.discussionHead.contentofdiscussion}
		</p>
	</Card>
</div>
<br />
<br />
{#if discussion.discussionEntries.length == 0}
	<div class="flex justify-center">
		<h2 class="mt-2 text-3xl font-medium text-black dark:text-red-700">
			No Discussion Of This Thread Yet
		</h2>
	</div>
{:else}
	<div class="flex justify-center p-20">
		<table class="table-fixed border-solid ">
			<tr>
				<th>Content of Discussion</th>
				<th>Discussion Starter</th>
				<th>Start Time</th>
				<th>Votes</th>
			</tr>

			{#each discussion.discussionEntries as forum}
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
{#if $state == 1}
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
		</div>
	
{/if}
