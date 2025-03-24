import hashutils from "../utils/hash";
import connection from '../config/db';
import { FieldPacket, QueryResult } from "mysql2/promise";
import { UserType, Gender } from "../common/user";


class UserModel {
  name: string;
  gender: Gender;
  email: string;
  mobile: string;
  password: string;
    static createUser: (user: UserType, callback: (res: [QueryResult, FieldPacket[]]|undefined)=>void) => void;
    static loginUser: (email: string, password: string, callback: (res: UserType | undefined, token: string | undefined) => void) => void;
  constructor({
    name,
    gender,
    email,
    mobile,
    password,
  }: UserType) {
    this.name = name;
    this.gender = gender;
    this.email = email;
    this.mobile = mobile;
    this.password = hashutils.hashPassword(password);
  }
}

UserModel.createUser=((user: UserType, callback: (res: [QueryResult, FieldPacket[]]|undefined)=>void)=>{
    connection.query(`INSERT into users (name, gender, email, mobile, password) values (?)`, [Object.values(user)]).then((res)=>{
        callback(res);
    }).catch((err)=>{
        callback(undefined);
    })
})


UserModel.loginUser=((email: string, password:string, callback: (res: UserType|undefined, token: string|undefined)=>void)=>{
    connection.query(`select * from users where email=?`, [email]).then((res)=>{
        const user=(res?.[0] as any)?.[0] as UserType;
        console.log(user.password, "is response")
        if(hashutils.verifyPassword(password, user?.password)){
            callback(user, hashutils.createToken(user));
        }else{
            callback(undefined, undefined)
        }
    }).catch((err)=>{
        console.log(err)
        callback(undefined, undefined);
    })
})

export default UserModel;
