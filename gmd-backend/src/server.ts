import {Hono, cors} from '../deps.ts';
import {login} from './login-controller.ts';
import {quote} from './quote-controller.ts';

const app = new Hono();
app.use(cors({origin: '*'}));

app.route('/login', login);
app.route('/quote', quote);

Deno.serve(app.fetch);
