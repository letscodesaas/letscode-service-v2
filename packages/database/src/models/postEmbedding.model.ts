import mongoose from "mongoose"


const postEmbeddingSchema = new mongoose.Schema({
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
    embedding:{
        type:[Number],
        required:true
    }
},{
    timestamps:true
});


export const postEmbeddings = mongoose.models.postembeddings || mongoose.model("postembedding",postEmbeddingSchema);