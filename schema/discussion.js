const mongoose = require('mongoose');


const discussionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{type:String ,require:true,ref:`User`},
    comment:{type:String ,require:true},
    title:{type:String,require:true},
    date:{type:Date,require:true}
});

module.exports = mongoose.model('Discussion', discussionSchema);
