console.log(__dirname) ; 
require('dotenv').config();
console.log(process.env.PORT);

const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();

connectionString = "mongodb+srv://root:"+process.env.DB_PASSWORD+"@cluster0.kpnnr.mongodb.net/test?retryWrites=true&w=majority" ; 
MongoClient.connect(connectionString, {
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
    // const db = client.db('test') ; 
  })


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