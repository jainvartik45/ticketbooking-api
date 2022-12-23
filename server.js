const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL);


const db= mongoose.connection;
db.on('error' , (error)=>console.error(error));
db.once('open' , ()=>console.log('connected to database'));
app.use(express.json());

const seatsRouters =require('./routes/bookers');
app.use('/seats' , seatsRouters)

app.listen(3000)