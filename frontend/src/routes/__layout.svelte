<script>
import Altnav from "../components/altnav.svelte";
import Foot from "../components/foot.svelte";
import Nav from "../components/nav.svelte"
</script>
<!--<Nav/>-->
<Altnav/>
<slot></slot>
<Foot/>
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