export type ExitDraft={confidence:number;reflection:string;help:string};
const key='hc-exit-draft';
type StorageLike=Pick<Storage,'getItem'|'setItem'|'removeItem'>;
export function saveExitDraft(storage:StorageLike,token:string,draft:ExitDraft,now=Date.now()){
 storage.setItem(key,JSON.stringify({token,...draft,expires:now+6*60*60*1000}));
}
export function readExitDraft(storage:StorageLike,token:string,now=Date.now()):ExitDraft|null{
 try{const d=JSON.parse(storage.getItem(key)||'null');if(!d)return null;
 if(d.token!==token||!Number.isFinite(d.expires)||d.expires<=now||![1,2,3].includes(d.confidence)||typeof d.reflection!=='string'||typeof d.help!=='string'||d.reflection.length>280||d.help.length>280){storage.removeItem(key);return null;}
 return {confidence:d.confidence,reflection:d.reflection,help:d.help};
 }catch{return null;}
}
export function clearExitDraft(storage:StorageLike){storage.removeItem(key);}
