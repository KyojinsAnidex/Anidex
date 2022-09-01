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
	let MagnifyingGlass = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-white"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>`;
</script>

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
		<span class="self-center whitespace-nowrap text-base font-bold dark:text-white"> Anidex </span>
	</NavBrand>
	<NavUl
		divClass="w-full items-center md:block md:w-auto flex justify-end text-base font-bold text-solarizedYellow bg-solarizedBase02"
		ulClass="text-base font-bold text-solarizedYellow bg-solarizedBase02 flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-xl md:font-medium"
		{hidden}
	>
		<!-- <Dropdown labelClass="rounded-3xl" label={$search.type} class=" z-50 rounded-3xl">
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
		<Search bind:value = {$search.txt} on:submit={handleSearch} /> -->
		<!-- <Input bind:value={$search.txt} noBorder id="search" placeholder="Search..." />
		{#if $search.type == 'anime'}
			<a href="http://127.0.0.1:5173/animesearchresult">
				<button
					class="px-5 inline py-3 text-lg font-medium leading-5 shadow-3xl text-white transition-all duration-400 border border-transparent rounded-3xl focus:outline-none bg-blue-600 active:bg-slate-600 hover:bg-red-700"
					>Search</button
				>
				
			</a>
		{:else if $search.type == 'user'}
			<a href="http://127.0.0.1:5173/usersearch">
				<button
					class="px-5 inline py-3 text-lg font-medium leading-5 shadow-3xl text-white transition-all duration-400 border border-transparent rounded-3xl focus:outline-none bg-blue-600 active:bg-slate-600 hover:bg-red-700"
					>Search</button
				>
			</a>
		{:else if $search.type == 'character'}
			<a href="http://127.0.0.1:5173/charactersearch">
				<button
					class="px-5 inline py-3 text-lg font-medium leading-5 shadow-3xl text-white transition-all duration-400 border border-transparent rounded-3xl focus:outline-none bg-blue-600 active:bg-slate-600 hover:bg-red-700"
					>Search</button
				></a
			>
		{:else if $search.type == 'studio'}
			<a href="http://127.0.0.1:5173/studiosearch">
				<button
					class="px-5 inline py-3 text-lg font-medium leading-5 shadow-3xl text-white transition-all duration-400 border border-transparent rounded-3xl focus:outline-none bg-blue-600 active:bg-slate-600 hover:bg-red-700"
					>Search</button
				></a
			>
		{:else if $search.type == 'personnel'}
			<a href="http://127.0.0.1:5173/personnelsearch">
				<button
					class="px-5 inline py-3 text-lg font-medium leading-5 shadow-3xl text-white transition-all duration-400 border border-transparent rounded-3xl focus:outline-none bg-blue-600 active:bg-slate-600 hover:bg-red-700"
					>Search</button
				></a
			>
		{:else}
			<a href="/">
				<button
					class="px-5 inline py-3 text-lg font-medium leading-5 shadow-3xl text-white transition-all duration-400 border border-transparent rounded-3xl focus:outline-none bg-blue-600 active:bg-slate-600 hover:bg-red-700"
					>Search</button
				></a
			>
		{/if} -->
		<form >
			<div class="flex">
				<label for="search-dropdown" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Your Email</label>
				<button id="dropdown-button" on:click={()=>{}} data-dropdown-toggle="dropdown" class="flex-shrink-0 z-50 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">All categories <svg aria-hidden="true" class="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>
				<div id="dropdown" class="hidden  w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 z-50" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top" style="position: absolute; inset: auto auto 0px 0px; margin: 0px; transform: translate3d(897px, 5637px, 0px);">
					<ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
					<li>
						<button type="button" class="inline-flex py-2 px-4 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mockups</button>
					</li>
					<li>
						<button type="button" class="inline-flex py-2 px-4 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Templates</button>
					</li>
					<li>
						<button type="button" class="inline-flex py-2 px-4 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Design</button>
					</li>
					<li>
						<button type="button" class="inline-flex py-2 px-4 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logos</button>
					</li>
					</ul>
				</div>
				<div class="relative w-full">
					<input type="search" bind:value={$search.txt} id="search-dropdown" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." required>
					<button type="submit" on:click={handleSearch} class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
						<svg aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
						<span class="sr-only">Search</span>
					</button>
				</div>
			</div>
		</form>

		<Dropdown
			label="Database"
			inline={true}
			labelClass="flex items-center justify-between w-full py-2 pl-3 pr-4 text-base font-bold text-solarizedYellow border-b border-gray-100  md:hover:bg-transparent md:border-0 md:hover:text-solarizedBlue md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700  md:dark:hover:bg-transparent"
			class="z-50"
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
		<Dropdown arrowIcon={false} inline={true} class="bg-white overflow-visible">
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
