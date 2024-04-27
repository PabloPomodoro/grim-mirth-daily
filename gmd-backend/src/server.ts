import {cors, Hono, HTTPException, logger} from '../deps.ts';
import {auth} from './login-controller.ts';
import {quote} from './quote-controller.ts';

const app = new Hono();
app.use(cors({origin: '*'}));
app.use(logger());

app.route('/auth', auth);
app.route('/quote', quote);

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  return c.text('invalid request', 500);
});

Deno.serve(app.fetch);
