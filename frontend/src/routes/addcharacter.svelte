<script>
	import { Input, Dropdown, DropdownItem, Radio } from 'flowbite-svelte';
	import { curruser } from '../stores/store';
	let character = {
		lastname: '',
		firstname: '',
		gender: '',
		role: '',
		age: 0,
		description: ''
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
			alert('An error Try Again');
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
<div class="relative flex h-full w-full">
	<div class="h-screen w-1/2 bg-black">
		<div class="mx-auto flex h-full w-2/3 flex-col justify-center text-white xl:w-1/2">
			<div class="mt-10">
				<form on:submit|preventDefault={handleadd}>
					<div>
						<label class="mb-2.5 block font-extrabold" for="title">First Name</label>
						<input
							type="text"
							id="firstname"
							bind:value={character.firstname}
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="First Name"
						/>
					</div>
					<div>
						<label class="mb-2.5 block font-extrabold" for="title">Last Name</label>
						<input
							type="text"
							id="lastname"
							bind:value={character.lastname}
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="Last Name"
						/>
					</div>
					<div>
						<label class="mb-2.5 block font-extrabold" for="title">Age</label>
						<input
							type="number"
							id="firstname"
							bind:value={character.age}
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="Age"
						/>
					</div>
					<br />
					<div class="grid grid-cols-2 divide-x">
						<div>
							<Dropdown label=" Choose Role" class="w-60" color="white" size="l">
								<ul slot="content" class="p-3">
									<DropdownItem
										class="rounded"
										liClass="p-2 hover:bg-gray-100 dark:hover:bg-gray-600"
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
							<div>
								<Dropdown label=" Choose Gender" class="w-60" color="white" size="l">
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
						<label for="sys" class="mb-2.5 block font-extrabold ">Description</label>
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
							<label class="mb-2.5 block font-extrabold" for="File">Character Picture</label>
							<input
								type="file"
								bind:files={image}
								id="avatar"
								name="avatar"
								accept="image/png, image/jpeg"
							/>
						</div>
						<div class="my-10">
							<input
								type="submit"
								id="submit"
								class="w-full rounded-full bg-orange-600 p-5 hover:bg-orange-800"
							/>
						</div>
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
