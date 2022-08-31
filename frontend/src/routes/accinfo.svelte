<script>
	import { Spinner } from 'flowbite-svelte';
	import { curruser, state } from '../stores/store';
	import { goto } from '$app/navigation';
	let endpoint = 'http://localhost:5000/users/' + $curruser.name;
	let image = 'http://localhost:5000/uploads/images/';
	let res = {
		success: false,
		user: { userid: '', email: '', biography: '', pictureid: '', admin: '' }
	};
	async function proxyfetchuserinfo() {
		const response = await fetch(endpoint);
		if (response.status === 200) {
			return await response.json();
		} else {
			alert('An error occured Try Again');
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
	}
	async function proxydelete() {
		let endpoint = 'http://localhost:5000/users/' + $curruser.name;
		const response = await fetch(endpoint, {
			method: 'DELETE',
			headers: {
				Authorization: 'Bearer ' + $curruser.token
				// like application/json or text/xml
			}
		});
		console.log(response);
		if (response.status === 201) {
			return await response.json();
		} else {
			alert('An error Try Again');
			throw new Error(response.statusText);
		}
	}
	async function handledelete() {
		let temp = await proxydelete();

		if (temp.success == false) {
			alert('Could not Add');
		} else {
			state.set(0);
			curruser.set({
				name: '',
				mail: '',
				image: '',
				token: '',
				admin: false
			});
			console.log(temp);
			goto('/');
		}
	}
</script>

<svelte:head>
	<title>Account Information</title>
</svelte:head>

{#await fetchuserinfo()}
	<div class="text-center"><Spinner size="10" color="red" /></div>
{:then}
	<div class="flex justify-center text-center bg-solarizedBase3 text-solarizedBase02">
		<div class="grid grid-cols-1 md:grid-cols-2 text-center">
			<div class="mt-10">
				<div class="flex justify-center">
					<img class="h-52 rounded-full mb-4" src={image} alt="person pic" />
				</div>
				<div class="animate-fade-in-down mb-1 text-center text-2xl">
					{res.user.userid}
				</div>
				<div class="animate-fade-in-down mb-1 text-center text-lg text-solarizedBlue">
					{res.user.email}
				</div>
				<blockquote>
					<p class="animate-fade-in-down mx-12 mb-9 text-center text-sm">
						{res.user.biography}
					</p>
				</blockquote>
				<div class="flex justify-center">
					<a href="/editacc">
						<button
							class="p-2 inline  text-xl font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-2xl focus:outline-none bg-green-600 active:bg-red-600 hover:bg-red-700"
							>Edit Account Information</button
						>
					</a>
					<br />
					<p>&nbsp</p>
					<button
						on:click={handledelete}
						class="p-2 inline  text-xl font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-2xl focus:outline-none bg-red-900 active:bg-red-600 hover:bg-red-700"
						>Delete Account</button
					>
				</div>
			</div>
		</div>
	</div>
{/await}
