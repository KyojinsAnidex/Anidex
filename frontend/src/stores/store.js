import { writable } from 'svelte-local-storage-store';
export let curruser=writable('curruser',
{
    name:'',
    mail:'',
    image:'',
    token:''
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
export let charsearch= writable('charsearch',{success: false,
    resultCharacter: []});
export let charpics=  writable('picturelinks',[]);  
export let animesearch=writable('animesearch',{success: false,
    resultAnime: [],}) 
export let animepics=writable('animepics',[]);
export let studiosearch=writable('studiosearch',{success: false,
    resultAnime: [],}) 
export let studioresanimes=writable('studioresanimes',[]);
export let studiorespics=writable('studiorespics',[]);
export let searchdest=writable('searchdest','/');
export let persearch= writable('charsearch',{success: false,
    resultPersonnel: []});
export let perpics=  writable('picturelinks',[]);
export let wlanimes= writable('wlanimes',[]);