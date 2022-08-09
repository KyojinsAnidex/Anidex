<script>
      let user={
        name:'',
        email:'',
        password:'',
        bio:''
      }
      function handlesignup()
 {  
  console.log(user.name);
  console.log(user.email);
  console.log(user.password);
  console.log(user.bio);
  let temp=
  { 
    success:false,
    name:  '',
    email: '',
    password: '',
  };
  fetch('http://localhost:5000/users/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
    // like application/json or text/xml
  },
  body: JSON.stringify({
    // Example: Update JSON file with
    //          local data properties
    name:  user.name,
    email: user.email,
    password: user.password,
    bio: user.bio
    // etc.
  })
})
.then(response => response.json())
.then(data => {temp = data;

  if(temp.success==false)
          {
            alert("Could Not sign up Try Again");
          }
          else if(temp.success==true)
          { 
            alert("Signed Up.Please Log in");
          }})
.catch(error=>{console.log(error)})
 }
  </script>
  <div class="relative flex h-full w-full">
    <div class="h-screen w-1/2 bg-black">
      <div class="mx-auto flex h-full w-2/3 flex-col justify-center text-white xl:w-1/2">
        <div>
          <p class="text-2xl">Signup|</p>
          <p>please Signup to continue|</p>
        </div>
        <div class="mt-10">
          <form on:submit|preventDefault={handlesignup}>
            <div>
              <label class="mb-2.5 block font-extrabold" for="Name">Name</label>
              <input type="text" bind:value={user.name} id="name" class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30" placeholder="username" />
            </div>
            <div>
              <label class="mb-2.5 block font-extrabold" for="email">Email</label>
              <input type="email" bind:value={user.email} id="email" class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30" placeholder="mail@user.com" />
            </div>
            <div class="mt-4">
              <label class="mb-2.5 block font-extrabold" for="password">Password</label>
              <input type="password" bind:value={user.password} id="password" class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow" />
            </div>
            <div class="mt-4">
                <label class="mb-2.5 block font-extrabold" for="bio">Bio</label>
                <input type="text" bind:value={user.bio} id="bio" class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow" />
              </div>
            <div class="my-10">
              <input type="submit"id="submit" class="w-full rounded-full bg-orange-600 p-5 hover:bg-orange-800">
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="h-screen w-1/2 bg-blue-600">
      <img src="https://images.pexels.com/photos/2523959/pexels-photo-2523959.jpeg" class="h-full w-full" alt="logo"/>
    </div>
  </div>