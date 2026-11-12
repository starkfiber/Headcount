import {z} from 'zod';
import {createHash} from 'node:crypto';
import {sfeUser,isHubHost,hubOrigin} from '@/lib/sfe-hub-auth';
import {hubDb,hubLimit} from '@/lib/sfe-hub-db';
import {readHubJson} from '@/lib/sfe-hub-validation';
import {headcountStore,HeadcountError,classSchema,questionSchema,lessonDetailsSchema} from '@/lib/sfe-headcount';
export const runtime='nodejs';export const dynamic='force-dynamic';
const reply=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'private, no-store','Referrer-Policy':'no-referrer','X-Robots-Tag':'noindex, nofollow'}});
const id=z.string().uuid(),token=z.string().regex(/^[a-f0-9]{64}$/);
const schema=z.discriminatedUnion('action',[
 z.object({action:z.literal('confirm-many'),id,participants:z.array(id).min(1).max(100)}).strict(),
 z.object({action:z.literal('save'),id:id.optional(),version:z.number().int().positive().optional(),data:classSchema}).strict(),
 z.object({action:z.literal('save-lesson'),title:z.string().trim().min(1).max(80),questions:z.array(questionSchema).min(1).max(30),details:lessonDetailsSchema.optional()}).strict(),
 z.object({action:z.literal('remove-lesson'),id}).strict(),
 z.object({action:z.literal('exit-ticket'),token,confidence:z.number().int().min(1).max(3),reflection:z.string().max(280),help:z.string().max(280)}).strict(),
 z.object({action:z.literal('remove'),id}).strict(),z.object({action:z.literal('start'),id}).strict(),
 z.object({action:z.literal('control'),id,command:z.enum(['confirm-participant','mark','lock','end','next','countdown','reveal','remove-participant','exit','timer-0','timer-15','timer-30','timer-60','extend-clock','board']),expected:z.object({phase:z.string(),current:z.number().int(),boardEnabled:z.boolean()}).strict().optional(),learner:id.optional(),status:z.enum(['present','absent','late','unmarked']).optional()}).strict(),
 z.object({action:z.literal('join'),recoveryToken:token.optional(),code:z.string().max(10),nickname:z.string().trim().min(1).max(30)}).strict(),
 z.object({action:z.literal('answer'),token,question:id,choice:z.number().int().min(0).max(3)}).strict()
]);
function failure(e:unknown){return reply({error:e instanceof HeadcountError?e.message:'Headcount is temporarily unavailable. Please try again.'},e instanceof HeadcountError?e.status:503);}
function host(r:Request,write=false){if(!isHubHost(r))throw new HeadcountError('Not found.',404);if(write&&(r.headers.get('origin')!==hubOrigin()||r.headers.get('sec-fetch-site')==='cross-site'))throw new HeadcountError('Open Headcount to continue.',403);}
function tokenLimit(t:string){if(!hubLimit('hc-token:'+createHash('sha256').update(t).digest('hex'),80))throw new HeadcountError('Please wait a moment.',429);}
export async function GET(r:Request){try{host(r);const q=new URL(r.url).searchParams,store=headcountStore(hubDb());const bearer=r.headers.get('authorization')?.replace(/^Bearer /,'')||'';
 if(q.get('view')==='student'){tokenLimit(bearer);return reply(store.student(bearer));}
 if(q.get('view')==='screen'){tokenLimit(bearer);return reply(store.screen(q.get('id')||'',bearer));}
 const u=await sfeUser(r.headers);if(!u)throw new HeadcountError('Sign in to save your classrooms.',401);if(!hubLimit('hc-read:'+u.id,120))throw new HeadcountError('Please wait a moment.',429);
 if(q.get('report'))return reply(store.report(u.id,q.get('report')!));
 if(q.get('lessons'))return reply({lessons:store.lessons(u.id)});
 if(q.get('session'))return reply(store.host(u.id,q.get('session')!));
 if(q.get('class'))return reply({sessions:store.sessions(u.id,q.get('class')!)});
 return reply({classes:store.list(u.id),name:u.name});
 }catch(e){return failure(e);}}
export async function POST(r:Request){try{host(r,true);const raw=await readHubJson(r,40000);if(!raw.ok)return reply({error:raw.error},raw.status);const p=schema.safeParse(raw.value);if(!p.success)throw new HeadcountError('Check your classroom details and try again.');const b=p.data,store=headcountStore(hubDb());
 if(b.action==='join'){const address=r.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'unknown';if(!hubLimit('hc-join:'+createHash('sha256').update(address).digest('hex'),120)||!hubLimit('hc-join-global',600))throw new HeadcountError('Many people are joining. Please try again in a minute.',429);return reply(store.join(b.code.toUpperCase(),b.nickname,b.recoveryToken));}
 if(b.action==='exit-ticket'){tokenLimit(b.token);return reply(store.exit(b.token,b.confidence,b.reflection,b.help));}
 if(b.action==='answer'){tokenLimit(b.token);return reply(store.answer(b.token,b.question,b.choice));}
 const u=await sfeUser(r.headers);if(!u)throw new HeadcountError('Sign in to save your classrooms.',401);if(!hubLimit('hc-write:'+u.id,180))throw new HeadcountError('Please wait a moment.',429);
 if(b.action==='confirm-many')return reply(store.confirmMany(u.id,b.id,b.participants));
 if(b.action==='save-lesson')return reply(store.saveLesson(u.id,b.title,b.questions,b.details));
 if(b.action==='remove-lesson'){store.removeLesson(u.id,b.id);return reply({ok:true});}
 if(b.action==='save')return reply({class:store.save(u.id,b.id,b.data,b.version)});
 if(b.action==='remove'){store.remove(u.id,b.id);return reply({ok:true});}
 if(b.action==='start')return reply(store.start(u.id,b.id));
 return reply(store.control(u.id,b.id,b.command,b.learner,b.status,b.expected));
 }catch(e){return failure(e);}}
