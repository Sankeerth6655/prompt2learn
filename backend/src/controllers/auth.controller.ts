import { Request, Response } from "express";
import { getCurrentUserService, loginService, registerService } from "../services/auth.service";

interface AuthRequest extends Request{
    userId?:string
}

export async function register(req:Request,res:Response):Promise<void>{
    try {
        let response = await registerService(req.body);
        res.json({...response});
    } catch (error) {
        if(error instanceof Error) res.status(500).json({message:error.message});
        else res.status(500).json({message:"Error in register controller"});
    }
}

export async function login(req:Request,res:Response):Promise<void>{
    try {
        let response = await loginService(req.body);
        res.json({...response});
    } catch (error) {
        if(error instanceof Error) res.status(500).json({message:error.message});
        else res.status(500).json({message:"Error in login controller"});
    }
}

export async function getCurrentUser(req:AuthRequest,res:Response):Promise<void>{
    try {
        let response = await getCurrentUserService(req.userId!);
        res.status(200).json({...response});
    } catch (error) {
        if(error instanceof Error) res.status(500).json({message:error.message});
        else res.status(500).json({message:"Error in getCurrentUser controller"});
    }
}