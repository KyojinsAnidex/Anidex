<script>
	import { curruser } from './../stores/store.js';
	let genre = {
		genre: ''
	};
	async function proxyhandleadd() {
		const response = await fetch('http://localhost:5000/genre', {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + $curruser.token,
				'Content-Type': 'application/json'

				// like application/json or text/xml
			},
			body: JSON.stringify({
				// Example: Update JSON file with
				//          local data properties
				genre: genre.genre
				// etc.
			})
		});
		if (response.status === 201) {
			return await response.json();
		}else {
			let errorMessage = await response.json();
			// console.log();
			alert('An error occurred: ' + errorMessage.message);

			throw new Error(response.statusText);
		}
	}
	async function handleadd() {
		let temp = await proxyhandleadd();

		if (temp.success == false) {
			alert('Could not Add');
		} else {
			console.log(temp);
		}
	}
</script>

<svelte:head>
	<title>Add Genre</title>
</svelte:head>
<div class="relative flex h-full w-full">
	<div class="h-screen w-1/2 bg-white">
		<div class="mx-auto flex h-full w-2/3 flex-col justify-center text-black xl:w-1/2">
			<div class="mt-10">
				<h2 class="text-2xl font-bold">Add Genre</h2>
		
				<form on:submit|preventDefault={handleadd}>
					<div>
						<label class="mb-2.0  text-xl font-bold flex justify-center" for="title">Genre</label>
						<input
							type="text"
							id="firstname"
							bind:value={genre.genre}
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="Genre Name"
						/>
					</div>
					<div class="my-5 ">
						<input
							type="submit"
							id="submit"
							class="w-2/5 rounded-2xl text-white text-xl font-bold bg-red-900 p-2 align-center hover:bg-red-500"
						/>
					</div>
				</form>
			</div>
		</div>
	</div>
	<div class="h-screen w-1/2 bg-blue-600">
		<img
			src="http://localhost:5000/uploads/images/signup.jpg"
			class="object-cover h-full w-full"
			alt="logo"
		/>
	</div>
</div>
