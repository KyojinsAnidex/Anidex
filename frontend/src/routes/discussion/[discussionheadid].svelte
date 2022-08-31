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
	// console.log(discussion);
	import { Card, Avatar, AccordionFlush, Textarea } from 'flowbite-svelte';
	import { state, curruser } from './../../stores/store.js';
	import { goto } from '$app/navigation';
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
		}else {
			let errorMessage = await response.json();
			// console.log();
			alert('An error occurred: ' + errorMessage.message);

			throw new Error(response.statusText);
		}
	}
	async function adddiscussion() {
		let temp = await proxydiscussion();

		if (temp.success == false) {
			alert('Could not Add Discussion');
		} else {
			// console.log(temp);
			text = '';
			refresh();
		}
	}
	let vote = false;
	let check = 0;
	async function proxyvote() {
		const response = await fetch(
			'http://localhost:5000/discussion/discussionhead/' + discussionheadid,
			{
				method: 'PATCH',
				headers: {
					Authorization: 'Bearer ' + $curruser.token,
					'Content-Type': 'application/json'

					// like application/json or text/xml
				},
				body: JSON.stringify({
					// Example: Update JSON file with
					//          local data properties
					vote: vote
					// etc.
				})
			}
		);
		if (response.status === 201) {
			return await response.json();
		} else {
			let errorMessage = await response.json();
			// console.log();
			alert('An error occurred: ' + errorMessage.message);

			throw new Error(response.statusText);
		}
	}
	async function givevote() {
		let temp = await proxyvote();

		if (temp.success == false) {
			alert('Could not Add Review');
		} else {
			// console.log(temp);
			refresh();
			return temp;
		}
	}
	async function upvote() {
		vote = true;
		if (check == 0 || check == 2) {
			let temp = givevote();
			check = 1;
		}
	}
	async function downvote() {
		vote = false;
		if (check == 0 || check == 1) {
			let temp = givevote();
			check = 2;
		}
	}

	let votethread = false;
	let checkthread = 0;
	async function proxyvotethread(eid) {
		const response = await fetch('http://localhost:5000/discussion/discussionentry/' + eid, {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + $curruser.token,
				'Content-Type': 'application/json'

				// like application/json or text/xml
			},
			body: JSON.stringify({
				// Example: Update JSON file with
				//          local data properties
				vote: votethread
				// etc.
			})
		});
		if (response.status === 201) {
			return await response.json();
		} else {
			let errorMessage = await response.json();
			// console.log();
			alert('An error occurred: ' + errorMessage.message);

			throw new Error(response.statusText);
		}
	}
	async function givevotethread(eid) {
		let temp = await proxyvotethread(eid);

		if (temp.success == false) {
			alert('Could not Add Review');
		} else {
			// console.log(temp);
			refresh();
			return temp;
		}
	}
	async function upvotethread(eid) {
		votethread = true;
		if (checkthread == 0 || checkthread == 2) {
			let temp = givevotethread(eid);
			checkthread = 1;
		}
	}
	async function downvotethread(eid) {
		votethread = false;
		if (checkthread == 0 || checkthread == 1) {
			let temp = givevotethread(eid);
			checkthread = 2;
		}
	}
	async function proxydeletediscussion() {
		let endpoint = 'http://localhost:5000/discussion/discussionhead/' + discussionheadid;
		const response = await fetch(endpoint, {
			method: 'DELETE',
			headers: {
				Authorization: 'Bearer ' + $curruser.token
				// like application/json or text/xml
			}
		});
		console.log(response);
		if (response.status === 201) {
			return await response.json();
		} else {
			let errorMessage = await response.json();
			// console.log();
			alert('An error occurred: ' + errorMessage.message);

			throw new Error(response.statusText);
		}
	}
	async function handledeletediscussion() {
		let temp = await proxydeletediscussion();

		if (temp.success == false) {
			alert('Could not Delete');
		} else {
			console.log(temp);
			goto("http://127.0.0.1:5173/forumhome")
			
		}
	}
	async function proxydeletediscussionentry(eid) {
		let endpoint = 'http://localhost:5000/discussion/discussionentry/' + eid;
		const response = await fetch(endpoint, {
			method: 'DELETE',
			headers: {
				Authorization: 'Bearer ' + $curruser.token
				// like application/json or text/xml
			}
		});
		console.log(response);
		if (response.status === 201) {
			return await response.json();
		} else {
			let errorMessage = await response.json();
			// console.log();
			alert('An error occurred: ' + errorMessage.message);

			throw new Error(response.statusText);
		}
	}
	async function handledeletediscussionentry(eid) {
		let temp = await proxydeletediscussionentry(eid);

		if (temp.success == false) {
			alert('Could not Delete');
		} else {
			console.log(temp);
			refresh();
			
		}
	}
</script>

<svelte:head>
	<title>Forum Thread {discussionheadid}</title>
