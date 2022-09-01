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

<Footer footerType="socialmedia" customClass= "bg-solarizedBase3 text-solarizedBase02 sticky bottom-0 " >
	<div class="md:flex md:justify-between h-4 ">
		<div class="mb-4 md:mb-0 ">
			<FooterBrand
				href="http://127.0.0.1:5173/"
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
