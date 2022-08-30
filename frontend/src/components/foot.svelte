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

<Footer footerType="socialmedia" class = "w-full h-24 fixed bottom-0 z-50">
	<div class="md:flex md:justify-between h-4 ">
		<div class="mb-4 md:mb-0">
			<FooterBrand
				href="http://127.0.0.1:5173/"
				src="http://localhost:5000/uploads/images/anidex.jpg"
				alt="Anidex Logo"
				name="Anidex"
			/>
		</div>
		<div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
			<div>
				<h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
					Resources
				</h2>
				<FooterLinkGroup>
					<FooterLink liClass="mb-4" href="https://tailwindcss.com/">Tailwind CSS</FooterLink>
				</FooterLinkGroup>
			</div>
			<div>
				<h2 class="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
					Follow us
				</h2>
				<FooterLinkGroup>
					<FooterLink liClass="mb-4" href="https://github.com/Mohaimin41/Anidex">GitHub</FooterLink>
					<!-- <FooterLink liClass="mb-4" href="/">Discord</FooterLink> -->
				</FooterLinkGroup>
			</div>
			<!-- <div>
          <h2 class="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">Legal</h2>
          <FooterLinkGroup>
            <FooterLink liClass="mb-4" href="/">Privacy Policy</FooterLink>
            <FooterLink liClass="mb-4" href="/">Terms & Conditions</FooterLink>
          </FooterLinkGroup>
        </div> -->
		</div>
	</div>
</Footer>
