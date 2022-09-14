const mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId


const internSchema = new mongoose.Schema({

    name: {
        type: String,
        required : true,
        trim: true
    },
    email: {
        type: String,
        required : true,
        unique : true,
        trim : true
    },
    collegeId : {
        type: ObjectId,
        ref: 'college'
    },
    isdeleted : {
        type : Boolean,
        default : false
    },
},{ timestamps : true})

module.exports=mongoose.model('intern',internSchema)





