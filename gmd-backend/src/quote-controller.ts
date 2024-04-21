import {bearerAuth, Hono} from '../deps.ts';
import {token} from './login-controller.ts';
import {Quote} from '../models/quote.model.ts';

const quote = new Hono();

const quotes: Quote[] = [
  {
    id: 1,
    title: 'Sausage Party',
    text: "Wer and'ren eine Bratwurst brät, hat selbst ein Bratwurstbratgerät.",
  },
];

quote.get('/:id', bearerAuth({token: token}), (c) => {
  const id = Number(c.req.param('id'));
  return c.json(quotes.find((quote) => quote.id === id));
});

quote.get('/all', bearerAuth({token: token}), (c) => {
  return c.json(quotes);
});

quote.post('/create', bearerAuth({token: token}), async (c) => {
  const quoteRequest = await c.req.json() as Quote;
  const newQuote = {
    id: Math.max(...quotes.map((quote) => quote.id)) + 1,
    title: quoteRequest.title,
    text: quoteRequest.text,
  };
  quotes.push(newQuote);
  return c.text('Quote \"' + newQuote.title + '\" created!');
});

quote.delete('/:id', bearerAuth({token: token}), (c) => {
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
