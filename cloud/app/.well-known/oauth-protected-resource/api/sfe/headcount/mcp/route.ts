import {hubOrigin,isHubHost} from '@/lib/sfe-hub-auth';
export const dynamic='force-dynamic';
export function GET(r:Request){if(!isHubHost(r))return new Response(null,{status:404});return Response.json({resource:hubOrigin()+'/api/sfe/headcount/mcp',authorization_servers:[hubOrigin()+'/api/sfe/auth'],scopes_supported:['headcount:read','headcount:prepare','offline_access'],bearer_methods_supported:['header'],resource_name:'Headcount teaching assistant'},{headers:{'Cache-Control':'no-store','Access-Control-Allow-Origin':'*'}});}
