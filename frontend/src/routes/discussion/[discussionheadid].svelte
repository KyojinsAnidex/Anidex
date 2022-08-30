<script context="module">
	
	export async function load({ params }) {
		let discussionheadid = params.discussionheadid;
        let discussion;
		let response;
		response = await fetch('http://localhost:5000/discussion/discussionhead/'+discussionheadid);
		if (response.status === 200) {
			discussion = await  response.json();
		} else {
			console.log('An error Try Again');
			throw new Error(response.statusText);
		}
		return { props: { discussion } };
	}
</script>
<script>
    export let discussion;
    console.log(discussion);
	import {Card,Avatar,Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, AccordionFlush} from 'flowbite-svelte';
</script>
<div class="flex justify-center">
<Card img={'http://localhost:5000/uploads/images/'+discussion.discussionHead.pictureid} href="/" horizontal reverse={false}>
	<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{discussion.discussionHead.userid}</h5>
	<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Votes: {discussion.discussionHead.votes}</h5>
	<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Start Time: {discussion.discussionHead.starttime.slice(0,10)}</h5>
	<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Description:</h5>
	<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
		{discussion.discussionHead.contentofdiscussion}
	</p>
  </Card>
</div>
<br>
<br>
<div class="flex justify-center p-20">
<table  class="table-fixed border-solid ">
    <tr>
              <th>Content of Discussion</th>
              <th>Discussion Starter</th>
              <th>Start Time</th>
              <th>Votes</th>
              
             
			</tr>
        
            {#each discussion.discussionEntries as forum}
			<tr>
                  <td><AccordionFlush>
					<h2 slot="header">{forum.contentofdiscussion.slice(0,50)}</h2>
					<div slot="body">{forum.contentofdiscussion}</div>
				  </AccordionFlush>
					</td>
                  <td><Avatar src={'http://localhost:5000/uploads/images/'+forum.pictureid}></Avatar>{forum.userid}</td>
                  <td>{forum.starttime.slice(0,10)}</td>
                  <td>{forum.votes}</td>
                  
             
			</tr>
              {/each}
            
          </table>
		</div>
