import mongoose from "mongoose"


const postSentimentSchema = new mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    post:{
        type:String,
        required:true
    },
    sentiments:{
        type:String,
        required:true
    },
    score:{
        type:String,
        required:true
    }
},{
    timestamps:true
});


export const postSentiments = mongoose.models.postsentiments || mongoose.model("postsentiment",postSentimentSchema);