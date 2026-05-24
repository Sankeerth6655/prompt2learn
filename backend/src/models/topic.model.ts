import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
    roadmapId:{type:mongoose.Schema.Types.ObjectId,ref:"Roadmap",required:true},
    title:{type:String,required:true},
    description:{type:String},
    estimatedHours:{type:Number,default:1},
    completed:{type:Boolean,default:false},
    resources:[{
        type:{type:String},
        title:{type:String},
        url:{type:String}
    }]
},{timestamps:true})

export const Topic = mongoose.model('topic',topicSchema);