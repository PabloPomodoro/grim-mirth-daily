import {Hono} from '../deps.ts';
import {Quote} from '../models/quote.model.ts';
import {tokenAuthentication} from './middleware.ts';

const quotes: Quote[] = [
  {
    id: 1,
    title: 'Sausage Party',
    text: "Wer and'ren eine Bratwurst brät, hat selbst ein Bratwurstbratgerät.",
  },
];

const quote = new Hono();
quote.use(tokenAuthentication);

quote.get('/all', (c) => {
  return c.json(quotes);
});

quote.post('/create', async (c) => {
  const quoteRequest = (await c.req.json()) as Quote;
  const newQuote = {
    id: Math.max(...quotes.map((quote) => quote.id)) + 1,
    title: quoteRequest.title,
    text: quoteRequest.text,
  };
  quotes.push(newQuote);
  return c.text('Quote "' + newQuote.title + '" created!');
});

quote.get('/:id', (c) => {
  const id = Number(c.req.param('id'));
  return c.json(quotes.find((quote) => quote.id === id));
});

quote.delete('/:id', (c) => {
  const id = Number(c.req.param('id'));
  const index = quotes.findIndex((quote) => quote.id === id);
  if (index !== -1) {
    quotes.splice(index, 1);
    return c.text('Quote with id: ' + id + ' removed!');
  } else {
    return c.notFound();
  }
});

export {quote};
