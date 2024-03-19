import {Hono} from 'https://deno.land/x/hono/mod.ts';
import {cors} from 'https://deno.land/x/hono/middleware.ts';
import {login} from './login-controller.ts';

const app = new Hono();
app.use(cors({origin: 'https://www.grim-mirth-daily.com'}));
app.route('/api', login);

Deno.serve(app.fetch);
