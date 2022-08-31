<script>
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
		resetalert();
	}
	function logout() {
		logchoice = 1;
	}
	function resetalert() {
		logchoice = 0;
	}
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
<Navbar let:hidden let:toggle rounded={true} class="text-solarizedYellow bg-solarizedBase02 flex-auto">
	<NavBrand  href="/">
		<img
			src="http://localhost:5000/uploads/images/anidex.jpg"
			class="mr-3 h-6 sm:h-9"
			alt="Anidex Logo"
		/>
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
			Anidex
		</span>
	</NavBrand>
	<NavUl >
		<Dropdown label={$search.type} class="w-48 z-50 rounded-3xl">
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
		<Input bind:value={$search.txt} noBorder id="search" placeholder="Search Text" />
		<p>&nbsp</p>
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
		{/if}
	</NavUl>
	<NavUl {hidden}>
		<Dropdown label="Database" inline={true} class="z-50">
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

		<NavLi href="http://127.0.0.1:5173/ratedanime">Top Rated</NavLi>
		<NavLi href="http://127.0.0.1:5173/aboutus">About</NavLi>
		<NavLi href="http://127.0.0.1:5173/forumhome">Forum</NavLi>
	</NavUl>
	<div class="flex  justify-end z-50">
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
					<DropdownItem>Show/Edit Account Info</DropdownItem>
				</a>
				<a href="/watchlist">
					<DropdownItem>Watchlist</DropdownItem>
				</a>
				<a href="/favourites">
					<DropdownItem>Favourites</DropdownItem>
				</a>
				<DropdownItem>
					<Dropdown label="Add" inline={true} placement="left-start" class="ml-16 w-44">
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
