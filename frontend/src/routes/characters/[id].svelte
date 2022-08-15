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

	<h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
		Full Name: {char.firstname + ' ' + char.lastname}
	</h4>

	<h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
		Gender: {char.gender === 'F' ? 'Female' : char.gender === 'M' ? 'Male' : 'Other'}
	</h4>
	<h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
		{char.age + ' Years old'}
	</h4>
	<!-- <h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
        Date of Birth: {char.dateofbirth}
    </h4> -->
	<h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
		Role: {char.role}
	</h4>
	<p class="text-blue-500 text-center" >{char.description}</p>
</div>
