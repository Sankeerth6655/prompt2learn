import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"User"},
    topic:{type:String,required:true},
    difficulty:{type:String,enum:['Beginner','Intermediate','Advanced']},
    estimatedDays:{type:Number,required:true},
    roadmap:{ type: [
        {
            subtopic:{type:String,required:true},
            estimatedHours:{type:Number,required:true},
            concepts:{type:[{
                    title:{type:String,required:true},
                    completed:{type:Boolean,default:false,required:true}
                }],required:true},
        }
    ] , required:true},
    progress:{type:Number,default:0,min:0,max:100},
    status:{type:String,enum:['IN_PROGRESS','COMPLETED'],default:'IN_PROGRESS'},
},{timestamps:true});

export const Roadmap = mongoose.model('roadmap',roadmapSchema);