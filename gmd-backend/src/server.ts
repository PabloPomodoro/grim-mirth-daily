import {Hono} from 'https://deno.land/x/hono/mod.ts';
import {
  basicAuth,
  bearerAuth,
  cors,
} from 'https://deno.land/x/hono/middleware.ts';

const app = new Hono();

app.use(cors({origin: 'https://www.grim-mirth-daily.com'}));


let books = [
  'Hermann Hesse - Siddhartha',
  'Carolin Emcke - Gegen den Hass',
  'A. J. Jacobs - Saufit',
  'Terry Pratchett - Nur du hast den Schlüssel',
];

const token = 'hotstuff';

// Redirect root URL
app.get(
  '/',
  basicAuth({
    username: 'pablo',
    password: '1337',
  }),
  (c) => c.json('This is the entry point for the Grim Mirth Daily backend.'),
);

// List all books
app.get('/books', async (c) => {
  return c.json(books);
});

// Create a book (POST body is JSON)
app.post('/books', bearerAuth({token}), async (c) => {
  const jsonResponse = await c.req.json();
  const jsonResponseValue = jsonResponse.value;

  books.push(jsonResponseValue);
  return c.json(books);
});

Deno.serve(app.fetch);
