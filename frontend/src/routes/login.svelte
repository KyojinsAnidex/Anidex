<script>
	import { goto } from '$app/navigation';
	import { curruser, state,search } from '../stores/store';
	let user = {
		name: '',
		email: '',
		password: ''
	};
	let image = 'http://localhost:5000/uploads/images/';
	let res = {
		success: false,
		user: { userid: '', email: '', biography: '', pictureid: '', admin: '' }
	};
	async function proxyfetchuserinfo() {
		let endpoint = 'http://localhost:5000/users/' + user.name;
		const response = await fetch(endpoint);
		if (response.status === 200) {
			return await response.json();
		} else {
			let errorMessage = await response.json();
			// console.log();
			alert('An error occurred: ' + errorMessage.message);

			throw new Error(response.statusText);
		}
	}

	async function fetchuserinfo() {
		let temp = await proxyfetchuserinfo();

		if (temp.success == false) {
			alert('User Not Found');
		} else {
			res = temp;
			image = image + res.user.pictureid;
		}
		return image;
	}
	async function proxyhandlelogin() {
		const response = await fetch('http://localhost:5000/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
				// like application/json or text/xml
			},
			body: JSON.stringify({
				// Example: Update JSON file with
				//          local data properties
				name: user.name,
				email: user.email,
				password: user.password
				// etc.
			})
		});
		if (response.status === 200) {
			return await response.json();
		}
		else {
			user.name = '';
			user.email = '';
			user.password = '';
			let errorMessage = await response.json();
			// console.log();
			alert('An error occurred: ' + errorMessage.message);

			throw new Error(response.statusText);
		}
	}
	async function handlelogin() {
		let temp = {
			success: false,
			userid: '',
			email: '',
			token: '',
			admin: false
		};
		temp = await proxyhandlelogin();
		if (temp.success == false) {
			alert('Could not log in. Try Again');
			user.name = '';
			user.email = '';
			user.password = '';
		} else if (temp.success == true) {
			alert('Logged in');
			state.set(1);
			$curruser.name = temp.userid;
			$curruser.mail = temp.email;
			$curruser.token = temp.token;
			$curruser.admin = temp.admin;
			
		search.set({
			txt: '',
			type: ''
		});
		
			//console.log($curruser);
			//console.log(user);
			$curruser.image = await fetchuserinfo();
			//console.log($curruser.image);
			goto('/');
		}
	}
</script>

<svelte:head>
	<title>Log Into Anidex</title>
</svelte:head>

<div class="relative flex h-full w-full bg-solarizedBase3 text-solarizedBase02">
	<div class="h-full w-1/2 ">
		<div class="mx-auto flex h-full w-2/3 flex-col justify-center text-solarizedBase02 xl:w-1/2">
			<div>
				<p class="text-2xl font-bold">Login</p>
				<p>Please login to continue</p>
			</div>
			<div class="mt-10">
				<form on:submit|preventDefault={handlelogin}>
					<div>
						<label class="mb-2.5 block font-bold" for="Name">Name</label>
						<input
							type="text"
							bind:value={user.name}
							id="name"
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="username"
						/>
					</div>
					<div>
						<label class="mb-2.5 block font-bold" for="email">Email</label>
						<input
							type="email"
							bind:value={user.email}
							id="email"
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="mail@user.com"
						/>
					</div>
					<div class="mt-4">
						<label class="mb-2.5 block font-bold" for="password">Password</label>
						<input
							type="password"
							bind:value={user.password}
							id="password"
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow"
						/>
					</div>
					<div class="my-10 flex justify-center">
						<input
							type="submit"
							id="submit"
							class="rounded-2xl text-xl font-medium text-white bg-solarizedRed px-5 py-2 hover:bg-red-500"
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
