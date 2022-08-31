<script context="module">
	export async function load({ url }) {
		let animes, personnels;
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
		return { props: { animes, personnels } };
	}
</script>

<script>
	import { Input, Dropdown, DropdownItem, Radio } from 'flowbite-svelte';
	export let animes, personnels;
	// console.log(animes);
	// console.log(personnels);

	import { curruser } from '../stores/store';
	let character = {
		lastname: '',
		firstname: '',
		gender: '',
		role: '',
		age: 0,
		description: '',
		voiceactors: [],
		anime: []
	};
	let image;
	async function proxyaddcharacter() {
		const dataArray = new FormData();
		dataArray.append('lastname', character.lastname);
		dataArray.append('firstname', character.firstname);
		dataArray.append('gender', character.gender);
		dataArray.append('role', character.role);
		dataArray.append('age', character.age);
		dataArray.append('description', character.description);
		dataArray.append('voiceactors', character.voiceactors);
		dataArray.append('anime', character.anime);
		dataArray.append('image', image[0]);
		for (var key of dataArray.entries()) {
			console.log(key[0] + ', ' + key[1]);
		}
		console.log(character);
		//console.log(dataArray);
		let endpoint = 'http://localhost:5000/characters';
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
			let errorMessage = await response.json();
			// console.log();
			alert('An error occurred: ' + errorMessage.message);

			throw new Error(response.statusText);
		}
	}

	async function handleadd() {
		let temp = await proxyaddcharacter();

		if (temp.success == false) {
			alert('Could not Add');
		} else {
			console.log(temp);
		}
	}
</script>

<svelte:head>
	<title>Add Character</title>
</svelte:head>
<div class="flex h-full w-full items-stretch bg-solarizedBase3 text-solarizedBase02">
	<div class="h-full w-1/2 ">
		<div class="mx-auto flex h-full w-2/3 flex-col justify-center xl:w-1/2">
			<div class="mt-10">
				<h2 class="text-2xl font-bold">Add Character</h2>

				<form on:submit|preventDefault={handleadd}>
					<div>
						<label class="mb-2.5 block font-bold" for="title">First Name</label>
						<input
							type="text"
							id="firstname"
							bind:value={character.firstname}
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none  placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="First Name"
						/>
					</div>
					<div>
						<label class="mb-2.5 block font-bold" for="title">Last Name</label>
						<input
							type="text"
							id="lastname"
							bind:value={character.lastname}
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none  placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="Last Name"
						/>
					</div>
					<div>
						<label class="mb-2.5 block font-bold" for="title">Age</label>
						<input
							type="number"
							id="firstname"
							bind:value={character.age}
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none  placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="Age"
						/>
					</div>
					<br />
					<div class="grid grid-cols-2 divide-x items-center">
						<div class="font-bold">
							Role
							<Dropdown label={character.role} class="w-60" color="white" size="l">
								<ul slot="content" class="p-3">
									<DropdownItem
										class="rounded"
										liClass="p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
									>
										<Radio bind:group={character.role} name="dropdown" value={'Main'} tinted
											>Main</Radio
										>
										<Radio bind:group={character.role} name="dropdown" value={'Protagonist'} tinted
											>Protagonist</Radio
										>
										<Radio bind:group={character.role} name="dropdown" value={'Antagonist'} tinted
											>Antagonist</Radio
										>
										<Radio bind:group={character.role} name="dropdown" value={'Supporting'} tinted
											>Supporting</Radio
										>
									</DropdownItem>
								</ul>
							</Dropdown>
							<div class="font-bold">
								Gender
								<Dropdown label={character.gender} class="w-60" color="white" size="l">
									<ul slot="content" class="p-3">
										<DropdownItem
											class="rounded"
											liClass="p-2 hover:bg-gray-100 dark:hover:bg-gray-600"
										>
											<Radio bind:group={character.gender} name="dropdown" value={'M'} tinted
												>Male</Radio
											>
											<Radio bind:group={character.gender} name="dropdown" value={'F'} tinted
												>Female</Radio
											>
										</DropdownItem>
									</ul>
								</Dropdown>
							</div>
						</div>
					</div>
					<div>
						<label for="sys" class="mb-2.5 block font-bold ">Character Description</label>
						<Input
							bind:value={character.description}
							id="sys"
							size="lg"
							placeholder="Description"
						/>
					</div>
					<br />
					<div>
						<div>
							<label class="mb-2.5 block font-bold" for="File">Character Picture</label>
							<input
								type="file"
								bind:files={image}
								id="avatar"
								name="avatar"
								accept="image/png, image/jpeg"
							/>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>

	<div class="h-full w-1/2 bg-solarizedBase3 text-solarizedBase02 items-center justify-center">
		<div class="mx-auto flex h-full w-2/3 flex-col  justify-center  xl:w-1/2">
			<div class="mt-10">
				<form on:submit|preventDefault={handleadd}>
					<div>
						<label class="mb-2.5 block font-bold" for="title">Select Anime</label>
						<select multiple bind:value={character.anime} class="text-solarizedBase02">
							{#each animes.results as an}
								<option value={an.animeid}>
									{an.title}
								</option>
							{/each}
						</select>
					</div>
					<div>
						<label class="mb-2.5 block font-bold" for="title">Select Voice Actor</label>
						<select multiple bind:value={character.voiceactors} class="text-solarizedBase02">
							{#each personnels.personnels as per}
								<option value={per.personnelid}>
									{per.firstname + '  ' + per.lastname}
								</option>
							{/each}
						</select>
					</div>
					<div class="my-10 text-xl font-bold  align-middle">
						<input
							type="submit"
							id="submit"
							class="w-2/5 align-middle rounded-2xl text-white bg-solarizedRed p-2 hover:bg-red-500"
						/>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
