import { writable } from "svelte/store";
export const curruser=writable(
{
    name:'',
    mail:''
})
export const search=writable({
    txt:'',
    type:''
}
)
export const state=writable(0);