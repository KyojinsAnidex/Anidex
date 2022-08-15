<script>
	import { state, curruser, search } from './../stores/store.js';
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger,Dropdown,DropdownHeader,Avatar,DropdownItem,DropdownDivider } from 'flowbite-svelte';
    import {Button,Search,Input} from "flowbite-svelte";
    let avatar = {
		src: $curruser.image,
		alt: 'My avatar',
		size: 12,
		border: true,
		round: true
	};
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
		<Button color="none" data-collapse-toggle="mobile-menu-3" aria-controls="mobile-menu-3" aria-expanded="false" class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
			<Search variation='solid' />
		</Button>
		<div class="hidden relative md:block">
			<Input id="search-navbar" class="pl-10" placeholder="Search..." />
		</div>
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
      {#if $state==1}
			<DropdownHeader>
				<span class="block text-sm"> {$curruser.name} </span>
				<span class="block truncate text-sm font-medium"> {$curruser.mail} </span>
			</DropdownHeader>
			<DropdownItem>Dashboard</DropdownItem>
			<DropdownItem>Settings</DropdownItem>
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