</svelte:head>
<div class="relative flex justify-center w-full bg-solarizedBase2 text-solarizedBase02">
	<h2 class="text-2xl font-medium text-center flex justify-center"> Discussion Thread: {discussionheadid} </h2>
	<Card size=xl class="w-full bg-solarizedBase3 text-solarizedBase02">
		<Avatar src={'http://localhost:5000/uploads/images/' + discussion.discussionHead.pictureid} />
		<h5 class="mb-2 text-xl font-bold tracking-tight text-black dark:text-white">
			{discussion.discussionHead.userid}
		</h5>
		On
		<h5 class="mb-2 text-sm font-medium tracking-tight  dark:text-white">
			{discussion.discussionHead.starttime.slice(0, 10) +
				' at ' +
				discussion.discussionHead.starttime.slice(12, 19)}
		</h5>
		<h5 class="mb-2 text-sm font-medium tracking-tight dark:text-white">Said:</h5>
		<p class="mb-3 font-normal  dark:text-gray-400 leading-tight">
			{discussion.discussionHead.contentofdiscussion}
		</p>
		{#if $state == 1}
			<button
				on:click={upvote}
				class="inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-5 h-5 mr-1"
					><path
						d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z"
					/></svg
				>
			</button>
			<button
				on:click={downvote}
				class="inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 group"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-5 h-5 mr-1"
					><path
						d="M15.73 5.25h1.035A7.465 7.465 0 0118 9.375a7.465 7.465 0 01-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 01-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 00-.322 1.672V21a.75.75 0 01-.75.75 2.25 2.25 0 01-2.25-2.25c0-1.152.26-2.243.723-3.218C7.74 15.724 7.366 15 6.748 15H3.622c-1.026 0-1.945-.694-2.054-1.715A12.134 12.134 0 011.5 12c0-2.848.992-5.464 2.649-7.521.388-.482.987-.729 1.605-.729H9.77a4.5 4.5 0 011.423.23l3.114 1.04a4.5 4.5 0 001.423.23zM21.669 13.773c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.959 8.959 0 01-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227z"
					/></svg
				>
			</button>
			{#if discussion.discussionHead.userid==$curruser.name}
			<br>
			<div class="flex justify-left">	
			<button
							on:click={handledeletediscussion}
							class="px-5 inline py-3 text-xl font-medium leading-5 text-white transition-all duration-400 border border-transparent rounded-2xl focus:outline-none bg-green-600 active:bg-red-600 hover:bg-red-700"
							>Delete Thread</button
						>
					
						
					</div>
					<br>
			{/if}
		{/if}
		<h5 class="mb-2 text-sm font-bold tracking-tight  dark:text-white">
			Votes: {discussion.discussionHead.votes}
		</h5>
	</Card>
</div>
{#if discussion.discussionEntries.length == 0}
	<div class="flex w-full justify-center bg-solarizedBase3 text-solarizedBase02">
		<h2 class="mt-2 text-xl text-center align-middle font-medium text-black dark:text-red-700">
			No replies to this thread yet
		</h2>
	</div>
{:else}
	<div class="flex w-full justify-center p-20 bg-solarizedBase3 text-solarizedBase02">
		<h2 class="text-xl text-center font-medium">Replies:</h2>
		<table class="table-fixed border-solid " cellpadding="20" cellspacing="20">
			{#each discussion.discussionEntries as forum}
				<tr>
					<td
						><AccordionFlush>
							<h2 slot="header">{forum.contentofdiscussion.slice(0, 50)}</h2>
							<div slot="body">
								{forum.contentofdiscussion}
								<br />
								{#if $state == 1}
									<button
										on:click={upvotethread(forum.discussionentryid)}
										class="inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											class="w-5 h-5 mr-1"
											><path
												d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z"
											/></svg
										>
									</button>
									<button
										on:click={downvotethread(forum.discussionentryid)}
										class="inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 group"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											class="w-5 h-5 mr-1"
											><path
												d="M15.73 5.25h1.035A7.465 7.465 0 0118 9.375a7.465 7.465 0 01-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 01-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 00-.322 1.672V21a.75.75 0 01-.75.75 2.25 2.25 0 01-2.25-2.25c0-1.152.26-2.243.723-3.218C7.74 15.724 7.366 15 6.748 15H3.622c-1.026 0-1.945-.694-2.054-1.715A12.134 12.134 0 011.5 12c0-2.848.992-5.464 2.649-7.521.388-.482.987-.729 1.605-.729H9.77a4.5 4.5 0 011.423.23l3.114 1.04a4.5 4.5 0 001.423.23zM21.669 13.773c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.959 8.959 0 01-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227z"
											/></svg
										>
									</button>
									Votes: {forum.votes}
								{/if}

							</div>
						</AccordionFlush>
					</td>
					<td
						><Avatar
							src={'http://localhost:5000/uploads/images/' + forum.pictureid}
						/>{forum.userid} On {forum.starttime.slice(12, 19)}, {forum.starttime.slice(0, 10)}</td
					>
					<td>
						{#if forum.userid==$curruser.name}
			<br>
			<div class="flex justify-left">	
			<button
							on:click={handledeletediscussionentry(forum.discussionentryid)}
							class="px-5 inline py-3 text-xl font-medium leading-5 text-white transition-all duration-400 border border-transparent rounded-2xl focus:outline-none bg-green-600 active:bg-red-600 hover:bg-red-700"
							>Delete Thread</button
						>
					
						
					</div>
					<br>
			{/if}
					</td>
					
				</tr>
			{/each}
		</table>
	</div>
{/if}
{#if $state == 1}
	<div class="flex w-full justify-center p-10 bg-solarizedBase3 text-solarizedBase02">
		<Textarea bind:value={text} class="mb-4 " placeholder="Add a reply to this thread" />
	</div>
	<div class="flex  justify-center bg-solarizedBase3 text-solarizedBase02">
		<button
			on:click={adddiscussion}
			class="px-5 inline py-3 text-lg font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-2xl focus:outline-none bg-green-600 active:bg-red-600 hover:bg-red-700"
			>Add Reply</button
		>
	</div>
{/if}
