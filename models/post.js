const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    //user autheticated and associate with the posts
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //include the array of ids of all comments in this post schema itself - post can contain multiple comments
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Like'
        }
    ]   
},{
    timestamps: true
});

const Post = mongoose.model('Post',postSchema);
module.exports = Post;