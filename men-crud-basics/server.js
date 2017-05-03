const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/men-crud-basics'
var db

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res)=>{ res.sendFile(__dirname + '/public/index.html') })

MongoClient.connect(url, (err, database)=>{
  if (err) return console.log(err)
  // assert.equal(null, err)
  app.listen(3000, ()=>{
    console.log('Connected to Server and listening on 3000')
  })
  // db = database
});

app.post('/quotes', (req, res)=>{
  db.collection('quotes').save(req.body, (err, results) => {
    if (err) console.log(err)
    console.log('saved to database', req.body)
    res.redirect('/')
  })
})

app.get('/quotes', (req, res)=>{
  db.collection('quotes').find().toArray((err, result)=>{
    if (err) return console.log(err)
    console.log('result', result)
    res.send(result)
  })
})

// WARNING: must restart in ternaml when changing node.js files control+c will quit
