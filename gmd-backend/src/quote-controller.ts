import {bearerAuth, Hono} from '../deps.ts';
import {token} from './login-controller.ts';

const quote = new Hono();

const quotes = [
  {id: 1, text: 'Wer and\'ren eine Bratwurst brät, hat selbst ein Bratwurstbratgerät.'},
];

quote.get('/:id', bearerAuth({token: token}), c => {
  const id = c.req.param('id');
  return c.json(quotes.find(quote => quote.id === id));
});

quote.get('/all', bearerAuth({token: token}), c => {
  return c.json(quotes);
});

quote.post('/create', bearerAuth({token: token}), async c => {
  const newId = Math.max(...quotes.map(quote => quote.id)) + 1;
  const newQuote = {
    id: newId,
    text: await c.req.json
  };
  quotes.push(newQuote);
  return c.text('Quote ' + newQuote + ' created!');
});

quote.get('/:id', bearerAuth({token: token}), c => {
  const id = c.req.param('id');
  const index = quotes.indexOf(quote => quote.id === id);
  quotes.splice(index, 1);
  return c.text('Quote with id: ' + id + ' removed!');
});

export {quote};