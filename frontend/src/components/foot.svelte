<script>
	import {
		Footer,
		FooterBrand,
		FooterCopyright,
		FooterIcon,
		FooterLink,
		FooterLinkGroup
	} from 'flowbite-svelte';
</script>

<!-- <Footer
	footerType="socialmedia"
	customClass="bg-solarizedBase3 text-solarizedBase02 sticky bottom-0 "
>
	<div class="md:flex md:justify-between h-4 ">
		<div class="mb-4 md:mb-0 ">
			<FooterBrand
				href="/"
				src="http://localhost:5000/uploads/images/anidex.jpg"
				alt="Anidex Logo"
				name="Anidex"
			/>
		</div>
		<div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
			<div>
				<h2 class="mb-6 text-sm font-semibold text-solarizedBase00 uppercase dark:text-white">
					Resources
				</h2>
				<FooterLinkGroup>
					<FooterLink liClass="mb-4" href="https://tailwindcss.com/">Tailwind CSS</FooterLink>
				</FooterLinkGroup>
			</div>
			<div>
				<h2 class="mb-6 text-sm font-semibold uppercase text-solarizedBase00 dark:text-white">
					Follow us
				</h2>
				<FooterLinkGroup>
					<FooterLink liClass="mb-4" href="https://github.com/KyojinsAnidex/Anidex"
						>GitHub</FooterLink
					>
					 <FooterLink liClass="mb-4" href="/">Discord</FooterLink> 
				</FooterLinkGroup>
			</div>
		</div>
	</div>
</Footer> -->
<Footer class="sticky bottom-0 left-0 z-20 w-full text-base bg-solarizedBase3 text-solarizedBase02">
	<!-- <FooterCopyright
		spanClass="block text-base font-semibold text-gray-500 sm:text-center dark:text-gray-400"
		href="https://github.com/KyojinsAnidex/"
		by="Kyojins"
		year={2022}
	/> -->
	<span class="block text-base font-semibold text-gray-500 sm:text-center dark:text-gray-400">
		Anidex is licensed under a  
		<a href="https://github.com/KyojinsAnidex/Anidex/blob/main/LICENSE" class="hover:underline hover:text-solarizedBlue">
			GNU General Public License v3.0
		</a>  © 2022 by  
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
