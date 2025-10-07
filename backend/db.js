const mongoose=require('mongoose')
const dotenv=require('dotenv').config()
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('mongoDB connection successfull');
    
})
.catch((err)=>{
    console.log(' Fail mongoDB connection');

})