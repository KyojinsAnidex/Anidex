<script>
  import { curruser ,state} from "../store";
  console.log($curruser);
  console.log($state);
  let endpoint = "http://localhost:5000/users/" + $curruser.name;
  let image = "http://localhost:5000/uploads/images/";
  let res = {
    success: false,
    user: 
    {userId: "",
    email: "",
    biography: "",
    pictureId: "",
    admin: ""}
  };

  async function fetchuserinfo() {
      fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        let temp = data;

        if (temp.success == false) {
          alert("User Not Found");
        } else {
          res = temp;
          console.log(res);
          image = image + res.user.pictureid;
        }
      })
      

      .catch((error) => {
        console.log(error);
      });
  }
</script>

{#await fetchuserinfo() then}
  <div class="container min-w-full">
    <div class="grid grid-cols-1 md:grid-cols-2">
      <div class="hidden bg-slate-500 md:block">
        <img
          class="h-auto bg-cover bg-center bg-no-repeat"
          src="https://source.unsplash.com/random"
          alt="bg"
        />
      </div>
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
