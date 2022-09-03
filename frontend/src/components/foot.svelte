<script>
	import {
		Footer,
		FooterLink,
		FooterLinkGroup
	} from 'flowbite-svelte';
</script>

<Footer class="sticky bottom-0 left-0 z-20 w-full text-base bg-solarizedBase3 text-solarizedBase02">
	<span class="block text-base font-semibold text-gray-500 sm:text-center dark:text-gray-400">
		Anidex is licensed under a
		<a
			href="https://github.com/KyojinsAnidex/Anidex/blob/main/LICENSE"
			class="hover:underline hover:text-solarizedBlue"
		>
			GNU General Public License v3.0
		</a>
		© 2022 by
		<a href="https://github.com/KyojinsAnidex/" class="hover:underline hover:text-solarizedBlue">
			Kyojins
		</a>
	</span>
	<FooterLinkGroup
		ulClass="flex flex-wrap items-center mt-3 text-base font-semibold text-solarizedBase02 dark:text-gray-400 sm:mt-0"
	>
		<FooterLink href="https://github.com/KyojinsAnidex/Anidex/tree/main/resources"
			>Resources</FooterLink
		>
		<FooterLink href="/aboutus">About</FooterLink>
		<FooterLink href="https://github.com/KyojinsAnidex/Anidex">Github</FooterLink>
	</FooterLinkGroup>
</Footer>
