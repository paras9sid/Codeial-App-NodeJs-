const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //include the array ofids of all comments in his post schema itself
    comments:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }
    ],
},{
    timestamps: true
});

const Post = mongoose.model('Post',postSchema);
module.exports = Post;