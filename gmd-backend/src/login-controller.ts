import {accessToken, bearerAuth, Hono} from '../deps.ts';

const login = new Hono();
const token = accessToken.generate('gmd');

login.get('/secret-data', bearerAuth({token}), (c) => {
  return c.json('SECRET!!!');
});

login.post('/login', (c) => {
  return c.json(token);
});

export {login};
