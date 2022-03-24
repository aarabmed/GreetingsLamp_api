require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const  cors = require('cors')
const app = require('./app');


const whitelist = ['https://greetingslamp-api.herokuapp.com','http://localhost:7000','http://localhost:3000',]
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error())
        }
    },
    optionsSuccessStatus: 200 
}


const port= process.env.PORT || 3030;

const databaseUrl = process.env.DATABASE_URL;

const server = express()
server.use(cors(corsOptions),app)

mongoose.connect(databaseUrl, {useUnifiedTopology: true,useNewUrlParser: true , useFindAndModify: false }).then(()=>{
    server.listen(port,()=>{
        console.log(`connection successed, Server running at http://localhost:${port}/`);
    })
}).catch(err=>{
    console.log('Error while connecting to database:',err)
    //process.exit(1);
})