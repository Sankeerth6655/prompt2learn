import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"User"},
    title:{type:String,required:true},
    goal:{type:String,required:true},
    difficulty:{type:String,enum:['Beginner','Intermediate','Advanced']},
    deadline:{type:Date},
    dailyStudyHours:{type:Number,required:true,min:0.5},
    progress:{type:Number,default:0,min:0,max:100},
    status:{type:String,enum:['IN_PROGRESS','COMPLETED'],default:'IN_PROGRESS'},
},{timestamps:true});

export const Roadmap = mongoose.model('roadmap',roadmapSchema);