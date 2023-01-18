const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client")));
app.use(cors());


const publicVapidKey = 'BE6LT56P_Ql6PPLKYP6iyKKcD50PYxSePBPfevPdXQlGPXjCg9WdjdQFWHwQs5b2ST_cx0gqGwFjAk0icUSTNZM';
const privateVapidKey = 'x7ZHG_WQ0N1mlefY7DzEHlO-I9kAJ7q6hkONSYHEg7c';

webpush.setVapidDetails('mailto:artem_nikolaev69@mail.ru', publicVapidKey, privateVapidKey);


app.post('/subscribe', (req, res) => {
  const subscription = req.body;

  console.log(req.body)
  res.status(201).json({})
  const payload = JSON.stringify({ title: 'Section.io Push Notification' });
  webpush.sendNotification(subscription, payload).catch(err => console.error(err));
})

const port = 8080;
app.listen(port, () => {
  console.log(`server started on ${port}`)
});