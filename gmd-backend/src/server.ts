import { Hono } from 'https://deno.land/x/hono@v4.0.5/mod.ts';
import { cors } from 'https://deno.land/x/hono@v4.0.5/middleware.ts'

const app = new Hono();

app.use(cors({origin: 'https://grim-mirth-daily.com',}));

let books = [
    'Hermann Hesse - Siddhartha',
    'Carolin Emcke - Gegen den Hass',
    'A. J. Jacobs - Saufit',
    'Terry Pratchett - Nur du hast den Schlüssel'
];


// Redirect root URL
app.get("/", (c) => c.redirect("/books"));

// List all books
app.get("/books", async (c) => {
    return c.json(books);
});

// Create a book (POST body is JSON)
app.post("/books", async (c) => {
    const jsonResponse = await c.req.json();
    const jsonResponseValue = jsonResponse.value;

    books.push(jsonResponseValue);
    return c.json(books);
});

/*// Get a book by title
app.get("/books/:title", async (c) => {
    const title = c.req.param("title");
    return c.json(result);
});

// Delete a book by title
app.delete("/books/:title", async (c) => {
    const title = c.req.param("title");
    return c.text("");
});*/

Deno.serve(app.fetch);
