<script context="module">
	export async function load({ params }) {
		let id = params.id;
		return { props: { id } };
	}
</script>

<script>
	export let id;
import { AccordionFlush,Rating } from 'flowbite-svelte';
	import { persearch, perpics,pershowchoice,allper } from '../../stores/store';

	let per;
	let picture;
	if($pershowchoice==0)
	{
	per = $persearch.resultPersonnel[id];
	picture = $perpics[id];
	}
	else
	{
		per=$allper.personnels[id];
		picture="http://localhost:5000/uploads/images/"+$allper.personnels[id].pictureid
	}
	//  console.log(anime);
	// console.log(picture);
	let temp,person;
	let resanime=[];
	async function perinfo()
	{
		let response;
		response = await fetch("http://localhost:5000/personnel/"+per.personnelid);
		if (response.status === 200) {
			return  response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
	}
	async function peranime()
	{   person=await perinfo();
		//console.log(person);
		let response;
		for(let i=0;i<person.workedOnAnime.length;i++)
		{
		response = await fetch("http://localhost:5000/anime/"+person.workedOnAnime[i].animeid);
		if (response.status === 200) {
			temp = await  response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
		resanime.push(temp);
	}
		console.log(person);
		console.log(resanime);
	}
</script>

<svelte:head>
	<title>{per.firstname}</title>
</svelte:head>
<div class="relative flex h-full w-full">

	<div class="h-screen w-1/2">
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
</div>
<div class="h-screen w-1/2">
	{#await peranime() then}
	<AccordionFlush>
		<h2 slot="header">Works On Anime</h2>
		<div slot="body">
			{#each resanime as anime}
             <AccordionFlush>
				<h2 slot="header">{anime.anime.title}</h2>
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
			{/each}
		</div>
	</AccordionFlush>
	{/await}
</div>
</div>
