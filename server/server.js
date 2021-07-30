const express = require('express')
const mongoose = require('mongoose')
const colors = require('colors');
const Cors = require('cors')
const Users = require('./models/tinderCards.model')
const dotenv = require("dotenv");

//Initialize app
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(Cors())

//Middleware
app.use(express.json())

//MongoDB URI
const uri = process.env.MONGO_URI;

mongoose.connect(uri,  { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
 })
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully".bgRed);
})


//API End points
app.get('/',(req,res)=>{
    res.status(200).send('Hello Programmers')
})

app.post('/tinder/cards',(req,res)=>{
    const user = req.body;
    Users.create(user, (err,data)=>{
        if (err){
            res.status(500).json('Error: '+err)
        }else{
            res.status(201).send(data)
        }
    })
})

app.get('/tinder/cards',(req,res)=>{
    Users.find((err,data)=>{
        if (err){
            res.status(500).json('Error: '+err)
        }else{
            res.status(200).send(data)
        }
    })
})

//Listener
app.listen(PORT, ()=> console.log(`Listening on localhost: ${PORT}`.bgMagenta))