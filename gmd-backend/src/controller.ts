import {Hono} from 'https://deno.land/x/hono/mod.ts';
import { basicAuth } from "https://deno.land/x/hono@v4.0.5/middleware.ts";
import {
  accessToken
} from 'https://deno.land/x/access_token@1.0.0/src/access_token.ts';

const api = new Hono();
const token = accessToken.generate('gmd');

// Redirect root URL
api.get(
  '/',
  basicAuth({
    username: 'pablo',
    password: '1337',
  }),
  (c) => c.json('This is the entry point for the Grim Mirth Daily backend.'),
);

// Create a book (POST body is JSON)
api.post('/login', async (c) => {
  const jsonResponse = await c.req.json();
  const jsonResponseValue = jsonResponse.value;

  return c.json(jsonResponseValue);
});

export { api };
