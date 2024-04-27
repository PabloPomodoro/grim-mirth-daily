import {accessToken, createMiddleware, HTTPException} from '../deps.ts';

const tokenAuthentication = createMiddleware(async (c, next) => {
  const bearerToken = c.req.header('Authorization');
  if (!bearerToken) {
    throw new HTTPException(401, {message: 'not logged in'});
  }

  const token = bearerToken.split(' ')[1];
  const authenticated = accessToken.validate(token);
  if (!authenticated) {
    throw new HTTPException(403, {message: 'invalid token'});
  }

  await next();
});

export {tokenAuthentication};
