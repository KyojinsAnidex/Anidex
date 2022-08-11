<script>
	import { curruser, state } from '../stores/store';
	let user = {
		name: '',
		email: '',
		password: ''
	};
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
		} else {
			user.name = '';
			user.email = '';
			user.password = '';
			alert('Could Not log in Try Again');
			throw new Error(response.statusText);
		}
	}
	async function handlelogin() {
		console.log(user.name);
		console.log(user.email);
		console.log(user.password);
		let temp = {
			success: false,
			name: '',
			email: '',
			password: ''
		};
		temp = await proxyhandlelogin();
		if (temp.success == false) {
			alert('Could Not log up Try Again');
			user.name = '';
			user.email = '';
			user.password = '';
		} else if (temp.success == true) {
			alert('Logged in');
			state.set(1);
			$curruser.name = user.name;
			$curruser.mail = user.email;
			console.log($curruser);
			console.log(user);
			user.name = '';
			user.email = '';
			user.password = '';
		}
	}
</script>

<svelte:head>
	<title>Log in</title>
</svelte:head>

<div class="relative flex h-full w-full">
	<div class="h-screen w-1/2 bg-black">
		<div class="mx-auto flex h-full w-2/3 flex-col justify-center text-white xl:w-1/2">
			<div>
				<p class="text-2xl">Login</p>
				<p>please login to continue</p>
			</div>
			<div class="mt-10">
				<form on:submit|preventDefault={handlelogin}>
					<div>
						<label class="mb-2.5 block font-extrabold" for="Name">Name</label>
						<input
							type="text"
							bind:value={user.name}
							id="name"
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="username"
						/>
					</div>
					<div>
						<label class="mb-2.5 block font-extrabold" for="email">Email</label>
						<input
							type="email"
							bind:value={user.email}
							id="email"
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="mail@user.com"
						/>
					</div>
					<div class="mt-4">
						<label class="mb-2.5 block font-extrabold" for="password">Password</label>
						<input
							type="password"
							bind:value={user.password}
							id="password"
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow"
						/>
					</div>
					<div class="my-10">
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
		<img src="http://localhost:5000/uploads/images/login.jpg" class="object-cover h-full w-full" alt="logo" />
	</div>
</div>
