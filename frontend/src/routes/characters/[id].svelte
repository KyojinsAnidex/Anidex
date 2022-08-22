<script context="module">
	export async function load({ params }) {
		let id = params.id;
		return { props: { id } };
	}
</script>

<script>
	export let id;
	import { charsearch, charpics } from '../../stores/store';

	let char = $charsearch.resultCharacter[id];
	let picture = $charpics[id];
	//  console.log(anime);
	// console.log(picture);
</script>

<svelte:head>
	<title>{char.firstname}</title>
</svelte:head>
<div class="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
	<img class="h-52 rounded-full mb-4" src={picture} alt="Char Pic" />

	<h2 class="mt-2 text-lg font-medium text-center text-black dark:text-red-700">
		{char.firstname + ' ' + char.lastname}
	</h2>

	<h4 class="mt-2 text-lg font-medium text-center  text-gray-700 dark:text-red-700">
		{char.gender === 'F' ? 'Female' : char.gender === 'M' ? 'Male' : 'Other'}
	</h4>
	<h4 class="mt-2 text-lg text-center font-medium text-gray-700 dark:text-red-700">
		{char.age + ' Years old'}
	</h4>
	<!-- <h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
        Date of Birth: {char.dateofbirth}
    </h4> -->
	<h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
		Role: {char.role}
	</h4>
	<p class="text-black text-center">{char.description}</p>
</div>
