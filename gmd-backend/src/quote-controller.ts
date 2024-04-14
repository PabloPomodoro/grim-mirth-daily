import {bearerAuth, Hono} from '../deps.ts';
import {token} from './login-controller.ts';

const quote = new Hono();

quote.get('/', bearerAuth({token: token}), c => {
  return c.json('Wer and\'ren eine Bratwurst brät, hat selbst ein Bratwurstbratgerät.');
});

export {quote};