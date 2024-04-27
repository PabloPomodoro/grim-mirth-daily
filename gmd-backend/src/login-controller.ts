import {accessToken, Hono, HTTPException} from '../deps.ts';
import {LoginRequest} from '../models/login-request.model.ts';
import {User} from '../models/user.model.ts';
import {UiUserModel} from '../models/ui-user.model.ts';

const users: User[] = [
  {
    id: '1',
    name: 'Pablo',
    email: 'Pablo',
    password: '1337',
    dateOfBirth: new Date(),
  },
];

const auth = new Hono();

auth.post('/login', async (c) => {
  const loginRequest: LoginRequest = await c.req.json();

  const requestedUser = users.find((user) => user.email === loginRequest.email);

  if (!requestedUser) {
    return c.notFound();
  }
  if (loginRequest.password !== requestedUser.password) {
    throw new HTTPException(401, {message: 'wrong password'});
  }

  const token = accessToken.generate('gmd');
  const uiUser = new UiUserModel(
    requestedUser.name,
    requestedUser.email,
    requestedUser.dateOfBirth,
  );
  return c.json({token, uiUser});
});

export {auth};
