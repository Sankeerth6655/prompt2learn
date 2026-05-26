import { Request, Response } from "express";
import { askQuestionService, generateContentService, generateRoadmapService, generateTopicService } from "../services/ai.service";

export async function generateTopic(req:Request,res:Response):Promise<void>{
    try {
        let topic = await generateTopicService({...req.body});
        res.status(200).json({...topic});
    } catch (error) {
        if(error instanceof Error) res.status(500).json({message:error.message});
        else res.status(500).json({message:"Error in generate topic controller"});
    }
}


export async function generateRoadmap(req:Request,res:Response):Promise<void>{
    try {
        let roadmap = await generateRoadmapService({...req.body});
        res.status(200).json({...roadmap});
    } catch (error) {
        if(error instanceof Error) res.status(500).json({message:error.message});
        else res.status(500).json({message:"Error in generate topic controller"});
    }
}

export async function generateContent(req:Request,res:Response):Promise<void>{
    try {
        let content = await generateContentService({...req.body});
        res.status(200).json({...content});
    } catch (error) {
        if(error instanceof Error) res.status(500).json({message:error.message});
        else res.status(500).json({message:"Error in generate topic controller"});
    }
}

export async function askQuestion(req:Request,res:Response):Promise<void>{
    try {
        let answer = await askQuestionService({...req.body});
        res.status(200).json({...answer});
    } catch (error) {
        if(error instanceof Error) res.status(500).json({message:error.message});
        else res.status(500).json({message:"Error in ask question controller"});
    }
}
