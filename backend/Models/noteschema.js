const mongoose=require('mongoose')
const noteschema=new mongoose.Schema({
    title: {
        type: String,
        required:required,
        maxlength: 100,
      },
      content: {
        type: String,
        required: [true, 'Content is required'],
      },
  
})
const NoteModel=mongoose.model('user',noteschema)
module.exports=NoteModel