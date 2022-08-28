<script>
	import {  curruser,epanime } from '../stores/store';
	let episode = {
		episode: '',
		season: '',
		title: ''
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
				episode:episode.episode,
				season: episode.season,
				animeid: $epanime,
				title: episode.title
				// etc.
			})
		});
		if (response.status === 201) {
			return await response.json();
		} else {
			alert('Could Not Add Episode Try Again');
			throw new Error(response.statusText);
		}
	}
	async function handleadd() {
		let temp = await proxyadd();
		if (temp.success == false) {
			alert('Could not Add Episode. Try Again');
		} else if (temp.success == true) {
			console.log(temp);
		}
	}
</script>
<svelte:head>
	<title>Add Episode</title>
</svelte:head>

<div class="relative flex h-full w-full">
	<div class="h-screen w-1/2 bg-black">
		<div class="mx-auto flex h-full w-2/3 flex-col justify-center text-white xl:w-1/2">
			
			<div class="mt-10">
				<form on:submit|preventDefault={handleadd}>
					<div>
						<label class="mb-2.5 block font-extrabold" for="Tile">Title</label>
						<input
							type="text"
							bind:value={episode.title}
							id="title"
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="Title"
						/>
					</div>
                    <div>
						<label class="mb-2.5 block font-extrabold" for="Season">Season</label>
						<input
							type="number"
							bind:value={episode.season}
							id="season"
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="Season"
						/>
					</div>
                    <div>
						<label class="mb-2.5 block font-extrabold" for="Episode Number">Episode Number</label>
						<input
							type="number"
							bind:value={episode.episode}
							id="episode"
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="Episode"
						/>
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
	<div class="h-screen w-1/2 bg-blue-600">
		<img
			src="http://localhost:5000/uploads/images/login.jpg"
			class="object-cover h-full w-full"
			alt="logo"
		/>
	</div>
</div>
