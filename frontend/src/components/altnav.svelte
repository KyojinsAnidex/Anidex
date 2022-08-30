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
		Iconinput,
		Alert
	} from 'flowbite-svelte';
	let logchoice=0;
	function handlelogout() {
		state.set(0);
		curruser.set({
			name: '',
			mail: '',
			image: '',
			token: '',
			admin:false
		});
		search.set({
			txt: '',
			type: ''
		});
		resetalert();
	}
	function logout()
	{
		logchoice=1;
	}
	function resetalert()
	{
		logchoice=0;
	}
	
	

</script>
{#if logchoice==1}
<Alert>
	<div class="flex justify-center"></div>
	<span class="text-lg font-medium text-red-700 dark:text-blue-800">Do You Really Want To Log Out?</span>
	<Button on:click={handlelogout} size="xs" outline color="blue">Yes</Button>
	<Button on:click={resetalert} size="xs" outline color="blue">No</Button>
</Alert>
{/if}
<Navbar let:hidden let:toggle rounded={true} class="flex-auto" >
	<NavBrand href="/">
		<img
			src="http://localhost:5000/uploads/images/anidex.jpg"
			class="mr-3 h-6 sm:h-9"
			alt="Anidex Logo"
		/>
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
			Anidex
		</span>
	</NavBrand>
	<NavUl>
	  <Dropdown label={$search.type} class="w-48">
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
	<form>
		<div class="flex relative">
		<Iconinput  bind:value={$search.txt} noBorder id="search"  placeholder="Search Text"  />
		<p> &nbsp</p>
		{#if $search.type == 'anime'}
		<a href='/animesearchresult'>
		<Button textSize="text-sm" class="text-white absolute right-5.5 bottom-0 flex md:order-1" type="submit">Search</Button>
	</a>
	{:else if $search.type == 'user'}
	<a href='/usersearchresult'>
		<Button textSize="text-sm" class="text-white absolute right-5.5 bottom-0 flex md:order-1" type="submit">Search</Button>
	</a>
	{:else if $search.type == 'character'}
	<a href='/charactersearch'>
		<Button textSize="text-sm" class="text-white absolute right-5.5 bottom-0 flex md:order-1" type="submit">Search</Button>
	</a>
	{:else if $search.type == 'studio'}
	<a href='/studiosearch'>
		<Button textSize="text-sm" class="text-white absolute right-5.5 bottom-0 flex md:order-1" type="submit">Search</Button>
	</a>
	{:else if $search.type == 'personnel'}
	<a href='/personnelsearch'>
		<Button textSize="text-sm" class="text-white absolute right-5.5 bottom-0 flex md:order-1" type="submit">Search</Button>
	</a>
	{/if}
		</div>
	  </form>
	</NavUl>
	<NavUl {hidden}>
		<NavLi href="/" >Home</NavLi>
		<Dropdown label="Database" inline={true}>
			<a href="allanime">
			<DropdownItem>Anime</DropdownItem>
		</a>
		<a href="allcharacters">
			<DropdownItem>Character</DropdownItem>
		</a>
		<a href="allpersonnel">
			<DropdownItem>Personnel</DropdownItem>
		</a>
		</Dropdown>
		
		<NavLi href="/ratedanime">Top Rated</NavLi>
		<NavLi href="/aboutus">About</NavLi>
	</NavUl>
	<div class="flex  justify-end z-50">
		<Dropdown arrowIcon={false} inline={true} class="bg-white overflow-visible">
			
			<Avatar src={$curruser.image} slot="label"  />
			{#if $state == 1}
				<DropdownHeader>
					<span class="block text-sm"> {$curruser.name} </span>
					<span class="block truncate text-sm font-medium"> {$curruser.mail} </span>
					{#if $curruser.admin==true}
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
							
							<a href="/addanime">
							<DropdownItem>
								Add Anime
							</DropdownItem>
						</a>
						<a href="/addpersonnel">
							<DropdownItem>
								Add Personnel
							</DropdownItem>
						</a>
						<a href="/addcharacter">
							<DropdownItem>
								Add Character
							</DropdownItem>
						</a>
						<a href="/addstudio">
							<DropdownItem>
								Add Studio
							</DropdownItem>
						</a>
						<a href="/addgenre">
							<DropdownItem>
								Add Genre
							</DropdownItem>
						</a>
						</Dropdown>
					</DropdownItem>
					{#if $curruser.admin==true}
					<a href="/admin">
				<DropdownItem>Admin Page</DropdownItem>
			</a>
			{/if}
				<DropdownDivider />
				
					<DropdownItem on:click={logout}>Log out</DropdownItem>
			{:else}
				<a href="/login">
					<DropdownItem>Log in</DropdownItem>
				</a>
				<a href="/signup">
					<DropdownItem>Sign up</DropdownItem>
				</a>
			{/if}
		</Dropdown>
		<NavHamburger on:click={toggle} />
	</div>
</Navbar>
