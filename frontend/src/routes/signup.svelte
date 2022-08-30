<script>
	import { goto } from '$app/navigation';
	import { Helper, Input } from 'flowbite-svelte';
	let user = {
		name: '',
		password: '',
		con_password: '',
		email: '',
		bio: ''
	};
	let image;
	let check = false;
	$: {
		if (user.password == user.con_password) {
			check = true;
		} else {
			check = false;
		}
	}
	async function proxysignup() {
		const dataArray = new FormData();
		dataArray.append('name', user.name);
		dataArray.append('password', user.password);
		dataArray.append('email', user.email);
		dataArray.append('bio', user.bio);
		dataArray.append('image', image[0]);
		for (var key of dataArray.entries()) {
			console.log(key[0] + ', ' + key[1]);
		}
		console.log(user);
		//console.log(dataArray);
		let endpoint = 'http://localhost:5000/users/signup';
		const response = await fetch(endpoint, {
			method: 'POST',
			headers: {
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

	async function handlesignup() {
		let temp = await proxysignup();

		if (temp.success == false) {
			alert('Could not Add');
		} else {
			console.log(temp);
			goto('/');
		}
	}
</script>

<svelte:head>
	<title>Sign up</title>
</svelte:head>
<div class="relative flex h-full w-full bg-solarizedBase3 text-solarizedBase02">
	<div class="h-full w-1/2 ">
		<div class="mx-auto flex h-full w-2/3 flex-col justify-center  xl:w-1/2">
			<div>
				<p class="text-2xl font-bold">Sign up with Anidex</p>
			</div>
			<div class="mt-10">
				<form on:submit|preventDefault={handlesignup}>
					<div>
						<label class="mb-2.5 block font-bold" for="title">User ID</label>
						<input
							type="text"
							id="name"
							bind:value={user.name}
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="Name"
						/>
					</div>
					<div>
						<label class="mb-2.5 block font-bold" for="release date">Email</label>
						<input
							type="email"
							id="email"
							bind:value={user.email}
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="user@test.com"
						/>
					</div>
					<div>
						<label class="mb-2.5 block font-bold" for="release date">Create Password</label>
						<input
							type="password"
							id="password"
							bind:value={user.password}
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="Password"
						/>
					</div>
					<div>
						<label class="mb-2.5 block font-bold" for="release date">Confirm Password</label>
						<input
							type="password"
							id="con_password"
							bind:value={user.con_password}
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="Confirm Password"
						/>
					</div>
					{#if check == false}
						<Helper class="mt-2" color="red"
							><span class="font-medium">Passwords Do Not Match</span></Helper
						>
					{/if}
					<div>
						<label for="sys" class="mb-2.5 block font-bold ">Bio</label>
						<Input bind:value={user.bio} id="sys" size="lg" placeholder="Bio" />
					</div>
					<div>
						<label class="mb-2.5 block font-bold" for="File">Upload Picture</label>
						<input
							type="file"
							bind:files={image}
							id="avatar"
							name="avatar"
							accept="image/png, image/jpeg"
						/>
					</div>
					<div class="my-10 flex justify-center">
						<input
							type="submit"
							id="submit"
							class=" rounded-2xl text-xl font-medium text-solarizedBase2 bg-solarizedRed px-3 py-1 hover:bg-red-500"
						/>
					</div>
				</form>
			</div>
		</div>
	</div>
	<div class="h-full w-1/2 ">
		<img
			src="http://localhost:5000/uploads/images/signup.jpg"
			class="object-cover h-full w-full"
			alt="logo"
		/>
	</div>
</div>
