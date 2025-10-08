const mongoose=require('mongoose')
const noteschema=new mongoose.Schema({
  
  date:{
    type:Date,
    required:true
  },

    title: {
        type: String,
        required:true
        
 },
      content: {
        type: String,
        required: true
  }

})
const NoteModel=mongoose.model('notes',noteschema)
module.exports=NoteModel