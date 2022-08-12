import { writable } from 'svelte-local-storage-store';
export let curruser=writable('crruser',
{
    name:'',
    mail:''
})
export let searchresult = writable('searchresult',{
    success: false,
    results: [],
  });
export let picturelinks= writable('picturelinks',[]);
export let search=writable('search',{
    txt:'',
    type:''
}
)
export let state=writable('state',0);