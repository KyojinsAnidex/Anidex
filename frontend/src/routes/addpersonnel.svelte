<script>
	import { Dropdown, DropdownItem, Radio } from 'flowbite-svelte';
	import { curruser } from '../stores/store';
	let personnel = {
		lastname: '',
		firstname: '',
		gender: '',
		birthday: '',
		address:'',
		website:''
	};
	let image;
	async function proxyaddpersonnel() {
		const dataArray = new FormData();
		dataArray.append('lastname',personnel.lastname);
		dataArray.append('firstname', personnel.firstname);
		dataArray.append('gender', personnel.gender);
		dataArray.append('birthday', personnel.birthday);
		dataArray.append('address', personnel.address);
		dataArray.append('website', personnel.website);
		dataArray.append('image', image[0]);
		for (var key of dataArray.entries()) {
			console.log(key[0] + ', ' + key[1]);
		}
		console.log(personnel);
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
		console.log(response);
		if (response.status === 201) {
			return await response.json();
		} else {
			alert('An error Try Again');
			throw new Error(response.statusText);
		}
	}

	async function handleadd() {
		let temp = await proxyaddpersonnel();

		if (temp.success == false) {
			alert('Could not Add');
		} else {
			console.log(temp);
		}
	}
</script>

<svelte:head>
	<title>Add Personnel</title>
</svelte:head>
<div class="relative flex h-full w-full">
	<div class="h-screen w-1/2 bg-black">
		<div class="mx-auto flex h-full w-2/3 flex-col justify-center text-white xl:w-1/2">
			
			<div class="mt-10">
				<form on:submit|preventDefault={handleadd}>
					<div>
						<label class="mb-2.0 block font-extrabold" for="title">First Name</label>
						<input
							type="text"
							id="firstname"
							bind:value={personnel.firstname}
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="First Name"
						/>
					</div>
                    <div>
						<label class="mb-2.0 block font-extrabold" for="title">Last Name</label>
						<input
							type="text"
							id="lastname"
							bind:value={personnel.lastname}
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="Last Name"
						/>
					</div>
                    <br />
					<Dropdown label=" Choose Gender" class="w-60" color="white" size="l">
						<ul slot="content" class="p-3">
							<DropdownItem class="rounded" liClass="p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
								<Radio bind:group={personnel.gender} name="dropdown" value={'M'} tinted
									>Male</Radio
								>
                                <Radio bind:group={personnel.gender} name="dropdown" value={'F'} tinted
									>Female</Radio
								>
                            </DropdownItem>
						</ul>
					</Dropdown>
                    <br>
					<div>
						<label class="mb-2.0 block font-extrabold" for="title">Address</label>
						<input
							type="text"
							id="address"
							bind:value={personnel.address}
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="Address"
						/>
					</div>
					<div>
						<label class="mb-2.0 block font-extrabold" for="title">Website</label>
						<input
							type="url"
							id="website"
							bind:value={personnel.website}
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="website address"
						/>
					</div>
					<div>
						<label class="mb-2.0 block font-extrabold" for="release date">BirthDay</label>
						<input
							type="text"
							id="Birthdate"
							bind:value={personnel.birthday}
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="YEAR-MM-DATE"
						/>
                    </div>
                    <br>
					<div>
						<label class="mb-2.0 block font-extrabold" for="File">Personnel Picture</label>
						<input type="file" bind:files={image} id="avatar" name="avatar" accept="image/png, image/jpeg" />
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
