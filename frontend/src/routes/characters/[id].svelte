<script context="module">
	
	export async function load({ params }) {
		let id = params.id;
		return { props: { id } };
	}
</script>

<script>
	export let id;
import { AccordionFlush,Rating } from 'flowbite-svelte';
	import { charsearch, charpics,charshowchoice } from '../../stores/store';
	
    
	let char; 
	let picture;
	
	char= $charsearch.resultCharacter[id];
	picture = $charpics[id];
	
	//  console.log(anime);
	// console.log(picture);
	let anime,character,person;
	async function charinfo()
	{
		let response;
		response = await fetch("http://localhost:5000/characters/"+char.characterid);
		if (response.status === 200) {
			return  response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
	}
	async function charanime()
	{   character=await charinfo();
		let response;
		response = await fetch("http://localhost:5000/anime/"+character.anime[0].animeid);
		if (response.status === 200) {
			anime = await  response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
		response = await fetch("http://localhost:5000/personnel/"+character.voiceActor[0].personnelid);
		if (response.status === 200) {
			person=await  response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
		console.log(anime);
		console.log(person);
		console.log(character);
	}
</script>

<svelte:head>
	<title>{char.firstname}</title>
</svelte:head>
<div class="relative flex h-full w-full">
	<div class="h-screen w-1/2">
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
	<AccordionFlush>
		<h2 slot='header' class="text-black">Description</h2>
		<div slot='body'>
	<p class="text-black text-center">{char.description}</p>
</div>
</AccordionFlush>
</div>
</div>
<div class="h-screen w-1/2">
	{#await charanime() then}
	<AccordionFlush>
		<h2 slot="header">Anime</h2>
		<div slot="body">
			<div class="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
				<img class="h-52 rounded-full mb-4" src={"http://localhost:5000/uploads/images/"+anime.animepicture[0].pictureid} alt="Anime Pic" />
				<h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
					Tittle: {anime.anime.title}
				</h4>
				<h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
					Release Season: {anime.anime.releaseseason}
				</h4>
				<h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
					Release Date: {anime.anime.releasedate.slice(0, 10)}
				</h4>
				
					<Rating count rating={anime.anime.averagerating}>
						<span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400" />
					</Rating>

					<h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
						Anime Rank: {anime.anime.animerank}
					</h4>
				<h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
					Anime Genre:
					{#each anime.animegenres as genre}
						{genre.genrename + ' '}
					{/each}
				</h4>
				<h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-red-700">
					Anime Studio:
					{#each anime.animestudio as studio}
						{studio.studioname}
					{/each}
				</h4>
				
			</div>
		</div>
	</AccordionFlush>
	<AccordionFlush>
		<h2 slot="header">Voice Actor</h2>
		<div slot="body">
			<div class="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
				<img class="h-52 rounded-full mb-4" src={"http://localhost:5000/uploads/images/"+person.person.pictureid} alt="Char Pic" />
			
				<h2 class="mt-2 text-lg text-center font-medium text-black dark:text-red-700">
					{person.person.firstname + ' ' + person.person.lastname}
				</h2>
			
				<h4 class="mt-2 text-lg text-center font-medium text-gray-700 dark:text-red-700">
					{person.person.gender === 'F' ? 'Female' : person.person.gender === 'M' ? 'Male' : 'Other'}
				</h4>
				<!-- <h4 class="mt-2 text-lg text-center font-medium text-gray-700 dark:text-red-700">
					{per.age + ' Years old'}
				</h4> -->
				<h4 class="mt-2 text-lg text-center font-medium text-gray-700 dark:text-red-700">
					Birthday : {person.person.birthday.slice(0, 10)}
				</h4>
				<h4 class="mt-2 text-lg text-center font-medium text-gray-700 dark:text-red-700">
					Address: {person.person.address}
				</h4>
				<a href={person.person.website}>
					<h4 class="mt-2 text-lg text-center font-medium text-blue-700 dark:text-red-700">Website</h4>
				</a>
			</div>
		</div>
	</AccordionFlush>
	{/await}
</div>
</div>