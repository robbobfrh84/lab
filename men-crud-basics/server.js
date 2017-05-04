const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
const url = 'mongodb://localhost:27017/men-crud-basics'
var db

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res)=>{ res.sendFile(__dirname + '/public/index.html') })

MongoClient.connect(url, (err, database)=>{
  if (err) return console.log(err)
  db = database
  app.listen(3000, ()=>{
    console.log('Connected to Server @ :3000')
  })
});

app.post('/quotes', (req, res)=>{
  db.collection('quotes').save(req.body, (err, results) => {
    if (err) console.log(err)
    res.redirect('/')
  })
})

app.get('/quotes', (req, res)=>{
  db.collection('quotes').find().toArray((err, result)=>{
    if (err) return console.log(err)
    res.send(result)
  })
})

app.put('/quotes', (req, res)=>{
  db.collection('quotes')
    .update(
      {_id: ObjectId(req.body._id)},
      { $set: { name: req.body.name, quote: req.body.quote } },
      (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      }
    )
})
