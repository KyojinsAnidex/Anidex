<script>
	import {state, search, curruser } from '../stores/store.js';

</script>
<nav class="font-sans flex flex-col text-center content-center sm:flex-row sm:text-left sm:justify-between py-2 px-6 bg-gray-500 shadow sm:items-baseline w-full">

    <div class="mb-2 sm:mb-0 flex flex-row">
      <div class="h-10 w-10 self-center mr-2">
        <img  class="h-10 w-10 self-center" src="http://localhost:5000/uploads/images/anidex.jpg" alt="logo" />
      </div>
      <div>
        <a href="/" class="text-2xl no-underline text-grey-darkest hover:text-blue-dark font-sans font-bold">Anidex</a><br>
        <span class="text-xs text-grey-dark">Your Personal Anime Guide</span>
      </div>
    </div>
  
    <div class="sm:mb-0 self-center">
      <!-- <div class="h-10" style="display: table-cell, vertical-align: middle;"> -->
       {#if $state==0}
      <a href="/login" class="text-md no-underline text-black hover:text-blue-dark ml-2 px-1">Log in</a>
      {:else}
      <a href="/logout" class="text-md no-underline text-grey-darker hover:text-blue-dark ml-2 px-1">Log out</a>
      <a href="/accinfo" class="text-md no-underline text-grey-darker hover:text-blue-dark ml-2 px-1">Account Info</a>
      {/if}
      <a href="/signup" class="text-md no-underline text-grey-darker hover:text-blue-dark ml-2 px-1" >Sign Up</a>
      <a href="/aboutus" class="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">About Us</a>
      <a href="x" class="text-md no-underline text-grey-darker hover:text-blue-dark ml-2 px-1">Link3</a>
      <!-- </div> -->
  
    </div>
  </nav>