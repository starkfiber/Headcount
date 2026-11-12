import {headcountAgent} from '@/lib/sfe-headcount-agent';
import {headcountRpc} from '@/lib/sfe-headcount-mcp';
import {headcountStore,HeadcountError} from '@/lib/sfe-headcount';
import {hubDb} from '@/lib/sfe-hub-db';
import {hubOrigin,isHubHost} from '@/lib/sfe-hub-auth';
import {readHubJson} from '@/lib/sfe-hub-validation';
export const runtime='nodejs';export const dynamic='force-dynamic';
const headers={'Cache-Control':'private, no-store','Referrer-Policy':'no-referrer','X-Robots-Tag':'noindex, nofollow','Access-Control-Allow-Origin':'*','Access-Control-Expose-Headers':'WWW-Authenticate'};
const reply=(body:unknown,status=200)=>Response.json(body,{status,headers});
function failure(e:unknown){const status=e instanceof HeadcountError?e.status:503,r=reply({error:e instanceof HeadcountError?e.message:'Headcount is temporarily unavailable.'},status);if(status===401||status===403)r.headers.set('WWW-Authenticate','Bearer resource_metadata="'+hubOrigin()+'/.well-known/oauth-protected-resource/api/sfe/headcount/mcp", scope="headcount:read headcount:prepare"'+(status===403?', error="insufficient_scope"':''));return r;}
export async function POST(r:Request){try{const user=await headcountAgent(r);if(!r.headers.get('content-type')?.includes('application/json'))return reply({error:'Use JSON.'},415);const accept=r.headers.get('accept')||'';if(!accept.includes('application/json')||!accept.includes('text/event-stream'))return reply({error:'Accept application/json and text/event-stream.'},406);const v=r.headers.get('mcp-protocol-version');if(v&&!['2025-06-18','2025-03-26'].includes(v))return reply({error:'Unsupported protocol version.'},400);const body=await readHubJson(r,40000);if(!body.ok)return reply({error:body.error},body.status);const result=await headcountRpc(body.value,headcountStore(hubDb()),user.id,user.scopes);return result?reply(result):new Response(null,{status:202,headers});}catch(e){return failure(e);}}
export async function GET(r:Request){try{await headcountAgent(r);return new Response(null,{status:405,headers:{...headers,Allow:'POST'}})}catch(e){return failure(e);}}
export async function OPTIONS(r:Request){if(!isHubHost(r))return new Response(null,{status:404});return new Response(null,{status:204,headers:{...headers,'Access-Control-Allow-Methods':'POST, GET, OPTIONS','Access-Control-Allow-Headers':'Authorization, Content-Type, MCP-Protocol-Version','Access-Control-Max-Age':'600'}});}
