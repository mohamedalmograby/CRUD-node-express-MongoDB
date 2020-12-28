console.log(__dirname) ; 
const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();

app.listen(8000, function() {
    console.log('listening on 8000')
})
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
}) 

app.post('/quotes', (req, res) => {
    console.log(req.body)
  })