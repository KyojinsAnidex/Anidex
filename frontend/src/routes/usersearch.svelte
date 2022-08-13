<script>
    import {state,search} from "../stores/store";
  let animes = {
    success: false,
    resultUser: [],
  };
  let userendpoint="http://localhost:5000/search/users";
  let image = "http://localhost:5000/uploads/images/";
  async function proxyfetchuserinfo()
  {
    const response = await fetch(userendpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // like application/json or text/xml
      },
      body: JSON.stringify({
        // Example: Update JSON file with
        //          local data properties
        searchString:$search.txt
        // etc.
      }),
    });
    if(response.status === 200 )
    {
       return await response.json();
    }
    else if (response.status === 404)
    {
      alert("No user found, please try again");
      throw new Error(response.statusText);     
    }
    else 
    {
      alert("An error happened, please try again");
      throw new Error(response.statusText);
    }
  }
  async function fetchuserinfo() {
    
        let temp = await proxyfetchuserinfo();
        if (temp.success == false) {
          alert("No User Found");
        } else {
          animes = temp;
          image=image+animes.resultUser[0].pictureid;     
        }
      }
      
</script>

{#await fetchuserinfo() then}
  <div class="container min-w-full">
    <div class="grid grid-cols-1 md:grid-cols-2">
      <div class="mt-10">
        <div class="flex justify-center">
          <img class="h-52 rounded-full mb-4" src={image} alt="person pic" />
        </div>
        <div class="animate-fade-in-down mb-1 text-center text-lg text-sky-600">
          {animes.resultUser[0].userid}
        </div>
        <div class="animate-fade-in-down mb-1 text-center text-lg text-sky-600">
          {animes.resultUser[0].email}
        </div>
        <blockquote>
          <p class="animate-fade-in-down mx-12 mb-9 text-center text-sm">
            {animes.resultUser[0].biography}
          </p>
        </blockquote>
      </div>
    </div>
  </div>
{/await}
