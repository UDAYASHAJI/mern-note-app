const express=require('express')
const { createuser, loginuser, viewusers, deleteuser, updateuser } = require('../Controller/usercontroller')
const { createnote, viewnote, deletenote, updatenote } = require('../Controller/notecontroller')
const router=express.Router()

router.post('/create',createuser)
router.post('/login',loginuser)
router.get("/view",viewusers)
router.delete('/delete/:id',deleteuser)
router.put("/update/:id",updateuser);
router.post("/note",createnote);
router.get('/note',viewnote)
router.delete('/deletenote/:id',deletenote)
router.post('/updatenote/:id',updatenote)





module.exports=router
