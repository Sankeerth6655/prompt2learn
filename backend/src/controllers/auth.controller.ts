import { Request, Response } from "express";
import { loginService, registerService } from "../services/auth.service";

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