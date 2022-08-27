<script context="module">
	export async function load({url}) {
		let genres,studios;
		let response;
		response = await fetch("http://localhost:5000/genre");
		if (response.status === 200) {
			genres = await  response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
		response = await fetch("http://localhost:5000/studios");
		if (response.status === 200) {
			studios = await  response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
		return { props: { genres,studios } };
	}
</script>
<script>
	import {  Input, Dropdown, DropdownItem, Radio,Select } from 'flowbite-svelte';
	import { curruser } from '../stores/store';
	export let genres,studios;
	console.log(genres);
	console.log(studios);
	let anime = {
		title: '',
		releasedate: '',
		synopsis: '',
		releaseseason: '',
		genre:[],
		studio:[]
	};
	let image;
	async function proxyaddanime() {
		const dataArray = new FormData();
		dataArray.append('title', anime.title);
		dataArray.append('releasedate', anime.releasedate);
		dataArray.append('synopsis', anime.synopsis);
		dataArray.append('releaseseason', anime.releaseseason);
		dataArray.append('genres', anime.genre);
		dataArray.append('studios', anime.studio);
		dataArray.append('image', image[0]);
		for (var key of dataArray.entries()) {
			console.log(key[0] + ', ' + key[1]);
		}
		console.log(anime);
		//console.log(dataArray);
		let endpoint = 'http://localhost:5000/anime';
		const response = await fetch(endpoint, {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + $curruser.token
				// like application/json or text/xml
			},
			body: dataArray
		});
		console.log(response);
		if (response.status === 201) {
			return await response.json();
		} else {
			alert('An error Try Again');
			throw new Error(response.statusText);
		}
	}

	async function handleadd() {
		let temp = await proxyaddanime();

		if (temp.success == false) {
			alert('Could not Add');
		} else {
			console.log(temp);
		}
	}
</script>

<svelte:head>
	<title>Add Anime</title>
</svelte:head>
<div class=" flex justify-center  bg-black text-white">
<h1 class="text-2xl">Anime Info</h1>
</div>
<div class="relative flex h-full w-full">
	<div class="h-screen w-1/2 bg-black">
		<div class="mx-auto flex h-full w-2/3 flex-col justify-center text-white xl:w-1/2">
			
			<div class="mt-10">
				<form >
					<div>
						<label class="mb-2.5 block font-extrabold" for="title">Title</label>
						<input
							type="text"
							id="name"
							bind:value={anime.title}
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="Title"
						/>
					</div>
					<div>
						<label class="mb-2.5 block font-extrabold" for="release date">Release Date</label>
						<input
							type="text"
							id="Releasedate"
							bind:value={anime.releasedate}
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="YEAR-MM-DATE"
						/>
					</div>
					<div>
						<label for="sys" class="mb-2.5 block font-extrabold ">Synopsis</label>
						<Input bind:value={anime.synopsis} id="sys" size="lg" placeholder="Synopsis" />
					</div>
					<br />
					<Dropdown label="Season" class="w-60" size="xl" color="black">
						<ul slot="content" class="p-3">
							<DropdownItem class="rounded" liClass="p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
								<Radio bind:group={anime.releaseseason} name="dropdown" value={'Spring'} tinted
									>Spring</Radio
								>
							</DropdownItem>
							<DropdownItem class="rounded" liClass="p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
								<Radio bind:group={anime.releaseseason} name="dropdown" value={'Summer'} tinted
									>Summer</Radio
								>
							</DropdownItem>
							<DropdownItem class="rounded" liClass="p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
								<Radio bind:group={anime.releaseseason} name="dropdown" value={'Winter'} tinted
									>Winter</Radio
								>
							</DropdownItem>
							<DropdownItem class="rounded" liClass="p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
								<Radio bind:group={anime.releaseseason} name="dropdown" value={'Fall'} tinted
									>Fall</Radio
								>
							</DropdownItem>
						</ul>
					</Dropdown>
					<br />
					<div>
						<label class="mb-2.5 block font-extrabold" for="File">Anime Picture</label>
						<input type="file" bind:files={image} id="avatar" name="avatar" accept="image/png, image/jpeg" />
					</div>
					
			</div>
		</div>
	</div>
	<div class="h-screen w-1/2 bg-black">
		<div class="mx-auto flex h-full w-2/3 flex-col justify-center text-white xl:w-1/2">
			<div class="mt-10">
				<form on:submit|preventDefault={handleadd}>
					<div>
						<label class="mb-2.5 block font-extrabold" for="title">Select Genre</label>
						<select multiple bind:value={anime.genre} class="text-black">
							{#each genres.results as gen}
								<option value={gen.genrename}>
									{gen.genrename}
								</option>
							{/each}
						</select>
					</div>
					<div>
						<label class="mb-2.5 block font-extrabold" for="title">Select Studio</label>
						<select multiple bind:value={anime.studio} class="text-black">
							{#each studios.results as std}
								<option value={std.studioname}>
									{std.studioname}
								</option>
							{/each}
						</select>
					</div>
					<div class="my-10">
						<input
							type="submit"
							id="submit"
							class="w-full rounded-full bg-orange-600 p-5 hover:bg-orange-800"
						/>
					</div>
				</form>

			</div>

		</div>
		
	</div>
</div>
