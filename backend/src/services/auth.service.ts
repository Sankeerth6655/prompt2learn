import bcrypt from "bcryptjs";
import { User } from "../models/user.model"
import  jwt  from "jsonwebtoken";
import { StringSchemaDefinition } from "mongoose";

type userInput = {
    name:string,
    email:string,
    password:string
}

const SALT_ROUNDS = 10;

//register
export async function registerService(user:userInput):Promise<{message:string}>{
    let isExisting = await User.findOne({email:user.email}).lean();
    if(isExisting) throw new Error("User already exists!");

    let hashedPassword = await bcrypt.hash(user.password,SALT_ROUNDS);

    let newUser = await User.create({name:user.name,email:user.email,password:hashedPassword});
    if(!newUser) throw new Error("User not Registered!");
    
    return {message:"User registered Successfully!"};
}


//login
export async function loginService(data:{email:string,password:string}):Promise<{message:string,
    token:string,
    user:{
    userId:string,
    name:string,
    email:string,
}}>{

    let user = await User.findOne({email:data.email}).select('name email password').lean();
    if(!user) throw new Error("Invalid username or password");

    let ok = await bcrypt.compare(data.password,user.password);
    if(!ok) throw new Error("Invalid username or password");

    let token = jwt.sign({userId:user._id.toString()},process.env.JWT_SECRET as string,{expiresIn:'2d'});
    if(!token) throw new Error("Token not generated");

    return {message:"Login successful!",
        token:token,
        user:{
        userId:user._id.toString(),
        name:user.name,
        email:user.email,
    }}
}

//get current user
export async function getCurrentUserService(userId:string):Promise<{message:string,user:{
    userId:string,
    name:string,
    email:string
}}>{
    const user = await User.findById(userId).select('-password').lean();
    if(!user) throw new Error("User not found");

    return {message:"User fetched successfully",user:{
        userId:user._id.toString(),
        name:user.name,
        email:user.email
    }}
}