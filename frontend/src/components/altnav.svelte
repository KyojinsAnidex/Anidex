<script>
	import { goto } from '$app/navigation';
	import { state, curruser, search } from './../stores/store.js';
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Dropdown,
		DropdownHeader,
		Avatar,
		DropdownItem,
		DropdownDivider,
		Radio,
		Button,
		Input,
		Alert
	} from 'flowbite-svelte';
	import { Search, SimpleSearch, VoiceSearch } from 'flowbite-svelte';

	let logchoice = 0;
	function handlelogout() {
		state.set(0);
		curruser.set({
			name: '',
			mail: '',
			image: '',
			token: '',
			admin: false
		});
		search.set({
			txt: '',
			type: ''
		});
		goto('/');
		resetalert();
	}
	function logout() {
		logchoice = 1;
	}
	function resetalert() {
		logchoice = 0;
	}
	function handleSearch() {
		let next = '';
		if ($search.type === 'anime') {
			next = 'http://127.0.0.1:5173/animesearchresult';
		} else {
			next = '/' + $search.type + 'search';
		}
		// console.log("ki hocce ");
		// console.log($search.type);
		// console.log(next);
		console.log($search.txt);
		// goto(next);
	}
	let genres;
	async function getgenres() {
		let response;
		response = await fetch('http://localhost:5000/genre');
		if (response.status === 200) {
			genres = await response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
	}
</script>

{#await getgenres() then}
	{#if logchoice == 1}
		<Alert>
			<div class="flex justify-center text-solarizedYellow bg-solarizedBase02" />
			<span class="text-lg text-center font-medium text-solarizedRed dark:text-blue-800"
				>Do You Really Wish To Log Out?</span
			>
			<Button on:click={handlelogout} size="xs" outline color="blue">Yes</Button>
			<Button on:click={resetalert} size="xs" outline color="blue">No</Button>
		</Alert>
	{/if}
	<Navbar
		navClass="text-solarizedYellow bg-solarizedBase02  px-2 sm:px-4 py-2.5 dark:bg-gray-800"
		navDivClass="mx-auto flex flex-wrap  justify-between items-center text-solarizedYellow bg-solarizedBase02 "
		let:hidden
		let:toggle
		rounded={true}
	>
		<NavBrand href="/">
			<img
				src="http://localhost:5000/uploads/images/anidex.jpg"
				class="mr-3 h-6 sm:h-9"
				alt="Anidex Logo"
			/>
			<span class="self-center whitespace-nowrap text-base font-bold dark:text-white">
				Anidex
			</span>
		</NavBrand>
		<NavUl
			divClass="w-full items-center md:block md:w-auto flex justify-end text-base font-bold text-solarizedYellow bg-solarizedBase02"
			ulClass="text-base font-bold text-solarizedYellow bg-solarizedBase02 flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-xl md:font-medium"
			{hidden}
		>
			<Dropdown labelClass="rounded-3xl" label={$search.type} class=" z-50 rounded-3xl">
				<ul slot="content" class="p-3 space-y-1">
					<DropdownItem class="rounded" liClass="p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
						<Radio bind:group={$search.type} value={'anime'}>Anime</Radio>
					</DropdownItem>
					<DropdownItem class="rounded" liClass="p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
						<Radio bind:group={$search.type} value={'character'}>Character</Radio>
					</DropdownItem>
					<DropdownItem class="rounded" liClass="p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
						<Radio bind:group={$search.type} value={'user'}>User</Radio>
					</DropdownItem>
					<DropdownItem class="rounded" liClass="p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
						<Radio bind:group={$search.type} value={'studio'}>Studio</Radio>
					</DropdownItem>
					<DropdownItem class="rounded" liClass="p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
						<Radio bind:group={$search.type} value={'personnel'}>Personnel</Radio>
					</DropdownItem>
				</ul>
			</Dropdown>
			<!-- <Search bind:value = {$search.txt} on:submit={handleSearch} /> -->
			<Input bind:value={$search.txt} noBorder id="search" placeholder="Search..." />
			<a href="http://127.0.0.1:5173/loadingpage">
				<button
					class="px-5 inline py-3 text-lg font-medium leading-5 shadow-3xl text-white transition-all duration-400 border border-transparent rounded-3xl focus:outline-none bg-blue-600 active:bg-slate-600 hover:bg-red-700"
					>Search</button
				></a
			>
		
			<Dropdown
				label="Database"
				inline={true}
				labelClass="flex items-center justify-between w-full py-2 pl-3 pr-4 text-base font-bold text-solarizedYellow border-b border-gray-100  md:hover:bg-transparent md:border-0 md:hover:text-solarizedBlue md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700  md:dark:hover:bg-transparent"
				class="z-50"
				on:click={getgenres}
			>
				<a href="http://127.0.0.1:5173/allanime">
					<DropdownItem>Anime</DropdownItem>
				</a>
				<a href="http://127.0.0.1:5173/allcharacters">
					<DropdownItem>Character</DropdownItem>
				</a>
				<a href="http://127.0.0.1:5173/allpersonnel">
					<DropdownItem>Personnel</DropdownItem>
				</a>
				<a href="http://127.0.0.1:5173/allstudio">
					<DropdownItem>Studio</DropdownItem>
				</a>
				<DropdownItem>
					<Dropdown
						label="Genre"
						inline={true}
						labelClass="flex items-center justify-between w-full py-2 pl-3 pr-4 text-sm  border-b border-gray-100  md:hover:bg-transparent md:border-0 md:hover:text-solarizedBlue md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700  md:dark:hover:bg-transparent"
						class="z-50"
					>
						{#each genres.results as gen}
							<DropdownItem>
								<a href="http://127.0.0.1:5173/genre/{gen.genrename}">
									{gen.genrename}
								</a>
							</DropdownItem>
						{/each}
					</Dropdown>
				</DropdownItem>
			</Dropdown>

			<NavLi
				href="http://127.0.0.1:5173/ratedanime"
				activeClass="block py-2 pr-4 pl-3 text-base font-bold text-solarizedYellow bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
				nonActiveClass="block py-2 pr-4 pl-3 text-base font-bold text-solarizedYellow border-b border-gray-100 hover:bg-solarizedBase2 md:hover:bg-transparent md:border-0 md:hover:text-solarizedBlue md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
				>Top Rated</NavLi
			>
			<NavLi
				href="http://127.0.0.1:5173/aboutus"
				activeClass="block py-2 pr-4 pl-3 text-base font-bold text-solarizedYellow bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
				nonActiveClass="block py-2 pr-4 pl-3 text-base font-bold text-solarizedYellow border-b border-gray-100 hover:bg-solarizedBase2 md:hover:bg-transparent md:border-0 md:hover:text-solarizedBlue md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
				>About</NavLi
			>
			<NavLi
				href="http://127.0.0.1:5173/forumhome"
				activeClass="block py-2 pr-4 pl-3 text-base font-bold text-solarizedYellow bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
				nonActiveClass="block py-2 pr-4 pl-3 text-base font-bold text-solarizedYellow border-b border-gray-100 hover:bg-solarizedBase2 md:hover:bg-transparent md:border-0 md:hover:text-solarizedBlue md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
				>Forum</NavLi
			>
		</NavUl>
		<div class="flex justify-end">
			<Dropdown arrowIcon={false} inline={true} class="bg-white overflow-visible z-50">
				<Avatar src={$curruser.image} slot="label" />
				{#if $state == 1}
					<DropdownHeader>
						<span class="block text-sm"> {$curruser.name} </span>
						<span class="block truncate text-sm font-medium"> {$curruser.mail} </span>
						{#if $curruser.admin == true}
							<span class="block truncate text-sm font-medium"> Admin </span>
						{/if}
					</DropdownHeader>
					<a href="/accinfo">
						<DropdownItem>Account</DropdownItem>
					</a>
					<a href="/watchlist">
						<DropdownItem>Watchlist</DropdownItem>
					</a>
					<a href="/favourites">
						<DropdownItem>Favourites</DropdownItem>
					</a>
					<DropdownItem class="text-solarizedRed">
						<Dropdown label="Add" inline={true} class="ml-16 w-44">
							<a href="http://127.0.0.1:5173/addanime">
								<DropdownItem>Add Anime</DropdownItem>
							</a>
							<a href="http://127.0.0.1:5173/addpersonnel">
								<DropdownItem>Add Personnel</DropdownItem>
							</a>
							<a href="http://127.0.0.1:5173/addcharacter">
								<DropdownItem>Add Character</DropdownItem>
							</a>
							<a href="http://127.0.0.1:5173/addstudio">
								<DropdownItem>Add Studio</DropdownItem>
							</a>
							<a href="http://127.0.0.1:5173/addgenre">
								<DropdownItem>Add Genre</DropdownItem>
							</a>
						</Dropdown>
					</DropdownItem>
					{#if $curruser.admin == true}
						<a href="http://127.0.0.1:5173/admin">
							<DropdownItem>Admin Page</DropdownItem>
						</a>
					{/if}
					<DropdownDivider />

					<DropdownItem on:click={logout}>Log out</DropdownItem>
				{:else}
					<a href="http://127.0.0.1:5173/login">
						<DropdownItem>Log in</DropdownItem>
					</a>
					<a href="http://127.0.0.1:5173/signup">
						<DropdownItem>Sign up</DropdownItem>
					</a>
				{/if}
			</Dropdown>
			<NavHamburger on:click={toggle} />
		</div>
	</Navbar>
{/await}
