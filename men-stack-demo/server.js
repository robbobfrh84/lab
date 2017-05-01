var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var knex = require('./db/knex');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.get('/ideas', (req, res) => {
  knex('ideas').select()
  .then((data) => {
    console.log('data: ', data)
    res.send(data)
  })
})

app.post('/ideas', (req, res) => {
  knex('ideas').insert(req.body)
  .then((id) => {
    res.redirect('/');
  })
})

app.listen(3000, () => {
  console.log('Listening on Port 3000')
})

// http://www.galvanize.com/learn/learn-to-code/build-full-stack-app-40-minutes/
