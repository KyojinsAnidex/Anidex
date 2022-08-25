<svelte:head>
	<title>Add Anime</title>
</svelte:head>
<script>
    import {Fileupload,Input,Dropdown,DropdownItem,Radio} from 'flowbite-svelte';
    import {curruser} from "../stores/store";
    let anime={
        title:'',
        releasedate:'',
        synopsis:'',
        releaseseason:'',
        image:''
    }
   async function proxyaddanime()
   {
    const dataArray = new FormData();
    dataArray.append("title", anime.title);
    dataArray.append("releasedate", anime.releasedate);
    dataArray.append("synopsis", anime.synopsis);
    dataArray.append("releaseseason", anime.releaseseason);
    dataArray.append("image", anime.image);
    let endpoint='http://localhost:5000/anime';
    const response = await fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: 'Bearer ' + $curruser.token
				// like application/json or text/xml
			},
			body: dataArray
		});
		if (response.status === 201) {
			return await response.json();
		} else {
			alert('An error Try Again');
			throw new Error(response.statusText);
		}
   }

    async function handleadd()
    {
        let temp = await proxyaddanime();

if (temp.success == false) {
    alert('Could not Add');
} else {
    console.log(temp);
}
    }
</script>
<div class="relative flex h-full w-full">
	<div class="h-screen w-1/2 bg-black">
		<div class="mx-auto flex h-full w-2/3 flex-col justify-center text-white xl:w-1/2">
			<div>
				<p class="text-2xl">Add Anime Info And Picture</p>
			</div>
			<div class="mt-10">
				<form on:submit|preventDefault={handleadd}>
					<div>
						<label class="mb-2.5 block font-extrabold" for="title">Title</label>
						<input
							type="text"
							id="name"
                            bind:value={anime.title}
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="Title"
						/>
					</div>
					<div>
						<label class="mb-2.5 block font-extrabold" for="release date">Release Date</label>
						<input
							type="text"
							id="Releasedate"
                            bind:value={anime.releasedate}
							class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
							placeholder="YEAR-MM-DATE"
						/>
					</div>
                    <div >
                        <label for='sys' class='mb-2.5 block font-extrabold '>Synopsis</label>
                        <Input bind:value={anime.synopsis} id="sys" size="lg" placeholder="Synopsis" />
                      </div>
                      <br>
                      <Dropdown  label="Season" class="w-60" >
                        <ul slot="content" class="p-3">
                          <DropdownItem class="rounded" liClass="p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                            <Radio bind:group={anime.releaseseason} name="dropdown" value={"Spring"}  tinted>Spring</Radio>   
                          </DropdownItem>
                          <DropdownItem class="rounded" liClass="p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                            <Radio bind:group={anime.releaseseason} name="dropdown" value={"Summer"} tinted>Summer</Radio> 
                          </DropdownItem>
                          <DropdownItem class="rounded"  liClass="p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                            <Radio bind:group={anime.releaseseason} name="dropdown" value={"Winter"} tinted>Winter</Radio> 
                          </DropdownItem>
                          <DropdownItem class="rounded"  liClass="p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                            <Radio bind:group={anime.releaseseason} name="dropdown" value={"Fall"} tinted>Fall</Radio> 
                          </DropdownItem>                        
                        </ul>
                      </Dropdown>
                      <br>
					<div>
                        <label class="mb-2.5 block font-extrabold" for="File">Anime Picture</label> 
                        <Fileupload bind:file={anime.image} id="File" /> 
                    </div>
					<div class="my-10">
						<input
							type="submit"
							id="submit"
							class="w-full rounded-full bg-orange-600 p-5 hover:bg-orange-800"
						/>
					</div>
				</form>
			</div>
		</div>
	</div>
	<div class="h-screen w-1/2 bg-blue-600">
		<img
			src="http://localhost:5000/uploads/images/signup.jpg"
			class="object-cover h-full w-full"
			alt="logo"
		/>
	</div>
</div>