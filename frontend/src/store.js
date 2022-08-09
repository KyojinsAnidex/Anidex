import { writable } from 'svelte-local-storage-store';
export let curruser=writable('crruser',
{
    name:'',
    mail:''
})
export let search=writable('search',{
    txt:'',
    type:''
}
)
export let state=writable('state',0);