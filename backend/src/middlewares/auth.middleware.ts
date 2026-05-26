import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

interface JwtPayload {
    userId: string;
}
interface AuthRequest extends Request {
    userId?: string;
}

export async function protectedRoute(req:AuthRequest,res:Response,next:NextFunction):Promise<void>{
    try {

        const authHeader = req.headers.authorization;
        if(!authHeader) {
            res.status(401).json({message:"Authorization token missing!"});
            return;
        }

        const token = authHeader.split(" ")[1];
        if(!token) {
            res.status(401).json({message:"Invalid token format!"});
            return;
        }

        
        const decoded = jwt.verify(token!,process.env.JWT_SECRET as string) as JwtPayload;
        req.userId = decoded.userId;
        
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({message:"Unauthorized access!"});
    }
}
