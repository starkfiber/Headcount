import {describe,it,expect} from 'vitest';
import {saveExitDraft,readExitDraft,clearExitDraft} from '../lib/headcount-exit-draft';
function storage(){const m=new Map<string,string>();return {getItem:(k:string)=>m.get(k)||null,setItem:(k:string,v:string)=>{m.set(k,v)},removeItem:(k:string)=>{m.delete(k)}}}
const draft={confidence:2,reflection:'Equal parts',help:'Sixths'};
describe('exit ticket recovery',()=>{
 it('restores a draft after a new page instance reads storage',()=>{const s=storage();saveExitDraft(s,'student-a',draft,100);expect(readExitDraft(s,'student-a',101)).toEqual(draft)});
 it('does not expose another participant’s draft',()=>{const s=storage();saveExitDraft(s,'a',draft,100);expect(readExitDraft(s,'b',101)).toBeNull();expect(readExitDraft(s,'a',101)).toBeNull()});
 it('expires after six hours and clears after success',()=>{const s=storage();saveExitDraft(s,'a',draft,100);expect(readExitDraft(s,'a',100+21600000)).toBeNull();saveExitDraft(s,'a',draft,100);clearExitDraft(s);expect(readExitDraft(s,'a',101)).toBeNull()});
 it('rejects malformed drafts without crashing the page',()=>{const s=storage();s.setItem('hc-exit-draft','{');expect(readExitDraft(s,'a')).toBeNull();saveExitDraft(s,'a',{...draft,reflection:'x'.repeat(281)});expect(readExitDraft(s,'a')).toBeNull()});
});
