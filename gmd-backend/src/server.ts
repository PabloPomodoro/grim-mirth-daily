import {Hono} from 'https://deno.land/x/hono/mod.ts';
import {cors} from 'https://deno.land/x/hono/middleware.ts';
import {api} from './controller.ts';

const app = new Hono();
app.use('*', cors());
app.route('/*', api);

Deno.serve(app.fetch);
