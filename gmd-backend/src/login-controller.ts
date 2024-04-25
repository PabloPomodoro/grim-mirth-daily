import {accessToken, bearerAuth, Hono, HTTPException} from '../deps.ts';
import {LoginRequest} from '../models/login-request.model.ts';
import {User} from '../models/user.model.ts';
import {UiUserModel} from '../models/ui-user.model.ts';

let token;
const auth = new Hono();

const users: User[] = [
  {
    id: '1',
    name: 'Pablo',
    email: 'pablo@pomodoro.com',
    password: '1337',
    dateOfBirth: new Date(),
  },
];

auth.post('/login', async (c) => {
  const loginRequest: LoginRequest = await c.req.json();

  const requestedUser = users.find((user) => user.email === loginRequest.email);

  if (!requestedUser) {
    return c.notFound();
  }
  if (loginRequest.password !== requestedUser.password) {
    throw new HTTPException(401, {message: 'wrong password'});
  }

  token = accessToken.generate('gmd');
  const uiUser = new UiUserModel(
    requestedUser.name,
    requestedUser.email,
    requestedUser.dateOfBirth,
  );
  return c.json({token, uiUser});
});

auth.post(
  '/logout',
  bearerAuth({
    verifyToken: async (token) => {
      return token === this.token;
    },
  }),
  (c) => {
    token = '';
    return c.text('Logout successful');
  },
);

auth.get(
  '/secret-data',
  bearerAuth({
    verifyToken: async (token) => {
      return token === this.token;
    },
  }),
  (c) => {
    return c.json('SECRET!!!');
  },
);

auth.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  return c.text('invalid request', 500);
});

export {auth, token};
