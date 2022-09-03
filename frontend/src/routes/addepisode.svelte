<script>
	import { goto } from '$app/navigation';
	import { curruser, epanime } from '../stores/store';
	let episode = {
		episode: '',
		season: '',
		title: '',
		airingdate: '',
		runtime: ''
	};
	console.log($epanime);
	let endpoint = 'http://localhost:5000/episodes/' + $epanime;
	async function proxyadd() {
		const response = await fetch(endpoint, {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + $curruser.token,
				'Content-Type': 'application/json'
				// like application/json or text/xml
			},
			body: JSON.stringify({
				// Example: Update JSON file with
				//          local data properties
				episode: episode.episode,
				season: episode.season,
				animeid: $epanime,
				title: episode.title,
				runtime: episode.runtime,
				airingdate: episode.airingdate
				// etc.
			})
		});
		episode = {
			episode: '',
			season: '',
			title: '',
			airingdate: '',
			runtime: ''
		};
		if (response.status === 201) {
			return await response.json();
		} else {
			let errorMessage = await response.json();
			// console.log();
			alert('An error occurred: ' + errorMessage.message);

			throw new Error(response.statusText);
		}
	}
	async function handleadd() {
		let temp = await proxyadd();
		if (temp.success == false) {
			alert('Could not Add Episode. Try Again');
		} else if (temp.success == true) {
			alert('Successfully Added Episode');
			goto('/allanime');
			console.log(temp);
		}
	}
</script>

<svelte:head>
	<title>Add Episode</title>
</svelte:head>

<div class="relative flex h-full w-full bg-solarizedBase3 text-solarizedBase02">
	<div class="h-screen w-1/2 ">
		<div class="mx-auto flex h-full w-2/3 flex-col justify-center  xl:w-1/2">
			<h2 class="text-2xl font-bold">Add Anime Episodes</h2>
			<div class="mt-10 ">
				<form on:submit|preventDefault={handleadd}>
					<div>
						<label class="mb-2.5 block text-lg font-bold" for="Tile">Title</label>
						<input
							type="text"
							bind:value={episode.title}
							id="title"
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none  placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="Title"
							required
						/>
					</div>
					<div>
						<label class="mb-2.5 block text-lg font-bold" for="Season">Season</label>
						<input
							type="number"
							bind:value={episode.season}
							id="season"
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="Season"
							required
						/>
					</div>
					<div>
						<label class="mb-2.5 block text-lg font-bold" for="Episode Number">Episode Number</label
						>
						<input
							type="number"
							bind:value={episode.episode}
							id="episode"
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="Episode"
							required
						/>
					</div>
					<div>
						<label class="mb-2.5 block text-lg font-bold" for="release date">Airing Date</label>
						<input
							type="date"
							id="AirDate"
							bind:value={episode.airingdate}
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="YYYY-MM-DD"
							required
						/>
					</div>
					<div>
						<label class="mb-2.5 block text-lg font-bold" for="release date">Runtime</label>
						<input
							type="interval"
							id="Runtime"
							bind:value={episode.runtime}
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="HH:MM:SS"
							required
						/>
					</div>

					<div class="my-10 text-xl font-bold text-white items-center justify-center">
						<input
							type="submit"
							id="submit"
							class="w-2/5 rounded-2xl bg-solarizedRed p-2 hover:bg-red-500"
						/>
					</div>
				</form>
			</div>
		</div>
	</div>
	<div class="h-screen w-1/2 bg-blue-600">
		<img
			src="http://localhost:5000/uploads/images/login.jpg"
			class="object-cover h-full w-full"
			alt="logo"
		/>
	</div>
</div>
