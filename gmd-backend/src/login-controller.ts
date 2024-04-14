import {accessToken, bearerAuth, Hono} from '../deps.ts';
import {LoginRequest} from '../models/login-request.model.ts';

const token = accessToken.generate('gmd');
const login = new Hono();

login.post('/', async (c) => {
  const loginRequest: LoginRequest = await c.req.json();

  if (loginRequest.userName !== 'Pablo') {
    return c.notFound();
  }
  if (loginRequest.password !== '1337') {
    return c.status(401);
  }

  return c.json(token);
});

login.get('/secret-data', bearerAuth({token: token}), (c) => {
  return c.json('SECRET!!!');
});

export {login, token};
