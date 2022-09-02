<script>
	import { search } from './../stores/store.js';
    import { goto } from '$app/navigation';
    $:
    {
        if($search.type=='anime')
        {
            goto("http://127.0.0.1:5173/animesearchresult");
        }
        if($search.type=='character')
        {
            goto("http://127.0.0.1:5173/charactersearch");
        }
        if($search.type=='user')
        {
            goto("http://127.0.0.1:5173/usersearch");
        }
        if($search.type=='studio')
        {
            goto("http://127.0.0.1:5173/studiosearch");
        }
        if($search.type=='personnel')
        {
            goto("http://127.0.0.1:5173/personnelsearch");
        }
        if($search.type=='')
        {
            goto("http://127.0.0.1:5173/");
        }
    }
</script>
<section class="h-screen bg-cover" style="background-image: url('https://images.unsplash.com/photo-1619364726002-dfd4fdaee5f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')">
    <div class="flex h-full w-full items-center justify-center container mx-auto px-8">
      <div class="max-w-2xl text-center">
        <h1 class="text-3xl sm:text-5xl capitalize tracking-widest text-white lg:text-7xl">Your Requested Search Results Are Loading</h1>
      </div>
    </div>
  </section>