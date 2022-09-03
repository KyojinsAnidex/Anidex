<script>
	import { search } from './../stores/store.js';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	onMount(() => {
		if ($search.type == 'anime') {
			goto('/animesearchresult');
		}
		if ($search.type == 'character') {
			goto('/charactersearch');
		}
		if ($search.type == 'user') {
			goto('/usersearch');
		}
		if ($search.type == 'studio') {
			goto('/studiosearch');
		}
		if ($search.type == 'personnel') {
			goto('/personnelsearch');
		}
		if ($search.type == '') {
			goto('/');
		}
	});
</script>

<section class="h-screen bg-cover bg-solarizedBase3">
	<div class="flex h-full w-full items-center justify-center container mx-auto px-8">
		<div class="max-w-2xl text-center">
			<h1 class="text-3xl sm:text-5xl capitalize tracking-widest text-white lg:text-7xl">
				Your Requested Search Results Are Loading
			</h1>
		</div>
	</div>
</section>
