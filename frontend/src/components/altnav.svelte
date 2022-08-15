<script>
	import { state, curruser, search,searchdest } from './../stores/store.js';
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
		Input,
		Button,
	} from 'flowbite-svelte';
	import { ArrowRight } from 'svelte-heros';
	let avatar = {
		src: '../../static/anidex.png',
		alt: 'My avatar',
		size: 12,
		border: true,
		round: true
	};
	$:
	{
		console.log($search.txt);
		console.log($search.type);
		if($search.type=='anime')
  {
    $searchdest="/animesearchresult";
  }
  else if($search.type=='user')
  {
    $searchdest="/usersearch";
  }
  else if($search.type=='character')
  {
    $searchdest="/charactersearch";
  }
  else if($search.type=='studio')
  {
    $searchdest="/studiosearch";
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
	<div class="flex md:order-2">
		<div class="hidden relative md:block">
			<Input bind:value={$search.txt} id="search-navbar" class="pl-10" placeholder="Search..." />
		</div>
		<Dropdown label="Search Criteria" class="w-48">
			<ul slot="content" class="p-3 space-y-1">
			  <DropdownItem class="rounded" liClass="p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
				<Radio bind:group={$search.type} value={"anime"}>Anime</Radio>
			  </DropdownItem>
			  <DropdownItem class="rounded" liClass="p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
				<Radio bind:group={$search.type} value={"character"}>Character</Radio>
			  </DropdownItem>
			  <DropdownItem class="rounded" liClass="p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
				<Radio bind:group={$search.type} value={"user"}>User</Radio>
			  </DropdownItem>
			  <DropdownItem class="rounded" liClass="p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
				<Radio bind:group={$search.type} value={"studio"}>Studio</Radio>
			  </DropdownItem>
			</ul>
		  </Dropdown>
		  <a href={$searchdest}>
		  <Button  pill="{true}" class="!p-2" outline="{true}"><ArrowRight class="w-5 h-5" />Go...</Button>
		</a>
		  <NavHamburger on:click={toggle} />
	</div>
	<NavUl {hidden}>
		<NavLi href="/" active={true}>Home</NavLi>
		<NavLi href="/aboutus">About</NavLi>
		<NavLi href="/services">Services</NavLi>
	</NavUl>
	<div class="flex md:order-2">
		<Dropdown arrowIcon={false} inline={true}>
			<Avatar {avatar} slot="label" />
			{#if $state == 1}
				<DropdownHeader>
					<span class="block text-sm"> {$curruser.name} </span>
					<span class="block truncate text-sm font-medium"> {$curruser.mail} </span>
				</DropdownHeader>
				<DropdownItem>Watchlist</DropdownItem>
				<DropdownItem>WatchRoom</DropdownItem>
				<DropdownItem>Earnings</DropdownItem>
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
