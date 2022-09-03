<script context="module">
	export async function load({ url }) {
		let animes;
		let response;
		response = await fetch('http://localhost:5000/anime');
		if (response.status === 200) {
			animes = await response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}

		return { props: { animes } };
	}
</script>

<script>
	import { Dropdown, DropdownItem, Radio } from 'flowbite-svelte';
	import { curruser } from '../stores/store';
	import { goto } from '$app/navigation';
	export let animes;
	// console.log(animes);
	let personnel = {
		lastname: '',
		firstname: '',
		gender: '',
		birthday: '',
		address: '',
		website: '',
		anime: []
	};
	let image;
	async function proxyaddpersonnel() {
		const dataArray = new FormData();
		dataArray.append('lastname', personnel.lastname);
		dataArray.append('firstname', personnel.firstname);
		dataArray.append('gender', personnel.gender);
		dataArray.append('birthday', personnel.birthday);
		dataArray.append('address', personnel.address);
		dataArray.append('website', personnel.website);
		dataArray.append('anime', personnel.anime);
		dataArray.append('image', image[0]);
		// for (var key of dataArray.entries()) {
		// 	console.log(key[0] + ', ' + key[1]);
		// }
		// console.log(personnel);
		//console.log(dataArray);
		let endpoint = 'http://localhost:5000/personnel';
		const response = await fetch(endpoint, {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + $curruser.token
				// like application/json or text/xml
			},
			body: dataArray
		});
		// console.log(response);
		// console.log(await response.json());
		personnel = {
			lastname: '',
			firstname: '',
			gender: '',
			birthday: '',
			address: '',
			website: '',
			anime: []
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
		let temp = await proxyaddpersonnel();

		if (temp.success == false) {
			alert('Could not Add');
		} else {
			alert('Successfully Added Personnel');
			goto('/allpersonnel');
			// console.log(temp);
		}
	}
</script>

<svelte:head>
	<title>Add Personnel</title>
</svelte:head>
<div class="relative flex h-full w-full bg-solarizedBase3 text-solarizedBase02">
	<div class="h-full w-1/2 ">
		<div class="mx-auto flex h-full w-2/3 flex-col justify-center  xl:w-1/2">
			<div class="mt-10">
				<h2 class="text-2xl font-bold">Add Personnel</h2>

				<form on:submit|preventDefault={handleadd}>
					<div>
						<label class="mb-2.0 block text-lg font-bold" for="title">First Name</label>
						<input
							type="text"
							id="firstname"
							bind:value={personnel.firstname}
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="First Name"
							required
						/>
					</div>
					<div>
						<label class="mb-2.0 block text-lg font-bold" for="title">Last Name</label>
						<input
							type="text"
							id="lastname"
							bind:value={personnel.lastname}
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="Last Name"
							required
						/>
					</div>
					<br />
					<h2 class="text-lg font-bold">Choose Gender</h2>
					<Dropdown label={personnel.gender} class="w-60" color="white" size="l" required>
						<ul slot="content" class="p-3">
							<DropdownItem class="rounded" liClass="p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
								<Radio bind:group={personnel.gender} name="dropdown" value={'M'} tinted>Male</Radio>
								<Radio bind:group={personnel.gender} name="dropdown" value={'F'} tinted
									>Female</Radio
								>
							</DropdownItem>
						</ul>
					</Dropdown>
					<br />
					<div>
						<label class="mb-2.0 block text-lg font-bold" for="title">Address</label>
						<input
							type="text"
							id="address"
							bind:value={personnel.address}
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
							bind:value={personnel.website}
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="website address"
							required
						/>
					</div>
					<div>
						<label class="mb-2.0 block text-lg font-bold" for="release date">BirthDay</label>
						<input
							type="date"
							id="Birthdate"
							bind:value={personnel.birthday}
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="YYYY-MM-DD"
							required
						/>
					</div>
					<br />
					<div>
						<label class="mb-2.0 block text-lg font-bold" for="File">Personnel Picture</label>
						<input
							type="file"
							bind:files={image}
							id="avatar"
							name="avatar"
							accept="image/png, image/jpeg image/jpg"
							required
						/>
					</div>
				</form>
			</div>
		</div>
	</div>
	<div class="h-full w-1/2 ">
		<div class="mx-auto flex h-full w-2/3 flex-col justify-center  xl:w-1/2">
			<div class="mt-10 text-xl">
				<form on:submit|preventDefault={handleadd} required>
					<div>
						<label class="mb-2.5 block text-lg font-bold" for="title">Select Anime</label>
						<select multiple bind:value={personnel.anime} class="text-black" required>
							{#each animes.results as an}
								<option value={an.animeid}>
									{an.title}
								</option>
							{/each}
						</select>
					</div>
					<div class="my-10">
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
</div>
