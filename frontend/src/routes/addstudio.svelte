<script>
	import { curruser } from './../stores/store.js';
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
		if (response.status === 201) {
			return await response.json();
		} else {
			
			alert('Could Not Add Studio Try Again');
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
	<title>Add Studio</title>
</svelte:head>
<div class="relative flex h-full w-full">
	<div class="h-screen w-1/2 bg-black">
		<div class="mx-auto flex h-full w-2/3 flex-col justify-center text-white xl:w-1/2">
			
			<div class="mt-10">
				<form on:submit|preventDefault={handleadd}>
					<div>
						<label class="mb-2.0 block font-extrabold" for="title">Studio Name</label>
						<input
							type="text"
							id="firstname"
							bind:value={studio.studioname}
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="Name"
						/>
					</div>
                    <div>
						<label class="mb-2.0 block font-extrabold" for="title">Address</label>
						<input
							type="text"
							id="address"
							bind:value={studio.office_address}
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="Address"
						/>
					</div>
					<div>
						<label class="mb-2.0 block font-extrabold" for="title">Website</label>
						<input
							type="url"
							id="website"
							bind:value={studio.website}
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="website address"
						/>
					</div>
				
					<div class="my-5">
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
			src="http://localhost:5000/uploads/images/signup.jpg"
			class="object-cover h-full w-full"
			alt="logo"
		/>
	</div>
</div>

