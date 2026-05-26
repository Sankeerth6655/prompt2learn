import { Roadmap } from "../models/roadmap.model";

type Difficulty = "Beginner" | "Intermediate" | "Advanced"

//create
export async function createRoadmapService(userId: string, data: {
    topic: string,
    difficulty: Difficulty,
    estimatedDays:number,
    roadmap: {
        subtopic:string,
        estimatedHours:number,
        concepts:{
            title:string,
            completed:boolean
        }[],
    }[]
}): Promise<{ message: string , roadmapId:string }> {

    let roadmap = await Roadmap.create({ userId, ...data });

    return { message: "Roadmap created successfully",roadmapId:roadmap._id.toString() }
}

//read
export async function getAllRoadmapsByUserIdService(userId: string): Promise<Array<{
    id:string,
    topic: string,
    difficulty: Difficulty,
    progress: number,
    status: 'IN_PROGRESS' | "COMPLETED"
}>> {
    let roadmaps = await Roadmap.find({ userId }).select('topic goal difficulty progress status').lean();

    return roadmaps.map((roadmap) => ({
        id:roadmap._id.toString(),
        topic: roadmap.topic,
        difficulty: roadmap.difficulty ?? "Beginner",
        progress: roadmap.progress,
        status: roadmap.status
    }))
}

export async function getRoadmapByIdService(userId:string,roadmapId:string):Promise<{
    id:string,
    topic: string,
    difficulty: Difficulty,
    estimatedDays:number,
    roadmap:{subtopic:string,estimatedHours:number, concepts:{
            title:string,
            completed:boolean
        }[]}[],
    progress: number,
    status: 'IN_PROGRESS' | "COMPLETED"
}>{
    let roadmap = await Roadmap.findOne({_id:roadmapId,userId}).select('topic goal difficulty estimatedDays roadmap progress status').lean();
    if(!roadmap) throw new Error("Roadmap not found");
    return {
        id:roadmap._id.toString(),
        topic: roadmap.topic,
        difficulty: roadmap.difficulty as Difficulty,
        estimatedDays:roadmap.estimatedDays,
        roadmap: roadmap.roadmap,
        progress: roadmap.progress,
        status: roadmap.status
    }
}

//delete
export async function deleteRoadmapService(userId:string,roadmapId:string):Promise<{message:string}>{
    let roadmap = await Roadmap.findOneAndDelete({_id:roadmapId,userId});
    if(!roadmap) throw new Error("Roadmap not found");
    return {message:"Roadmap deleted successfully"}
}