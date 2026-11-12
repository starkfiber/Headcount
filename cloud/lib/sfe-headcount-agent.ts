import {createAuthClient} from 'better-auth/client';
import {oauthProviderResourceClient} from '@better-auth/oauth-provider/resource-client';
import {getSfeAuth,hubOrigin,isHubHost} from './sfe-hub-auth';
import {hubDb,hubLimit} from './sfe-hub-db';
import {kitGrantRevoked} from './sfe-kit-oauth-policy';
import {HeadcountError} from './sfe-headcount';
export async function headcountAgent(request:Request){
 if(!isHubHost(request))throw new HeadcountError('Not found.',404);
 if(request.headers.has('origin')&&request.headers.get('origin')!==hubOrigin())throw new HeadcountError('Origin not allowed.',403);
 try{const auth=await getSfeAuth(),client=createAuthClient({plugins:[oauthProviderResourceClient(auth)]});
 const c=await client.verifyAccessTokenRequest(request,{jwksUrl:hubOrigin()+'/api/sfe/auth/jwks',verifyOptions:{issuer:hubOrigin()+'/api/sfe/auth',audience:hubOrigin()+'/api/sfe/headcount/mcp',typ:'at+jwt',requiredClaims:['azp']}});
 if(typeof c.sub!=='string'||typeof c.azp!=='string')throw Error('Invalid subject');
 const d=hubDb(),user=d.prepare('SELECT id,disabled,emailVerified FROM user WHERE id=?').get(c.sub),consent=d.prepare('SELECT id FROM oauthConsent WHERE userId=? AND clientId=?').get(c.sub,c.azp);
 if(!user||user.disabled||!user.emailVerified||!consent||kitGrantRevoked(c.sub,c.azp,c.iat))throw Error('Access removed');
 const scopes=typeof c.scope==='string'?c.scope.split(' '):[];
 if(!scopes.includes('headcount:read'))throw new HeadcountError('Allow Headcount reading access to continue.',403);
 if(!hubLimit('hc-agent:'+c.sub+':'+c.azp,60,60000))throw new HeadcountError('Please wait before retrying.',429);
 return {id:c.sub,scopes};
 }catch(e){if(e instanceof HeadcountError)throw e;throw new HeadcountError('Connect Headcount through your agent to continue.',401);}
}
