<script>import Nav from "../components/nav.svelte"
</script>
<Nav/>
<slot></slot>
<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
@layer components {
    .sidebar{
      transition:all .4s ease-in-out;
    }
  }
</style>