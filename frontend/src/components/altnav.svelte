<script>
	import { state, curruser, search, searchdest } from './../stores/store.js';
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
	} from 'flowbite-svelte';
	
	$: {
		//	console.log($search.txt);
		//	console.log($search.type);
		//	console.log($curruser);
		if ($search.type == 'anime') {
			$searchdest = '/animesearchresult';
		} else if ($search.type == 'user') {
			$searchdest = '/usersearch';
		} else if ($search.type == 'character') {
			$searchdest = '/charactersearch';
		} else if ($search.type == 'studio') {
			$searchdest = '/studiosearch';
		} else if ($search.type == 'personnel') {
			$searchdest = '/personnelsearch';
		}
	}
</script>

<Navbar let:hidden let:toggle rounded={true}>
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
		<a href={$searchdest}>
		<Button textSize="text-sm" class="text-white absolute right-5.5 bottom-0 flex md:order-1" type="submit">Search</Button>
	</a>
		</div>
	  </form>
	</NavUl>
	<NavUl {hidden}>
		<NavLi href="/" active={true}>Home</NavLi>
		<NavLi href="/ratedanime">Top Rated</NavLi>
		<NavLi href="/aboutus">About</NavLi>
	</NavUl>
	<div class="flex md:order-2">
		<Dropdown arrowIcon={false} inline={true} class="bg-slate-600">
			
			<Avatar src={$curruser.image} slot="label" border class="ring-red-400 dark:ring-red-300" />
			{#if $state == 1}
				<DropdownHeader>
					<span class="block text-sm"> {$curruser.name} </span>
					<span class="block truncate text-sm font-medium"> {$curruser.mail} </span>
				</DropdownHeader>
				<a href="/watchlist">
					<DropdownItem>Watchlist</DropdownItem>
				</a>
				<a href="/favourites">
					<DropdownItem>Favourites</DropdownItem>
				</a>
				<DropdownItem>WatchRoom</DropdownItem>
				<a href="/accinfo">
					<DropdownItem>More Info</DropdownItem>
				</a>
				<DropdownDivider />
				<a href="/logout">
					<DropdownItem>Log out</DropdownItem>
				</a>
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
