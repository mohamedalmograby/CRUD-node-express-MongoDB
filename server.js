console.log(__dirname) ; 
require('dotenv').config();
console.log(process.env.PORT);

const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();
app.set('view engine', 'ejs')

connectionString = "mongodb+srv://root:"+process.env.DB_PASSWORD+"@cluster0.kpnnr.mongodb.net/test?retryWrites=true&w=majority" ; 
MongoClient.connect(connectionString, {
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
    const db = client.db('test') ; 
    const quotesCollection = db.collection('quotes')
    
    app.listen(8000, function() {
        console.log('listening on 8000')
    })
    app.use(bodyParser.urlencoded({ extended: true }))
    
    app.get('/', (req, res) => {
      qoutes =db.collection('quotes').find().toArray()
        .then(result=>{
          res.render('index.ejs', {quotes : result})
        })
        .catch(/* ... */)
    })
    
    app.post('/quotes', (req, res) => {
      quotesCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/')
        })
        .catch(error => console.error(error))
    })
  })
