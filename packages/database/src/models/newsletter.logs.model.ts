import mongoose from "mongoose";

const newsletterLogsSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"INIT"
    },
    retry:{
        type:String,
        default:"0"
    },
    mailClient:{
        type:String,
        required:true
    },
    campaignId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'campaigns'
    },
},{
    timestamps:true
});


export const NewsletterLogs = mongoose.models.newsletterlogs || mongoose.model("newsletterlogs",newsletterLogsSchema);