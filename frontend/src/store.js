import { writable } from "svelte/store";
export let curruser=writable(
{
    name:'',
    mail:''
})
export let search=writable({
    txt:'',
    type:''
}
)
export let state=writable(0);