import express, { Request, Response } from 'express';
import connection from '../config/db';

const userrouter = express.Router();

userrouter.get('/', async (req: Request, res: Response)=>{
    res.status(200).json({ message: "success configuration" })
    connection.query('select 1 + 1 as sum where 1').then((results)=>{
        console.log(results[0]);
    }).catch((err)=>{
        console.log(err)
    });
})

export default userrouter;