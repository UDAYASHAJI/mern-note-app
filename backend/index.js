const express=require('express')
const app=express()
const dotenv=require('dotenv').config()
const cors=require('cors')
app.use(cors())
app.use(express.json())
require('./db')
const router = require('./Router/router')
app.use('/api',router)
const PORT=process.env.PORT
app.listen(PORT ,()=>{
    console.log(`server Running at ${PORT}`);
    
})