import { Request, Response } from "express";
import { createRoadmapService, deleteRoadmapService, getAllRoadmapsByUserIdService, getRoadmapByIdService, updateRoadmapService } from "../services/roadmap.service";

interface AuthRequest extends Request{
    userId?:string
}

export async function createRoadmap(req:AuthRequest,res:Response):Promise<void>{
    try {
        let newRoadmap = await createRoadmapService(req.userId!,req.body);
        res.status(201).json({...newRoadmap});
    } catch (error) {
        if(error instanceof Error) res.status(500).json({message:error.message});
        res.status(500).json({message:"Error in createroadmap controller"});
    }
}

export async function getAllRoadmapsByUserId(req:AuthRequest,res:Response):Promise<void>{
    try {
        let roadmaps = await getAllRoadmapsByUserIdService(req.userId!);
        res.status(200).json([...roadmaps]);
    } catch (error) {
        if(error instanceof Error) res.status(500).json({message:error.message});
        res.status(500).json({message:"Error in getallroadmapsbyuserid controller"});
    }
}

export async function getRoadmapById(req:AuthRequest,res:Response):Promise<void>{
    try {
        let roadmap = await getRoadmapByIdService(req.userId!,req.params.roadmapId as string);
        res.status(200).json({...roadmap});
    } catch (error) {
        if(error instanceof Error) res.status(500).json({message:error.message});
        res.status(500).json({message:"Error in getroadmapbyid controller"});
    }
}

export async function deleteRoadmap(req:AuthRequest,res:Response):Promise<void>{
    try {
        let roadmap = await deleteRoadmapService(req.userId!,req.params.roadmapId as string);
        res.status(200).json({...roadmap});
    } catch (error) {
        if(error instanceof Error) res.status(500).json({message:error.message});
        res.status(500).json({message:"Error in deleteroadmap controller"});
    }
}

export async function updateRoadmap(req:AuthRequest,res:Response):Promise<void>{
    try {
        let updated = await updateRoadmapService(req.userId!,req.params.roadmapId as string,req.body);
        res.status(200).json({...updated});
    } catch (error) {
        if(error instanceof Error) res.status(500).json({message:error.message});
        res.status(500).json({message:"Error in updateroadmap controller"});
    }
}