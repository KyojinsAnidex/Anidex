<script context="module">
	export async function load({ url }) {
		let animes, personnels, characters;
		let response;
		response = await fetch('http://localhost:5000/anime');
		if (response.status === 200) {
			animes = await response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
		response = await fetch('http://localhost:5000/personnel');
		if (response.status === 200) {
			personnels = await response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
		response = await fetch('http://localhost:5000/characters');
		if (response.status === 200) {
			characters = await response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
		return { props: { animes, personnels, characters } };
	}
</script>

<script>
	export let animes, personnels, characters;
	import { AccordionFlush, Alert, Button } from 'flowbite-svelte';
	import { curruser } from '../stores/store';
	//console.log(animes);
	//console.log(personnels);
	// console.log(characters);
	let episodes, chosenanime, chosenpersonnel, chosencharacter, chosenepisode;
	async function proxyfetchepisodes() {
		let ependpoint = 'http://localhost:5000/episodes/' + chosenanime;
		const response = await fetch(ependpoint);
		if (response.status === 200) {
			return await response.json();
		} else if (response.status === 404) {
			return await response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
	}
	async function fetchepisodes() {
		let temp = await proxyfetchepisodes();

		if (temp.success == false) {
			console.log('No episodes Found');
		} else {
			// console.log(temp);
			episodes = temp;
		}
	}
	async function proxydeleteanime() {
		let endpoint = 'http://localhost:5000/anime/' + chosenanime;
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
			alert('An error Try Again');
			throw new Error(response.statusText);
		}
	}
	async function handledeleteanime() {
		let temp = await proxydeleteanime();

		if (temp.success == false) {
			alert('Could not Delete');
		} else {
			console.log(temp);
			refresh();
			resetalert();
		}
	}
	async function proxydeletecharacters() {
		let endpoint = 'http://localhost:5000/characters/' + chosencharacter;
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
			alert('An error Try Again');
			throw new Error(response.statusText);
		}
	}
	async function handledeletecharacter() {
		let temp = await proxydeletecharacters();

		if (temp.success == false) {
			alert('Could not Delete');
		} else {
			console.log(temp);
			refresh();
			resetalert();
		}
	}
	async function proxydeletepersonnel() {
		let endpoint = 'http://localhost:5000/personnel/' + chosenpersonnel;
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
			alert('An error Try Again');
			throw new Error(response.statusText);
		}
	}
	async function handledeletepersonnel() {
		let temp = await proxydeletepersonnel();

		if (temp.success == false) {
			alert('Could not Delete');
		} else {
			console.log(temp);
			refresh();
			resetalert();
		}
	}
	async function proxydeleteepisode() {
		let endpoint = 'http://localhost:5000/episodes/single/' + chosenepisode;
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
			alert('An error Try Again');
			throw new Error(response.statusText);
		}
	}
	async function handledeleteepisode() {
		let temp = await proxydeleteepisode();

		if (temp.success == false) {
			alert('Could not Delete');
		} else {
			console.log(temp);
			refresh();
			resetalert();
		}
	}
	let animedelchoice = 0,
		chardelchoice = 0,
		perdelchoice = 0,
		epdelchoice = 0;
	function animedel() {
		animedelchoice = 1;
	}
	function chardel() {
		chardelchoice = 1;
	}
	function perdel() {
		perdelchoice = 1;
	}
	function epdel() {
		epdelchoice = 1;
	}
	function resetalert() {
		animedelchoice = 0;
		chardelchoice = 0;
		perdelchoice = 0;
		epdelchoice = 0;
	}
	async function refresh() {
		let response;
		response = await fetch('http://localhost:5000/anime');
		if (response.status === 200) {
			animes = await response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
		response = await fetch('http://localhost:5000/personnel');
		if (response.status === 200) {
			personnels = await response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
		response = await fetch('http://localhost:5000/characters');
		if (response.status === 200) {
			characters = await response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
	}
</script>

<svelte:head>
	<title>Admin Page</title>
</svelte:head>
{#if animedelchoice == 1}
	<Alert>
		<div class="flex justify-center" />
		<span class="text-lg font-medium text-blue-700 dark:text-blue-800"
			>Do You Really Want To Delete The Chosen Anime?</span
		>
		<Button on:click={handledeleteanime} size="xs" outline color="blue">Yes</Button>
		<Button on:click={resetalert} size="xs" outline color="blue">No</Button>
	</Alert>
{/if}
{#if chardelchoice == 1}
	<Alert>
		<div class="flex justify-center" />
		<span class="text-lg font-medium text-blue-700 dark:text-blue-800"
			>Do You Really Want To Delete The Chosen Character?</span
		>
		<Button on:click={handledeletecharacter} size="xs" outline color="blue">Yes</Button>
		<Button on:click={resetalert} size="xs" outline color="blue">No</Button>
	</Alert>
{/if}
{#if perdelchoice == 1}
	<Alert>
		<div class="flex justify-center" />
		<span class="text-lg font-medium text-blue-700 dark:text-blue-800"
			>Do You Really Want To Delete The Chosen Personnel?</span
		>
		<Button on:click={handledeletepersonnel} size="xs" outline color="blue">Yes</Button>
		<Button on:click={resetalert} size="xs" outline color="blue">No</Button>
	</Alert>
{/if}
{#if epdelchoice == 1}
	<Alert>
		<div class="flex justify-center" />
		<span class="text-lg font-medium text-blue-700 dark:text-blue-800"
			>Do You Really Want To Delete The Chosen Episode?</span
		>
		<Button on:click={handledeleteepisode} size="xs" outline color="blue">Yes</Button>
		<Button on:click={resetalert} size="xs" outline color="blue">No</Button>
	</Alert>
{/if}
{#if animedelchoice == 1}
	<Alert>
		<div class="flex justify-center" />
		<span class="text-lg font-medium text-blue-700 dark:text-blue-800"
			>Do You Really Want To Delete The Chosen Anime?</span
		>
		<Button on:click={handledeleteanime} size="xs" outline color="blue">Yes</Button>
		<Button on:click={resetalert} size="xs" outline color="blue">No</Button>
	</Alert>
{/if}
<div class="relative flex justify-center h-full w-full bg-red-100">
	<div class="h-full w-1/2  ">
		<AccordionFlush id="1">
			<h2 slot="header">Delete Anime</h2>
			<div slot="body">
				<select bind:value={chosenanime} class="text-black">
					{#each animes.results as an}
						<option value={an.animeid}>
							{an.title}
						</option>
					{/each}
				</select>
				<br />
				<br />
				<div class="flex justify-center">
					<button
						on:click={animedel}
						class="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-red-600 active:bg-red-600 hover:bg-red-700"
						>Delete Chosen Anime</button
					>
				</div>
			</div>
		</AccordionFlush>
		<AccordionFlush id="5">
			<h2 slot="header">Delete Character</h2>
			<div slot="body">
				<select bind:value={chosencharacter} class="text-black">
					{#each characters.results as char}
						<option value={char.characterid}>
							{char.firstname + '  ' + char.lastname}
						</option>
					{/each}
				</select>
				<br />
				<br />
				<div class="flex justify-center">
					<button
						on:click={chardel}
						class="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-red-600 active:bg-red-600 hover:bg-red-700"
						>Delete Chosen Character</button
					>
				</div>
			</div>
		</AccordionFlush>
		<AccordionFlush id="2">
			<h2 slot="header">Delete Personnel</h2>
			<div slot="body">
				<select bind:value={chosenpersonnel} class="text-black">
					{#each personnels.personnels as per}
						<option value={per.personnelid}>
							{per.firstname + '  ' + per.lastname}
						</option>
					{/each}
				</select>
				<br />
				<br />
				<div class="flex justify-center">
					<button
						on:click={perdel}
						class="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-red-600 active:bg-red-600 hover:bg-red-700"
						>Delete Chosen Personnel</button
					>
				</div>
			</div>
		</AccordionFlush>
		<AccordionFlush id="3">
			<h2 slot="header">Delete Episode</h2>
			<div slot="body">
				<select bind:value={chosenanime} class="text-black">
					{#each animes.results as an}
						<option value={an.animeid}>
							{an.title}
						</option>
					{/each}
				</select>
				<AccordionFlush id="4">
					<h2 slot="header">Choose Episode</h2>
					<div slot="body">
						{#await fetchepisodes() then}
							<select bind:value={chosenepisode} class="text-black">
								{#each episodes.episodes as prop}
									<option value={prop.episodeid}>
										{prop.title}
									</option>
								{/each}
							</select>
						{/await}
						<br />
						<br />
						<div class="flex justify-center">
							<button
								on:click={epdel}
								class="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-red-600 active:bg-red-600 hover:bg-red-700"
								>Delete Chosen Episode</button
							>
						</div>
					</div>
				</AccordionFlush>
			</div></AccordionFlush
		>
	</div>
	
</div>
