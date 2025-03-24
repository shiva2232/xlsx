import express, { Request, Response } from 'express';
import connection from '../config/db';
import { createUser, loginUser } from '../controllers/user_controller';
import { body } from 'express-validator';

const userrouter = express.Router();

const usercreate=[
    body('name').trim().isString().withMessage("Name can't be empty"),
    body('email').isEmail().withMessage("Email field is required"),
    body('mobile').isMobilePhone('en-IN').withMessage("Mobile Number is required"),
    body('gender').isString().withMessage("Gender is required"),
    body('password').isStrongPassword().withMessage("password is not good")
]

const userlogin=[
    body('email').isEmail().withMessage("Email field is required"),
    body('password').isString().withMessage("password is not good")
]

userrouter.post('/signup', usercreate, createUser)  // no auth required
userrouter.post('/login', userlogin, loginUser)  // no auth required

export default userrouter;