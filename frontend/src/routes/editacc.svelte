<script>
	import { curruser } from './../stores/store.js';
	import { Helper, Input } from 'flowbite-svelte';
	let user = {
		oldname: '',
		newname: '',
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
	async function proxyedit() {
		const dataArray = new FormData();
		dataArray.append('name', user.oldname);
		dataArray.append('newUserid', user.newname);
		dataArray.append('password', user.password);
		dataArray.append('email', user.email);
		dataArray.append('bio', user.bio);
		dataArray.append('image', image[0]);
		// for (var key of dataArray.entries()) {
		// 	console.log(key[0] + ', ' + key[1]);
		// }
		// console.log(user);
		//console.log(dataArray);
		let endpoint = 'http://localhost:5000/users/' + $curruser.name;
		const response = await fetch(endpoint, {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + $curruser.token
				// like application/json or text/xml
			},
			body: dataArray
		});
		// console.log(response);
		if (response.status === 201) {
			return await response.json();
		} else {
			let errorMessage = await response.json();
			// console.log();
			alert('An error occurred: ' + errorMessage.message);

			throw new Error(response.statusText);
		}
	}

	async function handleedit() {
		let temp = await proxyedit();

		if (temp.success == false) {
			alert('Could not Add');
		} else {
			$curruser.name = user.newname;
			// console.log(temp);
		}
	}
</script>

<svelte:head>
	<title>Edit Account</title>
</svelte:head>
<div class="relative flex h-full w-full bg-solarizedBase3 text-solarizedBase02">
	<div class="h-full w-1/2 ">
		<div class="mx-auto flex h-full w-2/3 flex-col justify-center xl:w-1/2">
			<div class="mt-10">
				<form on:submit|preventDefault={handleedit}>
					<div>
						<label class="mb-2.5 block font-bold" for="title"> Old User ID</label>
						<input
							type="text"
							id="oldname"
							bind:value={user.oldname}
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="Old Name"
							required
						/>
					</div>
					<div>
						<label class="mb-2.5 block font-bold" for="title">New User ID</label>
						<input
							type="text"
							id="newname"
							bind:value={user.newname}
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder=" New Name"
							required
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
							required
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
							required
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
							required
						/>
					</div>
					{#if check == false}
						<Helper class="mt-2" color="red"
							><span class="font-medium">Passwords Do Not Match</span></Helper
						>
					{/if}
					<div>
						<label for="sys" class="mb-2.5 block font-bold ">Bio</label>
						<Input bind:value={user.bio} id="sys" size="lg" placeholder="Bio" required />
					</div>
					<div>
						<label class="mb-2.5 block font-bold" for="File">Upload Picture</label>
						<input
							type="file"
							bind:files={image}
							id="avatar"
							name="avatar"
							accept="image/png, image/jpeg, image/jpg"
							required
						/>
					</div>
					<div class="my-10 flex justify-center">
						<input
							type="submit"
							id="submit"
							class="px-5 inline py-2 text-lg font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-2xl focus:outline-none bg-solarizedRed active:bg-red-900 hover:bg-red-900"
						/>
					</div>
				</form>
			</div>
		</div>
	</div>
	<div class="h-full w-1/2 bg-blue-600">
		<img
			src="http://localhost:5000/uploads/images/signup.jpg"
			class="object-cover h-full w-full"
			alt="logo"
		/>
	</div>
</div>
