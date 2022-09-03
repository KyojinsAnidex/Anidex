<script>
	import { curruser } from './../stores/store.js';
	import { goto } from '$app/navigation';
	let studio = {
		studioname: '',
		office_address: '',
		website: ''
	};
	async function proxyhandleadd() {
		const response = await fetch('http://localhost:5000/studios', {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + $curruser.token,
				'Content-Type': 'application/json'

				// like application/json or text/xml
			},
			body: JSON.stringify({
				// Example: Update JSON file with
				//          local data properties
				studioname: studio.studioname,
				office_address: studio.office_address,
				website: studio.website

				// etc.
			})
		});
		studio = {
			studioname: '',
			office_address: '',
			website: ''
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
		let temp = await proxyhandleadd();

		if (temp.success == false) {
			alert('Could not Add');
		} else {
			console.log(temp);
			alert('Successfully Added');
			goto('/allstudio');
		}
	}
</script>

<svelte:head>
	<title>Add Studio</title>
</svelte:head>
<div class="relative flex h-screen w-full">
	<div class="h-screen w-1/2 items-center bg-solarizedBase3 text-solarizedBase02">
		<div class="mx-auto flex h-screen w-2/3 flex-col justify-center  xl:w-1/2">
			<h2 class="text-2xl flex justify-center font-bold">Add Studio</h2>

			<div class="mt-10">
				<form on:submit|preventDefault={handleadd}>
					<div>
						<label class="mb-2.0 block text-lg font-bold" for="title">Studio Name</label>
						<input
							type="text"
							id="firstname"
							bind:value={studio.studioname}
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="Name"
							required
						/>
					</div>
					<div>
						<label class="mb-2.0 block text-lg font-bold" for="title">Address</label>
						<input
							type="text"
							id="address"
							bind:value={studio.office_address}
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="Address"
							required
						/>
					</div>
					<div>
						<label class="mb-2.0 block text-lg font-bold" for="title">Website</label>
						<input
							type="url"
							id="website"
							bind:value={studio.website}
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="website address"
							required
						/>
					</div>

					<div class="my-5 flex justify-center">
						<input
							type="submit"
							id="submit"
							class="px-5 py-2 rounded-2xl text-xl font-bold text-white bg-red-900  hover:bg-red-500"
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
