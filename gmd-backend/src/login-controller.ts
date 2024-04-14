import {accessToken, bearerAuth, Hono, HTTPException} from '../deps.ts';
import {LoginRequest} from '../models/login-request.model.ts';

const token = accessToken.generate('gmd');
const login = new Hono();

login.post('/', async (c) => {
  const loginRequest: LoginRequest = await c.req.json();

  if (loginRequest.userName !== 'Pablo') {
    return c.notFound();
  }
  if (loginRequest.password !== '1337') {
    throw new HTTPException(401, { message: 'wrong password' })
  }

  return c.json(token);
});

login.get('/secret-data', bearerAuth({token: token}), (c) => {
  return c.json('SECRET!!!');
});

login.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  return c.text('invalid request', 500);
});

export {login, token};
