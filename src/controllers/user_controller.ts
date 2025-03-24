import UserModel from "../models/user_model";
import { UserType, Gender } from "../common/user";
import type { Request, Response } from "express";
import { FieldPacket, QueryResult } from "mysql2";

type UserReq={
    body: UserType
}

export const createUser=(req: UserReq, res: Response)=>{
    const user=new UserModel({ name: req.body.name, gender: req.body.gender, email: req.body.email, mobile: req.body.mobile, password: req.body.password });
    UserModel.createUser(user, (result:  [QueryResult, FieldPacket[]] | undefined):void=>{
        if(!result){
            res.status(403).json({ message: "failed to Signup" })
        }
        res.status(201).json({ message: "User signup success" });
        return;
    });
}


export const loginUser=(req: UserReq, res: Response)=>{
    UserModel.loginUser(req.body.email, req.body.password, (result, token)=>{
        if(!result){
            res.status(403).json({ message: "failed to login" })
        }
        
        res.status(200).json({ user: result, message: "login success", token: token  })
    });
}