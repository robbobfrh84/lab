const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
// const assert = require('assert');
const url = 'mongodb://localhost:27017/men-crud-basics'
var db

app.use(bodyParser.urlencoded({ extended: true }))
// app.listen(3000, () => { console.log('listening on 3000') })

app.get('/', (req, res) => { res.sendFile(__dirname + '/public/index.html') })

MongoClient.connect(url, (err, database) => {
  if (err) return console.log(err)
  // assert.equal(null, err)
  app.listen(3000, () => {
    console.log('Connected to Server and listening on 3000')
  })
  db = database
  // database.close();
  db.collection('quotes').find().toArray((err,results) => {
    console.log('-------!!!!!!! >>>> results: ', results)
  })
});

// app.get('/', (req, res) => {
//   //var ??? not const or let???
//   var cursor = db.collectioin('quote').find()
//   console.log('cursor: ', cursor)
// })

app.post('/quotes', (req, res) => {
  console.log(req.body)
  db.collection('quotes').save(req.body, (err, results) => {
    if (err) console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})








// WARNING: must restart in ternaml when changing node.js files control+c will quit
