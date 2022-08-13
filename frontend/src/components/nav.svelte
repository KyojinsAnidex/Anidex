<script>
import {state, search, curruser } from '../stores/store.js';
let searchdest;
$:
{
  if($search.type=='anime')
  {
    searchdest="/animesearchresult";
  }
  else if($search.type=='user')
  {
    searchdest="/usersearch";
  }
  else if($search.type=='character')
  {
    searchdest="/charactersearch";
  }
}

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
       
       {#if $state==0}
      <a href="/login" class="text-md no-underline text-black hover:text-blue-dark ml-2 px-1">Log in</a>
      {:else}
      <a href="/logout" class="text-md no-underline text-grey-darker hover:text-blue-dark ml-2 px-1">Log out</a>
      <a href="/accinfo" class="text-md no-underline text-grey-darker hover:text-blue-dark ml-2 px-1">Account Info</a>
      {/if}
      <a href="/signup" class="text-md no-underline text-grey-darker hover:text-blue-dark ml-2 px-1" >Sign Up</a>
      <a href="/aboutus" class="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">About Us</a>
      <div class="max-w-2xl mx-auto">
        <form  class="flex items-center" id="SearchForm">
          <label for="simple-search" class="sr-only">Search</label>
          <div class="relative w-full">
            <input
              type="text"
                      bind:value={$search.txt}
              id="simple-search"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
            />
            <select
              name="searchtype"
              id="searchtype"
              form="SearchForm"
                      bind:value={$search.type}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="anime">Anime</option>
              <option value="user">User</option>
              <option value="character">Character</option>
            </select>
          </div>
          <a  href={searchdest}>
          <button       
            type="submit"
            class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            ><svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              /></svg
            ></button
          >
         </a>
        </form>
      </div>
      
    </div>
  </nav>