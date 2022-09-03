<script context="module">
	export async function load({ url }) {
		let tags;
		let response;
		response = await fetch('http://localhost:5000/discussion/tags');
		if (response.status === 200) {
			tags = await response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}

		return { props: { tags } };
	}
</script>

<script>
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Checkbox,
		TableSearch
	} from 'flowbite-svelte';
	export let tags;
	// console.log(tags);
</script>

<svelte:head>
	<title>Forum</title>
</svelte:head>

<div class="flex-col justify-center items-center relative h-full w-full bg-solarizedBase3 text-solarizedBase02">
	<div>
		<h2 class="text-3xl flex justify-center items-center font-bold ">Welcome to Anidex forum!</h2>
	</div>
	<div class="flex justify-center p-20 w-full bg-solarizedBase3 text-solarizedBase02">
		<Table hoverable={true} class="h-full w-full text-xl bg-solarizedBase3 text-solarizedBase02">
			<TableHead class="text-xl bg-solarizedBase3 text-solarizedBase02">
				<TableHeadCell class="text-xl bg-solarizedBase3 text-solarizedBase02"
					>Subforum</TableHeadCell
				>
				<TableHeadCell class="text-xl bg-solarizedBase3 text-solarizedBase02"
					>Description</TableHeadCell
				>
				<TableHeadCell class="text-xl bg-solarizedBase3 text-solarizedBase02"
					>Total Discussions</TableHeadCell
				>
			</TableHead>
			<TableBody class="divide-y">
				{#each tags.tagData as tag}
					<TableBodyRow>
						<TableBodyCell class="text-lg">
							<a
								href="/forum/{tag.tagname}"
								class="font-medium text-blue-600 hover:underline dark:text-blue-500"
							>
								{tag.tagname}
							</a>
						</TableBodyCell>
						<TableBodyCell class="text-lg">{tag.description}</TableBodyCell>
						<TableBodyCell class="text-lg">{tag.totaldiscussions}</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
</div>
