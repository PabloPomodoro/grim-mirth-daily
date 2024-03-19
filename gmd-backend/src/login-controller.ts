import {Hono} from 'https://deno.land/x/hono/mod.ts';
import {accessToken} from 'https://deno.land/x/access_token@1.0.0/src/access_token.ts';
import {bearerAuth} from 'https://deno.land/x/hono@v4.0.5/middleware.ts';

const login = new Hono();
const token = accessToken.generate('gmd');

login.get('/secret-data', bearerAuth({token}), async (c) => {
  return c.json('SECRET!!!');
});

login.post('/login', async (c) => {
  return c.json(token);
});

export {login};
