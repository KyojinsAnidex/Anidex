<script context="module">
	export async function load({ params }) {
		let id = params.id;
		return { props: { id } };
	}
</script>

<script>
	export let id;
	import { persearch, perpics } from '../../stores/store';

	let per = $persearch.resultPersonnel[id];
	let picture = $perpics[id];
	//  console.log(anime);
	// console.log(picture);
</script>

<svelte:head>
	<title>{per.firstname}</title>
</svelte:head>
<div class="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
	<img class="h-52 rounded-full mb-4" src={picture} alt="Char Pic" />

	<h2 class="mt-2 text-lg text-center font-medium text-black dark:text-red-700">
		{per.firstname + ' ' + per.lastname}
	</h2>

	<h4 class="mt-2 text-lg text-center font-medium text-gray-700 dark:text-red-700">
		{per.gender === 'F' ? 'Female' : per.gender === 'M' ? 'Male' : 'Other'}
	</h4>
	<!-- <h4 class="mt-2 text-lg text-center font-medium text-gray-700 dark:text-red-700">
		{per.age + ' Years old'}
	</h4> -->
	<h4 class="mt-2 text-lg text-center font-medium text-gray-700 dark:text-red-700">
		Birthday : {per.birthday.slice(0, 10)}
	</h4>
	<h4 class="mt-2 text-lg text-center font-medium text-gray-700 dark:text-red-700">
		Address: {per.address}
	</h4>
	<a href={per.website}>
		<h4 class="mt-2 text-lg text-center font-medium text-blue-700 dark:text-red-700">Website</h4>
	</a>
</div>
