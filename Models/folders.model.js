const mongoose = require('mongoose')
 const FoldersSchema=mongoose.Schema({
 name : {
    type :String ,
    required : true,
    minLength : [3,'you must provide more than 3 chars'] ,
    maxLength:15,
 },
 bookmarks: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref : 'Bookmark',
    default :[]
  },
  userid :{
      type : mongoose.SchemaTypes.ObjectId,
      ref : 'User',
      required : true
  }, 
}); 
 const FoldersModel = mongoose.model('Folder',FoldersSchema);
 module.exports=FoldersModel;