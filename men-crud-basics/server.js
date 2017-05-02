const express = require('express')
const bodyParser = require('body-parser')
const app = express()
// const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({ extended: true }))
app.listen(3000, () => { console.log('listening on 3000') })

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.post('/quotes', (req, res) => {
  console.log(req.body)
})

// MongoClient.connect('link-to-mongodb', (err,database) => {
//
// })

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
console.log(__dirname)
var url = 'mongodb://localhost:27017/men-crud-basics'
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  db.close();
});




// WARNING: must restart in ternaml when changing node.js files control+c will quit
