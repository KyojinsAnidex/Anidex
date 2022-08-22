<svelte:head>
  <title>Account Info</title>
</svelte:head>
<script>
	import { Spinner } from 'flowbite-svelte';
  import { curruser ,state} from "../stores/store";
  let endpoint = "http://localhost:5000/users/" + $curruser.name;
  let image = "http://localhost:5000/uploads/images/";
  let res = {
    success: false,
    user: 
    {userid: "",
    email: "",
    biography: "",
    pictureid: "",
    admin: ""}
  };
  async function proxyfetchuserinfo()
  {
    const response = await fetch(endpoint);
    if(response.status === 200 )
    {
       return await response.json();
    }
    else
    {
      alert("An error occured Try Again");
      throw new Error(response.statusText);
    }

  }

  async function fetchuserinfo() {
      
        let temp = await proxyfetchuserinfo();

        if (temp.success == false) {
          alert("User Not Found");
        } else {
          res = temp;
          image = image + res.user.pictureid;
        }
      }
</script>

{#await fetchuserinfo()}
<div class="text-center" ><Spinner size="10" color="red"/></div>
{:then}
  <div class="container min-w-full text-center">
    <div class="grid grid-cols-1 md:grid-cols-2 text-center">
      <div class="mt-10">
        <div class="flex justify-center">
          <img class="h-52 rounded-full mb-4" src={image} alt="person pic" />
        </div>
        <div class="animate-fade-in-down mb-1 text-center text-lg text-sky-600">
          {res.user.userid}
        </div>
        <div class="animate-fade-in-down mb-1 text-center text-lg text-sky-600">
          {res.user.email}
        </div>
        <blockquote>
          <p class="animate-fade-in-down mx-12 mb-9 text-center text-sm">
            {res.user.biography}
          </p>
        </blockquote>
      </div>
    </div>
  </div>
{/await}
