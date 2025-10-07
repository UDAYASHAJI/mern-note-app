const express=require('express')
const { createuser, loginuser, viewusers, deleteuser, updateuser } = require('../Controller/usercontroller')
const router=express.Router()

router.post('/create',createuser)
router.post('/login',loginuser)
router.get("/view",viewusers)
router.delete('/delete/:id',deleteuser)
router.put("/update/:id",updateuser);




module.exports=router
