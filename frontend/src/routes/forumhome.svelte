<script context="module">
	export async function load({url}) {
		let tags;
		let response;
		response = await fetch('http://localhost:5000/discussion/tags');
		if (response.status === 200) {
			tags = await  response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
		
		return { props: { tags} };
	}
</script>
<script>
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
    export let tags;
    console.log(tags);
</script>
<Table hoverable={true}>
    <TableHead>
              <TableHeadCell>Tagname</TableHeadCell>
              <TableHeadCell>Description</TableHeadCell>
              <TableHeadCell>Total Discussions</TableHeadCell>
              
              <TableHeadCell>
                  <span class="sr-only"> Join </span>
              </TableHeadCell>
          </TableHead>
          <TableBody class="divide-y">
            {#each tags.tagData as tag}
              <TableBodyRow>
                  <TableBodyCell>{tag.tagname}</TableBodyCell>
                  <TableBodyCell>{tag.description}</TableBodyCell>
                  <TableBodyCell>{tag.totaldiscussions}</TableBodyCell>
                  <TableBodyCell>
                      <a href="/forum/{tag.tagname}" class="font-medium text-blue-600 hover:underline dark:text-blue-500">
                         Join Forum
                      </a>
                  </TableBodyCell>
              </TableBodyRow>
              {/each}
            
          </TableBody>
      </Table>