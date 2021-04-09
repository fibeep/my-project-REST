import 'dotenv/config';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import models from './models';
import routes from './routes';

const app = express();
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

app.get('/', (req, res) => {
  res.send('Hello World!');
});
 
app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);

app.get('/', (req,res) => {
  return res.send('Recieved a GET HTTP method')
})

app.post('/', (req, res) => {
  return res.send('Received a POST HTTP method');
});
 
app.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});
 
app.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});
 
app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
); 

app.get('/users', (req, res) => {
  return res.send(Object.values(req.context.models.users));
});
 
app.get('/users/:userId', (req, res) => {
  return res.send(req.context.models.users[req.params.userId]);
});
 
app.delete('/users/:userId', (req, res) => {
  return res.send(
    `DELETE HTTP method on user/${req.params.userId} resource`,
  );
});



app.get('/messages', (req, res) => {
  return res.send(Object.values(req.context.models.messages));
});
 
app.get('/messages/:messageId', (req, res) => {
  return res.send(req.context.models.messages[req.params.messageId]);
});

app.post('/messages', (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.context.me.id,
  };
 
  req.context.models.messages[id] = message;
 
  return res.send(message);
});


app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});

app.post('/messages', (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.me.id,
  };
 
  messages[id] = message;
 
  return res.send(message);
});

app.delete('/messages/:messageId', (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = req.context.models.messages;
 
  req.context.models.messages = otherMessages;
 
  return res.send(message);
});


app.get('/session', (req, res) => {
  return res.send(req.context.models.users[req.context.me.id]);
});



