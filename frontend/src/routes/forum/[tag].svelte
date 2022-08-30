<script context="module">
	export async function load({ params }) {
		let tag = params.tag;
        let foruminfo;
		let response;
		response = await fetch('http://localhost:5000/discussion/tags/'+tag);
		if (response.status === 200) {
			foruminfo = await  response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
		return { props: { foruminfo } };
	}
</script>
<script>
     import { Avatar,Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
    export let foruminfo;
    console.log(foruminfo);
</script>
<Table hoverable={true}>
    <TableHead>
              <TableHeadCell>Content of Discussion</TableHeadCell>
              <TableHeadCell>Discussion Starter</TableHeadCell>
              <TableHeadCell>Start Time</TableHeadCell>
              
              <TableHeadCell>
                  <span class="sr-only"> Join </span>
              </TableHeadCell>
          </TableHead>
          <TableBody class="divide-y">
            {#each foruminfo.allDiscussionHeads as forum}
              <TableBodyRow>
                  <TableBodyCell>{forum.contentofdiscussion.slice(0,50)+"..."}</TableBodyCell>
                  <TableBodyCell><Avatar src={'http://localhost:5000/uploads/images/'+forum.pictureid}></Avatar>{forum.userid}</TableBodyCell>
                  <TableBodyCell>{forum.starttime.slice(0,10)}</TableBodyCell>
                  <TableBodyCell>
                      <a href="/" class="font-medium text-blue-600 hover:underline dark:text-blue-500">
                         Join Discussion
                      </a>
                  </TableBodyCell>
              </TableBodyRow>
              {/each}
            
          </TableBody>
      </Table>
